import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, type Article } from '../../../../lib/supabase';
import { motion } from 'framer-motion';
import RichTextEditor from '../components/RichTextEditor';

const EditArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tags, setTags] = useState('');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['Technology', 'Science', 'Health', 'Business', 'Education', 'Lifestyle'];

  useEffect(() => {
    checkAuth();
    if (id) {
      loadArticle();
    }
  }, [id]);

  const checkAuth = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error:', authError);
        setError(`Authentication error: ${authError.message}`);
        return;
      }
      if (!user) {
        window.REACT_APP_NAVIGATE('/admin/login');
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Failed to verify authentication. Please check your Supabase connection.');
    }
  };

  const loadArticle = async () => {
    setFetchLoading(true);
    setError('');
    try {
      console.log('Loading article with ID:', id);
      
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      console.log('Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error(`Database error: ${fetchError.message} (Code: ${fetchError.code})`);
      }

      if (!data) {
        throw new Error('Article not found');
      }

      setTitle(data.title);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setCategory(data.category);
      setFeaturedImage(data.featured_image);
      setTags(data.tags.join(', '));
      setReadingTime(data.reading_time);
      setPublishDate(data.publish_date);
    } catch (err: unknown) {
      console.error('Load article error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load article. Please check your database connection.');
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error: updateError } = await supabase
        .from('articles')
        .update({
          title,
          excerpt,
          content,
          category,
          featured_image: featuredImage,
          tags: tagsArray,
          reading_time: readingTime,
          publish_date: publishDate,
        })
        .eq('id', id);

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Failed to update: ${updateError.message}`);
      }

      window.REACT_APP_NAVIGATE('/admin/articles');
    } catch (err: unknown) {
      console.error('Submit error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while updating the article');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-accent-orange animate-spin"></i>
          <p className="mt-4 text-sm text-text-gray">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.REACT_APP_NAVIGATE('/admin/articles')}
                  className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-xl transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-xl text-primary"></i>
                </button>
                <h1 className="text-xl font-black text-primary">Edit Article</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <i className="ri-error-warning-line text-4xl text-red-500"></i>
              </div>
              <h2 className="text-2xl font-black text-primary mb-3">Server Error</h2>
              <p className="text-sm text-text-gray mb-6 max-w-md mx-auto">{error}</p>
              <div className="space-y-3">
                <button
                  onClick={loadArticle}
                  className="px-6 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  Try Again
                </button>
                <br />
                <button
                  onClick={() => window.REACT_APP_NAVIGATE('/admin/articles')}
                  className="px-6 py-3 bg-background text-primary font-semibold rounded-xl hover:bg-gray-200 transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  Back to Articles
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <div className="bg-black/50 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.REACT_APP_NAVIGATE('/admin/articles')}
                className="w-10 h-10 flex items-center justify-center hover:bg-cyan-500/10 rounded-xl transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-xl text-cyan-400"></i>
              </button>
              <h1 className="text-xl font-black text-white">Edit Article</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-cyan-500/20"
        >
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3">
              <i className="ri-error-warning-line text-red-400 text-xl"></i>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-black/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-white placeholder-gray-500"
                placeholder="Enter article title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Excerpt *
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm resize-none text-white placeholder-gray-500"
                placeholder="Brief description of the article"
              />
              <p className="text-xs text-gray-400 mt-1">{excerpt.length}/500 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-black/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm cursor-pointer text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Reading Time *
                </label>
                <input
                  type="text"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-white placeholder-gray-500"
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Featured Image URL *
              </label>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-black/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-white placeholder-gray-500"
                placeholder="https://example.com/image.jpg"
              />
              {featuredImage && (
                <div className="mt-3 w-full h-48 rounded-xl overflow-hidden border border-cyan-500/20">
                  <img
                    src={featuredImage}
                    alt="Preview"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-black/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-white placeholder-gray-500"
                placeholder="AI, Machine Learning, Technology"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Publish Date *
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-black/50 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-white cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Article Content *
              </label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-8">
            <button
              type="button"
              onClick={() => window.REACT_APP_NAVIGATE('/admin/articles')}
              className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all cursor-pointer whitespace-nowrap border border-cyan-500/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Updating...
                </span>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Update Article
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default EditArticlePage;