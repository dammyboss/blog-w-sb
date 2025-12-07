import { useEffect, useState } from 'react';
import { supabase, type Video } from '../../../lib/supabase';
import { motion } from 'framer-motion';

const AdminVideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadVideos();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.REACT_APP_NAVIGATE('/admin/login');
    }
  };

  const loadVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading videos:', error);
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting video:', error);
    } else {
      setVideos(videos.filter(v => v.id !== id));
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="bg-primary-navy/95 backdrop-blur-lg border-b border-accent-cyan/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.REACT_APP_NAVIGATE('/admin/dashboard')}
                className="w-10 h-10 flex items-center justify-center hover:bg-accent-cyan/20 rounded-xl transition-colors cursor-pointer border border-accent-cyan/30"
              >
                <i className="ri-arrow-left-line text-xl text-accent-cyan"></i>
              </button>
              <div>
                <h1 className="text-xl font-black text-white">Manage Videos</h1>
                <p className="text-sm text-text-gray">{videos.length} total videos</p>
              </div>
            </div>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/admin/videos/new')}
              className="px-6 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              New Video
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="ri-loader-4-line text-4xl text-accent-cyan animate-spin"></i>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 flex items-center justify-center bg-accent-cyan/20 rounded-2xl mx-auto mb-4 border border-accent-cyan/30">
              <i className="ri-video-line text-4xl text-accent-cyan"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No videos yet</h3>
            <p className="text-text-gray mb-6">Add your first video to get started</p>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/admin/videos/new')}
              className="px-6 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Add Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-dark overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan text-xs font-semibold rounded-full border border-accent-cyan/30">
                      {video.category}
                    </span>
                    <span className="text-xs text-text-gray">{video.views} views</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-text-gray text-sm mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.REACT_APP_NAVIGATE(`/admin/videos/edit/${video.id}`)}
                      className="flex-1 px-4 py-2 bg-accent-cyan/20 text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan hover:text-white transition-all cursor-pointer whitespace-nowrap border border-accent-cyan/30"
                    >
                      <i className="ri-edit-line mr-1"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(video.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer whitespace-nowrap border border-red-500/30"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-dark max-w-md w-full"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-red-500/20 rounded-2xl mx-auto mb-4 border border-red-500/30">
              <i className="ri-error-warning-line text-3xl text-red-400"></i>
            </div>
            <h3 className="text-xl font-black text-white text-center mb-2">Delete Video?</h3>
            <p className="text-text-gray text-center mb-6">This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-6 py-3 bg-accent-cyan/20 text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/30 transition-all cursor-pointer whitespace-nowrap border border-accent-cyan/30"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all cursor-pointer whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminVideosPage;
