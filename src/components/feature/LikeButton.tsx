import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface LikeButtonProps {
  articleId?: string;
  videoId?: string;
  initialLikes?: number;
  initialLiked?: boolean;
}

export default function LikeButton({ articleId, videoId, initialLikes = 0, initialLiked = false }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLikeStatus();
  }, [articleId, videoId]);

  const fetchLikeStatus = async () => {
    try {
      // Get user IP (simplified - in a real app you'd get this from a server)
      const userIp = await getUserIp();
      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq(articleId ? 'article_id' : 'video_id', articleId || videoId)
        .eq('user_ip', userIp)
        .maybeSingle();

      if (error) throw error;
      setLiked(!!data);
    } catch (err) {
      console.error('Failed to fetch like status:', err);
    }
  };

  const getUserIp = async (): Promise<string> => {
    // This is a placeholder; in production you'd get IP from a server endpoint.
    // For simplicity, we'll generate a persistent identifier from localStorage.
    const storageKey = 'devopswithdami_anonymous_id';
    let id = localStorage.getItem(storageKey);
    if (!id) {
      id = 'anon_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem(storageKey, id);
    }
    return id;
  };

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    const userIp = await getUserIp();
    const targetId = articleId || videoId;
    const targetType = articleId ? 'article_id' : 'video_id';

    try {
      if (liked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq(targetType, targetId)
          .eq('user_ip', userIp);

        if (error) throw error;
        setLikes(prev => prev - 1);
        setLiked(false);
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            [targetType]: targetId,
            user_ip: userIp,
          });

        if (error) throw error;
        setLikes(prev => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-2 text-text-gray hover:text-accent-cyan transition-colors duration-300 cursor-pointer disabled:opacity-50"
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <i className={`${liked ? 'ri-heart-fill text-accent-cyan' : 'ri-heart-line'} text-xl`}></i>
      <span className="font-semibold">{likes}</span>
    </button>
  );
}