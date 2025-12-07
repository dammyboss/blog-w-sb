import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { motion } from 'framer-motion';

const NewVideoPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [category, setCategory] = useState('Tutorial');
  const [duration, setDuration] = useState('');
  const [views, setViews] = useState('0');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Tutorial', 'Review', 'Guide', 'News', 'Interview', 'Documentary'];

  const extractYoutubeId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const youtubeId = extractYoutubeId(youtubeUrl);
      
      if (!youtubeId) {
        throw new Error('Invalid YouTube URL. Please enter a valid YouTube video link.');
      }

      const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

      const { error: insertError } = await supabase
        .from('videos')
        .insert([{
          title,
          description,
          youtube_id: youtubeId,
          category,
          thumbnail,
          duration,
          views,
          publish_date: publishDate,
        }]);

      if (insertError) throw insertError;

      window.REACT_APP_NAVIGATE('/admin/videos');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while adding the video');
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
                onClick={() => window.REACT_APP_NAVIGATE('/admin/videos')}
                className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-xl transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-xl text-primary"></i>
              </button>
              <h1 className="text-xl font-black text-primary">Add New Video</h1>
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
                Video Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm resize-none"
                placeholder="Brief description of the video"
              />
              <p className="text-xs text-text-gray mt-1">{description.length}/500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                YouTube URL *
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-text-gray mt-1">
                Supports: youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/...
              </p>
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
                  Duration *
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                  placeholder="e.g., 12:45"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Views
                </label>
                <input
                  type="text"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                  placeholder="e.g., 1.2K"
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
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-8">
            <button
              type="button"
              onClick={() => window.REACT_APP_NAVIGATE('/admin/videos')}
              className="px-6 py-3 bg-background text-primary font-semibold rounded-xl hover:bg-gray-200 transition-all cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Adding...
                </span>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Add Video
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default NewVideoPage;