import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type Article } from '../../../lib/supabase';

export default function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error loading articles:', error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-navy to-primary"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <i className="ri-loader-4-line text-4xl text-accent-cyan animate-spin"></i>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-navy to-primary"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block bg-accent-cyan/10 border border-accent-cyan/30 rounded-full px-6 py-2 mb-4">
              <span className="text-accent-cyan font-semibold text-sm uppercase tracking-wider">Latest Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white glow-text">
              Featured <span className="text-gradient">Articles</span>
            </h2>
          </div>
          <Link
            to="/articles"
            className="hidden md:flex items-center space-x-2 text-accent-cyan hover:text-accent-cyan-light transition-colors duration-300 font-semibold cursor-pointer"
          >
            <span>View All</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="card-dark group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay - Dynamic colors */}
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

        {/* Mobile View All Button */}
        <div className="text-center mt-12 md:hidden">
          <Link to="/articles" className="btn-primary inline-flex items-center whitespace-nowrap">
            View All Articles
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
