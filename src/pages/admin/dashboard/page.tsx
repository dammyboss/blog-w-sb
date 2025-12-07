import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { motion } from 'framer-motion';
import type { User } from '@supabase/supabase-js';

const AdminDashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    articles: 0,
    videos: 0,
  });

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      window.REACT_APP_NAVIGATE('/admin/login');
      return;
    }
    
    setUser(user);
    setLoading(false);
  };

  const loadStats = async () => {
    const [articlesResult, videosResult] = await Promise.all([
      supabase.from('articles').select('id', { count: 'exact', head: true }),
      supabase.from('videos').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      articles: articlesResult.count || 0,
      videos: videosResult.count || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.REACT_APP_NAVIGATE('/admin/login');
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-accent rounded-xl shadow-glow-cyan">
                <i className="ri-dashboard-line text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-xl font-black text-white">Admin Dashboard</h1>
                <p className="text-sm text-text-gray">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.REACT_APP_NAVIGATE('/')}
                className="px-4 py-2 text-text-gray hover:text-accent-cyan transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-home-line mr-2"></i>
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 border border-red-500/30 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-logout-box-line mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="card-dark">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-accent-cyan/20 rounded-xl border border-accent-cyan/30">
                <i className="ri-article-line text-3xl text-accent-cyan"></i>
              </div>
              <span className="text-4xl font-black text-white">{stats.articles}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Total Articles</h3>
            <p className="text-text-gray text-sm">Published blog posts and guides</p>
          </div>

          <div className="card-dark">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-accent-cyan/20 rounded-xl border border-accent-cyan/30">
                <i className="ri-video-line text-3xl text-accent-cyan"></i>
              </div>
              <span className="text-4xl font-black text-white">{stats.videos}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Total Videos</h3>
            <p className="text-text-gray text-sm">YouTube video tutorials</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <button
            onClick={() => window.REACT_APP_NAVIGATE('/admin/articles')}
            className="card-dark hover:shadow-glow-cyan transition-all text-left cursor-pointer group"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-accent rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-glow-cyan">
              <i className="ri-article-line text-3xl text-white"></i>
            </div>
            <h3 className="text-xl font-black text-white mb-2 group-hover:text-gradient transition-colors">Manage Articles</h3>
            <p className="text-text-gray mb-4">Create, edit, and delete blog articles</p>
            <div className="flex items-center text-accent-cyan font-semibold">
              <span>Go to Articles</span>
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </button>

          <button
            onClick={() => window.REACT_APP_NAVIGATE('/admin/videos')}
            className="card-dark hover:shadow-glow-cyan transition-all text-left cursor-pointer group"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-accent rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-glow-cyan">
              <i className="ri-video-line text-3xl text-white"></i>
            </div>
            <h3 className="text-xl font-black text-white mb-2 group-hover:text-gradient transition-colors">Manage Videos</h3>
            <p className="text-text-gray mb-4">Add, edit, and remove YouTube videos</p>
            <div className="flex items-center text-accent-cyan font-semibold">
              <span>Go to Videos</span>
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
