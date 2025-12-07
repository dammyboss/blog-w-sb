import { useEffect, useState } from 'react';
import { supabase, type Article } from '../../../lib/supabase';
import { motion } from 'framer-motion';

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadArticles();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.REACT_APP_NAVIGATE('/admin/login');
    }
  };

  const loadArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading articles:', error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
    } else {
      setArticles(articles.filter(a => a.id !== id));
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
                <h1 className="text-xl font-black text-white">Manage Articles</h1>
                <p className="text-sm text-text-gray">{articles.length} total articles</p>
              </div>
            </div>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/admin/articles/new')}
              className="px-6 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              New Article
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="ri-loader-4-line text-4xl text-accent-cyan animate-spin"></i>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 flex items-center justify-center bg-accent-cyan/20 rounded-2xl mx-auto mb-4 border border-accent-cyan/30">
              <i className="ri-article-line text-4xl text-accent-cyan"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No articles yet</h3>
            <p className="text-text-gray mb-6">Create your first article to get started</p>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/admin/articles/new')}
              className="px-6 py-3 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Create Article
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-dark overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 h-48 md:h-auto">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan text-xs font-semibold rounded-full border border-accent-cyan/30">
                            {article.category}
                          </span>
                          <span className="text-sm text-text-gray">{article.publish_date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                        <p className="text-text-gray text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-accent-cyan/10 text-text-gray text-xs rounded-full border border-accent-cyan/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => window.REACT_APP_NAVIGATE(`/admin/articles/edit/${article.id}`)}
                          className="w-10 h-10 flex items-center justify-center bg-accent-cyan/20 text-accent-cyan rounded-xl hover:bg-accent-cyan hover:text-white transition-all cursor-pointer border border-accent-cyan/30"
                        >
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => setDeleteId(article.id)}
                          className="w-10 h-10 flex items-center justify-center bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer border border-red-500/30"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </div>
                    </div>
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
            <h3 className="text-xl font-black text-white text-center mb-2">Delete Article?</h3>
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

export default AdminArticlesPage;
