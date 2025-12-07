import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type Article } from '../../lib/supabase';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading articles:', error);
    } else if (data) {
      setArticles(data);
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.map(a => a.category))];
      setCategories(uniqueCategories);
    }
    setLoading(false);
  };

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero animated-gradient"></div>
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent-cyan/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary-purple/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <div className="inline-block bg-accent-cyan/10 border border-accent-cyan/30 rounded-full px-6 py-2 mb-6">
            <span className="text-accent-cyan font-semibold text-sm uppercase tracking-wider">Knowledge Base</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 glow-text">
            Explore Our <span className="text-gradient">Articles</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-gray max-w-3xl mx-auto leading-relaxed">
            Discover insightful articles on technology, science, and innovation
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-accent-cyan text-white shadow-glow-cyan scale-105'
                    : 'bg-accent-cyan/10 text-text-gray hover:bg-accent-cyan/20 hover:text-accent-cyan border border-accent-cyan/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <i className="ri-loader-4-line text-4xl text-accent-cyan animate-spin"></i>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 flex items-center justify-center bg-accent-cyan/20 rounded-2xl mx-auto mb-4 border border-accent-cyan/30">
                <i className="ri-article-line text-4xl text-accent-cyan"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-text-gray">Check back soon for new content!</p>
            </div>
          ) : (
            /* Articles Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.id}`}
                  className="card-dark group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 group-hover:opacity-60 ${
                        index % 12 === 0 ? 'bg-gradient-to-br from-purple-900/80 to-violet-900/80' :
                        index % 12 === 1 ? 'bg-gradient-to-br from-rose-900/80 to-pink-900/80' :
                        index % 12 === 2 ? 'bg-gradient-to-br from-blue-900/80 to-cyan-900/80' :
                        index % 12 === 3 ? 'bg-gradient-to-br from-amber-900/80 to-orange-900/80' :
                        index % 12 === 4 ? 'bg-gradient-to-br from-emerald-900/80 to-teal-900/80' :
                        index % 12 === 5 ? 'bg-gradient-to-br from-fuchsia-900/80 to-purple-900/80' :
                        index % 12 === 6 ? 'bg-gradient-to-br from-red-900/80 to-rose-900/80' :
                        index % 12 === 7 ? 'bg-gradient-to-br from-indigo-900/80 to-blue-900/80' :
                        index % 12 === 8 ? 'bg-gradient-to-br from-yellow-900/80 to-amber-900/80' :
                        index % 12 === 9 ? 'bg-gradient-to-br from-green-900/80 to-emerald-900/80' :
                        index % 12 === 10 ? 'bg-gradient-to-br from-pink-900/80 to-rose-900/80' :
                        'bg-gradient-to-br from-cyan-900/80 to-blue-900/80'
                      } opacity-80`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-accent-cyan/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-white text-xs font-bold uppercase">{article.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-gradient transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-text-gray text-sm mb-6 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-6 border-t border-accent-cyan/10">
                      <div className="text-text-gray text-xs">{article.publish_date}</div>
                      <div className="flex items-center space-x-2 text-text-gray text-xs">
                        <i className="ri-time-line text-accent-cyan"></i>
                        <span>{article.reading_time}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
