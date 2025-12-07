
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, type Video } from '../../../../lib/supabase';
import { motion } from 'framer-motion';

const AdminEditVideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail: '',
    duration: '',
    category: '',
    views: 0,
  });

  useEffect(() => {
    checkAuth();
    if (id) {
      loadVideo();
    }
  }, [id]);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.REACT_APP_NAVIGATE('/admin/login');
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      setError('Authentication check failed');
    }
  };

  const loadVideo = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading video:', error);
        setError('Failed to load video');
        setTimeout(() => {
          window.REACT_APP_NAVIGATE('/admin/videos');
        }, 2000);
      } else if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          video_url: data.video_url || '',
          thumbnail: data.thumbnail || '',
          duration: data.duration || '',
          category: data.category || '',
          views: data.views || 0,
        });
      }
    } catch (err) {
      console.error('Unexpected error loading video:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSaving(true);
      setError(null);
      
      // Validate required fields
      if (!formData.title || !formData.description || !formData.video_url || 
          !formData.thumbnail || !formData.duration || !formData.category) {
        setError('Please fill in all required fields');
        return;
      }

      const { error } = await supabase
        .from('videos')
        .update({
          title: formData.title,
          description: formData.description,
          video_url: formData.video_url,
          thumbnail: formData.thumbnail,
          duration: formData.duration,
          category: formData.category,
          views: formData.views,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating video:', error);
        setError('Failed to update video. Please try again.');
      } else {
        window.REACT_APP_NAVIGATE('/admin/videos');
      }
    } catch (err) {
      console.error('Unexpected error updating video:', err);
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'views' ? parseInt(value) || 0 : value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <i className="ri-loader-4-line text-4xl text-accent-cyan animate-spin"></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="bg-primary-navy/95 backdrop-blur-lg border-b border-accent-cyan/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/admin/videos')}
              className="w-10 h-10 flex items-center justify-center hover:bg-accent-cyan/20 rounded-xl transition-colors cursor-pointer border border-accent-cyan/30"
            >
              <i className="ri-arrow-left-line text-xl text-accent-cyan"></i>
            </button>
            <div>
              <h1 className="text-xl font-black text-white">Edit Video</h1>
              <p className="text-sm text-text-gray">Update video information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-navy/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-primary-navy/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                placeholder="Enter video description"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Video URL *
              </label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-navy/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="https://www.youtube.com/embed/..."
              />
              <p className="text-xs text-text-gray mt-1">Use YouTube embed URL format</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Thumbnail URL *
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-navy/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-navy/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan transition-colors"
                  placeholder="e.g., 15:30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-navy/50 border border-accent-cyan/30 rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-colors cursor-pointer"
                >
                  <option value="">Select category</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Kubernetes">Kubernetes</option>
                  <option value="Docker">Docker</option>
                  <option value="CI/CD">CI/CD</option>
                  <option value="AWS">AWS</option>
                  <option value="Azure">Azure</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Views
              </label>
              <input
                type="number"
                name="views"
                value={formData.views}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 bg-primary-navy/50 border border-accent-cyan/30 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="0"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => window.REACT_APP_NAVIGATE('/admin/videos')}
                className="flex-1 px-6 py-3 bg-accent-cyan/20 text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/30 transition-all cursor-pointer whitespace-nowrap border border-accent-cyan/30"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line mr-2"></i>
                    Update Video
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminEditVideoPage;
