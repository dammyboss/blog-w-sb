import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import LikeButton from '../../../components/feature/LikeButton';
import CommentSection from '../../../components/feature/CommentSection';

const formatViews = (views: number) => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  }
  return views.toString();
};

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      if (!data) {
        setError('Article not found');
        return;
      }

      // Increment views
      await supabase
        .from('articles')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id);

      setArticle({
        id: data.id,
        title: data.title,
        content: data.content,
        category: data.category,
        readTime: data.reading_time,
        date: new Date(data.publish_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        image: data.featured_image,
        excerpt: data.excerpt,
        tags: data.tags || [],
        views: data.views || 0,
        author: {
          name: 'Dami Ondeinde',
          avatar: '/author-avatar.jpg',
          bio: 'DevOps Engineer and Technical Writer with 10+ years of experience in cloud infrastructure and containerization.',
        },
      });
    } catch (err: unknown) {
      console.error('Load article error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load article');
      }
    } finally {
      setLoading(false);
    }
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'Building CI/CD Pipelines with GitHub Actions',
      category: 'CI/CD',
      image: 'https://readdy.ai/api/search-image?query=github%20actions%20cicd%20automation%20workflow%20pipeline%20code%20deployment%20modern%20clean%20simple%20dark%20background&width=400&height=300&seq=related-1&orientation=landscape',
    },
    {
      id: 3,
      title: 'Kubernetes Best Practices for Production',
      category: 'Kubernetes',
      image: 'https://readdy.ai/api/search-image?query=kubernetes%20cluster%20orchestration%20containers%20pods%20infrastructure%20modern%20clean%20simple%20dark%20background&width=400&height=300&seq=related-2&orientation=landscape',
    },
    {
      id: 4,
      title: 'Monitoring Your Infrastructure with Prometheus',
      category: 'Monitoring',
      image: 'https://readdy.ai/api/search-image?query=prometheus%20monitoring%20grafana%20dashboards%20metrics%20graphs%20analytics%20modern%20clean%20simple%20dark%20background&width=400&height=300&seq=related-3&orientation=landscape',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-accent-cyan animate-spin"></i>
          <p className="mt-4 text-sm text-text-gray">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
            <i className="ri-error-warning-line text-4xl text-red-400"></i>
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Article Not Found</h2>
          <p className="text-sm text-text-gray mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <Link
            to="/articles"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero animated-gradient"></div>
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-primary"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-text-gray text-sm mb-6">
            <Link to="/" className="hover:text-accent-cyan transition-colors duration-300">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/articles" className="hover:text-accent-cyan transition-colors duration-300">Articles</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-accent-cyan">{article.category}</span>
          </div>

          {/* Category Badge */}
          <div className="inline-block bg-accent-cyan/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-white text-sm font-bold uppercase">{article.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 glow-text">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-text-gray">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full border-2 border-accent-cyan object-cover"
              />
              <div>
                <div className="text-white font-semibold">{article.author.name}</div>
                <div className="text-sm">{article.date}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-time-line text-accent-cyan"></i>
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-eye-line text-accent-cyan"></i>
              <span>{formatViews(article.views + 1)} views</span>
            </div>
            <div className="flex items-center space-x-2">
              <LikeButton articleId={article.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-glass p-8 md:p-12">
            {/* Featured Image */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-12 border border-accent-cyan/20">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-card/80 via-transparent to-transparent"></div>
            </div>

            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                color: '#B8C5D6',
              }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-accent-cyan/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-display font-bold text-xl mb-2">Share this article</h3>
                  <p className="text-text-gray text-sm">Help others learn from this content</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="w-12 h-12 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                    <i className="ri-twitter-x-line text-accent-cyan hover:text-white text-xl"></i>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                    <i className="ri-linkedin-fill text-accent-cyan hover:text-white text-xl"></i>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                    <i className="ri-facebook-fill text-accent-cyan hover:text-white text-xl"></i>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                    <i className="ri-link text-accent-cyan hover:text-white text-xl"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-accent-cyan/10">
              <div className="flex items-start space-x-6">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-20 h-20 rounded-full border-2 border-accent-cyan object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-white font-display font-bold text-xl mb-2">About {article.author.name}</h3>
                  <p className="text-text-gray leading-relaxed mb-4">{article.author.bio}</p>
                  <div className="flex items-center space-x-3">
                    <a href="#" className="text-accent-cyan hover:text-accent-cyan-light transition-colors duration-300 cursor-pointer">
                      <i className="ri-twitter-x-line text-xl"></i>
                    </a>
                    <a href="https://linkedin.com/in/damilola-onadeinde" className="text-accent-cyan hover:text-accent-cyan-light transition-colors duration-300 cursor-pointer">
                      <i className="ri-linkedin-fill text-xl"></i>
                    </a>
                    <a href="https://github.com/dammyboss" className="text-accent-cyan hover:text-accent-cyan-light transition-colors duration-300 cursor-pointer">
                      <i className="ri-github-fill text-xl"></i>
                    </a>
                    <a href="https://youtube.com/@devopswithdami" className="text-accent-cyan hover:text-accent-cyan-light transition-colors duration-300 cursor-pointer">
                      <i className="ri-youtube-line text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <CommentSection articleId={article.id} />

      </section>

      {/* Related Articles */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center glow-text">
            Related <span className="text-gradient">Articles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/articles/${relatedArticle.id}`}
                className="card-dark group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-accent-cyan/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-bold uppercase">{relatedArticle.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-gradient transition-colors duration-300">
                    {relatedArticle.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .prose h2 {
          color: #FFFFFF;
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          font-family: 'Poppins', 'Inter', sans-serif;
        }
        .prose h3 {
          color: #FFFFFF;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        .prose ul, .prose ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.75rem;
          line-height: 1.8;
        }
        .prose strong {
          color: #2DB1CF;
          font-weight: 600;
        }
        .prose pre {
          background: #0A1016;
          border: 1px solid rgba(45, 177, 207, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }
        .prose code {
          color: #2DB1CF;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        .prose pre code {
          color: #E5E7EB;
        }
      `}</style>
    </div>
  );
}
