import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        window.REACT_APP_NAVIGATE('/admin/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-orange/10 via-background to-secondary/10 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center bg-gradient-accent rounded-2xl mx-auto mb-4">
              <i className="ri-shield-user-line text-4xl text-white"></i>
            </div>
            <h1 className="text-3xl font-black text-primary mb-2">Admin Login</h1>
            <p className="text-text-gray">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <i className="ri-mail-line absolute left-4 top-1/2 transform -translate-y-1/2 text-text-gray"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <i className="ri-lock-line absolute left-4 top-1/2 transform -translate-y-1/2 text-text-gray"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-background border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-orange text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <i className="ri-error-warning-line text-red-500 text-xl"></i>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-accent text-white font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/')}
              className="text-sm text-text-gray hover:text-primary transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line mr-1"></i>
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;