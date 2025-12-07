import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, type Article, type Video } from '../../lib/supabase';
import VideoPlayerModal from './VideoPlayerModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    articles: Article[];
    videos: Video[];
  }>({ articles: [], videos: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      setSearchResults({ articles: [], videos: [] });
    }
  }, [searchQuery]);

  const performSearch = async () => {
    setIsSearching(true);
    try {
      const query = searchQuery.toLowerCase().trim();

      // Search articles
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(5);

      // Search videos
      const { data: videosData } = await supabase
        .from('videos')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(5);

      setSearchResults({
        articles: articlesData || [],
        videos: videosData || [],
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
    setSearchResults({ articles: [], videos: [] });
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults({ articles: [], videos: [] });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleSearchClose();
  };

  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleSearchClose();
  };

  const handleResultClick = (type: 'article' | 'video', id: string) => {
    handleSearchClose();
    if (type === 'article') {
      window.REACT_APP_NAVIGATE(`/articles/${id}`);
    } else {
      window.REACT_APP_NAVIGATE(`/videos`);
    }
  };

  const handleVideoClick = (video: Video) => {
    handleSearchClose();
    setSelectedVideo({
      url: `https://www.youtube.com/embed/${video.youtube_id}`,
      title: video.title,
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Videos', path: '/videos' },
    { name: 'Articles', path: '/articles' },
    { name: 'Contact', path: '/contact' },
  ];

  const totalResults = searchResults.articles.length + searchResults.videos.length;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-primary/95 backdrop-blur-lg shadow-lg border-b border-accent-cyan/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-accent rounded-xl shadow-glow-cyan group-hover:scale-110 transition-transform duration-300">
                <i className="ri-eye-line text-2xl text-white"></i>
              </div>
              <span className="text-2xl font-display font-bold text-white glow-text">
                DevOps <span className="text-gradient">WithDami</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium transition-all duration-300 hover:text-accent-cyan cursor-pointer ${
                    location.pathname === link.path
                      ? 'text-accent-cyan glow-text'
                      : 'text-text-gray hover:glow-text'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={handleSearchOpen}
                className="text-text-gray hover:text-accent-cyan transition-colors duration-300 cursor-pointer"
              >
                <i className="ri-search-line text-xl"></i>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-accent-cyan transition-colors duration-300 cursor-pointer"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-navy/98 backdrop-blur-lg border-t border-accent-cyan/10">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-base font-medium transition-all duration-300 hover:text-accent-cyan cursor-pointer ${
                    location.pathname === link.path
                      ? 'text-accent-cyan'
                      : 'text-text-gray'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSearchOpen();
                }}
                className="flex items-center gap-2 text-base font-medium text-text-gray hover:text-accent-cyan transition-colors cursor-pointer"
              >
                <i className="ri-search-line text-xl"></i>
                Search
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]"
              onClick={handleBackdropClick}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-20 left-6 right-6 max-w-4xl mx-auto z-[120]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-primary via-primary-navy to-primary rounded-3xl shadow-2xl overflow-hidden border border-accent-cyan/30">
                {/* Search Header */}
                <div className="p-8 border-b border-accent-cyan/20 bg-gradient-to-r from-accent-cyan/5 to-transparent">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-accent rounded-xl shadow-glow-cyan">
                        <i className="ri-search-2-line text-2xl text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white glow-text">Global Search</h3>
                        <p className="text-sm text-text-gray">Search across all content</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseButtonClick}
                      type="button"
                      className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-all duration-300 cursor-pointer group flex-shrink-0"
                      aria-label="Close search"
                    >
                      <i className="ri-close-line text-3xl text-white group-hover:text-accent-cyan group-hover:rotate-90 transition-all duration-300"></i>
                    </button>
                  </div>
                  
                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type to search articles, videos, and more..."
                      autoFocus
                      className="w-full h-16 pl-16 pr-16 rounded-2xl bg-background-card/50 backdrop-blur-sm border-2 border-accent-cyan/30 focus:border-accent-cyan focus:outline-none text-base text-white placeholder-text-gray shadow-inner"
                    />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-accent-cyan/20 rounded-lg">
                      <i className="ri-search-line text-xl text-accent-cyan"></i>
                    </div>
                    {isSearching && (
                      <i className="ri-loader-4-line text-xl text-accent-cyan absolute right-5 top-1/2 -translate-y-1/2 animate-spin"></i>
                    )}
                  </div>

                  {searchQuery && (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-text-gray">
                        Found <span className="font-bold text-accent-cyan text-lg">{totalResults}</span> result{totalResults !== 1 ? 's' : ''}
                      </p>
                      {totalResults > 0 && (
                        <div className="flex items-center gap-2 text-xs text-text-gray">
                          <i className="ri-lightbulb-flash-line text-accent-cyan"></i>
                          <span>Click any result to view</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Search Results */}
                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                  {searchQuery.trim() ? (
                    <>
                      {/* Articles Results */}
                      {searchResults.articles.length > 0 && (
                        <div className="p-6 border-b border-accent-cyan/10">
                          <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 flex items-center justify-center bg-accent-cyan/20 rounded-lg">
                              <i className="ri-article-line text-accent-cyan"></i>
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                              Articles <span className="text-accent-cyan">({searchResults.articles.length})</span>
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {searchResults.articles.map((article) => (
                              <div
                                key={article.id}
                                onClick={() => handleResultClick('article', article.id)}
                                className="flex items-start gap-4 p-4 rounded-xl bg-background-card/30 hover:bg-background-card/60 border border-transparent hover:border-accent-cyan/30 transition-all duration-300 cursor-pointer group"
                              >
                                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-accent-cyan/20">
                                  <img
                                    src={article.featured_image}
                                    alt={article.title}
                                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 bg-accent-cyan/20 rounded-full text-xs font-bold text-accent-cyan">
                                      {article.category}
                                    </span>
                                    <span className="text-xs text-text-gray flex items-center gap-1">
                                      <i className="ri-time-line"></i>
                                      {article.reading_time}
                                    </span>
                                  </div>
                                  <h5 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors line-clamp-1 mb-2">
                                    {article.title}
                                  </h5>
                                  <p className="text-sm text-text-gray line-clamp-2">
                                    {article.excerpt}
                                  </p>
                                </div>
                                <i className="ri-arrow-right-line text-xl text-accent-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"></i>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Videos Results */}
                      {searchResults.videos.length > 0 && (
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 flex items-center justify-center bg-accent-orange/20 rounded-lg">
                              <i className="ri-video-line text-accent-orange"></i>
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                              Videos <span className="text-accent-orange">({searchResults.videos.length})</span>
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {searchResults.videos.map((video) => (
                              <div
                                key={video.id}
                                onClick={() => handleVideoClick(video)}
                                className="flex items-start gap-4 p-4 rounded-xl bg-background-card/30 hover:bg-background-card/60 border border-transparent hover:border-accent-orange/30 transition-all duration-300 cursor-pointer group"
                              >
                                <div className="w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden relative border border-accent-orange/20">
                                  <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover object-top"
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                    <div className="w-12 h-12 flex items-center justify-center bg-white/95 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                      <i className="ri-play-fill text-2xl text-accent-orange"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 bg-accent-orange/20 rounded-full text-xs font-bold text-accent-orange">
                                      {video.category}
                                    </span>
                                    <span className="text-xs text-text-gray flex items-center gap-1">
                                      <i className="ri-time-line"></i>
                                      {video.duration}
                                    </span>
                                  </div>
                                  <h5 className="text-base font-bold text-white group-hover:text-accent-orange transition-colors line-clamp-1 mb-2">
                                    {video.title}
                                  </h5>
                                  <p className="text-sm text-text-gray line-clamp-2">
                                    {video.description}
                                  </p>
                                </div>
                                <i className="ri-arrow-right-line text-xl text-accent-orange opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"></i>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No Results */}
                      {totalResults === 0 && !isSearching && (
                        <div className="p-16 text-center">
                          <div className="w-20 h-20 mx-auto mb-6 bg-accent-cyan/10 rounded-full flex items-center justify-center">
                            <i className="ri-search-line text-4xl text-accent-cyan"></i>
                          </div>
                          <h4 className="text-xl font-black text-white mb-3">No Results Found</h4>
                          <p className="text-sm text-text-gray max-w-md mx-auto">
                            We couldn't find any content matching "<span className="text-accent-cyan font-semibold">{searchQuery}</span>". Try different keywords or browse our categories.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-16 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow-cyan">
                        <i className="ri-search-2-line text-4xl text-white"></i>
                      </div>
                      <h4 className="text-xl font-black text-white mb-3 glow-text">Start Your Search</h4>
                      <p className="text-sm text-text-gray max-w-md mx-auto leading-relaxed">
                        Discover articles and videos by searching for topics, categories, or keywords that interest you
                      </p>
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <span className="px-4 py-2 bg-accent-cyan/10 rounded-full text-xs text-accent-cyan font-semibold">DevOps</span>
                        <span className="px-4 py-2 bg-accent-cyan/10 rounded-full text-xs text-accent-cyan font-semibold">Cloud</span>
                        <span className="px-4 py-2 bg-accent-cyan/10 rounded-full text-xs text-accent-cyan font-semibold">AI</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {selectedVideo && (
        <VideoPlayerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(45, 177, 207, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(45, 177, 207, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 177, 207, 0.5);
        }
      `}</style>
    </>
  );
}
