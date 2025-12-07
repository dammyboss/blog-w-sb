import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { motion } from 'framer-motion';
import RichTextEditor from '../components/RichTextEditor';

const NewArticlePage = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tags, setTags] = useState('');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Technology', 'Science', 'Health', 'Business', 'Education', 'Lifestyle'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error: insertError } = await supabase
        .from('articles')
        .insert([{
          title,
          excerpt,
          content,
          category,
          featured_image: featuredImage,
          tags: tagsArray,
          reading_time: readingTime,
          publish_date: publishDate,
        }]);

      if (insertError) throw insertError;

      window.REACT_APP_NAVIGATE('/admin/articles');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while creating the article');
      }
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-xl font-black text-primary">Create New Article</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <i className="ri-error-warning-line text-red-500 text-xl"></i>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                placeholder="Enter article title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Excerpt *
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm resize-none"
                placeholder="Brief description of the article"
              />
              <p className="text-xs text-text-gray mt-1">{excerpt.length}/500 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Reading Time *
                </label>
                <input
                  type="text"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Featured Image URL *
              </label>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                placeholder="AI, Machine Learning, Technology"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Publish Date *
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
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
                  Creating...
                </span>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Create Article
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default NewArticlePage;