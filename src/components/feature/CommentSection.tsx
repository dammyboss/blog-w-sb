import { useState, useEffect, useCallback } from 'react';
import { supabase, type Comment } from '../../lib/supabase';

interface CommentSectionProps {
  articleId?: string;
  videoId?: string;
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}

export default function CommentSection({ articleId, videoId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const targetColumn = articleId ? 'article_id' : 'video_id';
      const targetId = articleId || videoId;
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq(targetColumn, targetId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      const tree = buildCommentTree(data || []);
      setComments(tree);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setLoading(false);
    }
  }, [articleId, videoId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const buildCommentTree = (flatComments: Comment[]): CommentWithReplies[] => {
    const map = new Map<string, CommentWithReplies>();
    const roots: CommentWithReplies[] = [];

    // Create a map of id -> comment with empty replies
    flatComments.forEach(comment => {
      map.set(comment.id, { ...comment, replies: [] });
    });

    // Assign children to parents
    flatComments.forEach(comment => {
      const node = map.get(comment.id)!;
      if (comment.parent_id && map.has(comment.parent_id)) {
        const parent = map.get(comment.parent_id)!;
        parent.replies.push(node);
      } else {
        roots.push(node);
      }
    });

    // Sort roots by created_at descending
    roots.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Sort each level's replies by created_at ascending (oldest first)
    const sortReplies = (nodes: CommentWithReplies[]) => {
      nodes.forEach(node => {
        node.replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        sortReplies(node.replies);
      });
    };
    sortReplies(roots);

    return roots;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const targetColumn = articleId ? 'article_id' : 'video_id';
      const targetId = articleId || videoId;
      const { error } = await supabase
        .from('comments')
        .insert({
          [targetColumn]: targetId,
          user_name: userName.trim() || null,
          content: content.trim(),
          approved: true, // auto‑approve for now
        });

      if (error) throw error;
      setContent('');
      setUserName('');
      await fetchComments(); // refresh list
    } catch (err) {
      console.error('Failed to submit comment:', err);
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const targetColumn = articleId ? 'article_id' : 'video_id';
      const targetId = articleId || videoId;
      const { error } = await supabase
        .from('comments')
        .insert({
          [targetColumn]: targetId,
          user_name: userName.trim() || null,
          content: replyContent.trim(),
          parent_id: parentId,
          approved: true,
        });

      if (error) throw error;
      setReplyContent('');
      setReplyingTo(null);
      await fetchComments();
    } catch (err) {
      console.error('Failed to submit reply:', err);
      alert('Failed to post reply. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: CommentWithReplies; depth?: number }) => {
    const isReplying = replyingTo === comment.id;
    const marginLeft = depth * 24; // 24px per depth level

    return (
      <div className="mb-6" style={{ marginLeft: `${marginLeft}px` }}>
        <div className="card-glass p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-accent-cyan/20 rounded-full">
              <i className="ri-user-line text-accent-cyan"></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-white">
                  {comment.user_name || 'Anonymous'}
                </h5>
                <span className="text-xs text-text-gray">{formatDate(comment.created_at)}</span>
              </div>
              <p className="text-text-gray leading-relaxed mb-4">{comment.content}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setReplyingTo(isReplying ? null : comment.id)}
                  className="text-sm text-accent-cyan hover:text-accent-cyan/80 flex items-center gap-1 cursor-pointer"
                >
                  <i className="ri-reply-line"></i> Reply
                </button>
                {depth < 3 && (
                  <span className="text-xs text-text-gray">
                    {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reply form nested under the comment */}
        {isReplying && (
          <div key={`reply-form-${comment.id}`} className="mt-4 ml-10">
            <div className="card-glass p-4">
              <h6 className="text-sm font-semibold text-white mb-2">Reply to {comment.user_name || 'Anonymous'}</h6>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-background-card/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan resize-none mb-3"
                style={{ direction: 'ltr', transform: 'none' }}
                dir="ltr"
                placeholder="Write your reply..."
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 text-sm border border-accent-cyan/30 text-text-gray rounded-xl hover:bg-accent-cyan/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  disabled={submitting || !replyContent.trim()}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render replies recursively */}
        {comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-12 pt-8 border-t border-accent-cyan/10">
      <h3 className="text-2xl font-display font-bold text-white mb-6">Comments ({comments.length})</h3>

      {/* Comment Form */}
      <div className="card-glass p-6 mb-8">
        <h4 className="text-lg font-semibold text-white mb-4">Leave a comment</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-text-gray mb-2">Name (optional)</label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-background-card/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan"
              placeholder="Your name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm text-text-gray mb-2">Comment</label>
            <textarea
              id="comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-background-card/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan resize-none"
              style={{ direction: 'ltr', transform: 'none' }}
              dir="ltr"
              placeholder="Write your thoughts..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <i className="ri-loader-4-line text-4xl text-accent-cyan animate-spin"></i>
          <p className="mt-4 text-sm text-text-gray">Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 card-glass">
          <i className="ri-chat-1-line text-4xl text-accent-cyan mb-4"></i>
          <p className="text-text-gray">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}