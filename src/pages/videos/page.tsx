import { useState, useEffect } from 'react';
import { supabase, type Video } from '../../lib/supabase';
import VideoPlayerModal from '../../components/feature/VideoPlayerModal';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading videos:', error);
    } else if (data) {
      setVideos(data);
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.map(v => v.category))];
      setCategories(uniqueCategories);
    }
    setLoading(false);
  };

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-hero animated-gradient"></div>

        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 rounded-full bg-accent-cyan/20 blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-primary-purple/30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-accent-teal/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <i className="ri-play-circle-line absolute text-accent-cyan/20 text-6xl animate-float" style={{ top: '15%', left: '10%', animationDelay: '0s', animationDuration: '20s' }}></i>
          <i className="ri-film-line absolute text-accent-cyan/20 text-5xl animate-float" style={{ top: '25%', right: '15%', animationDelay: '2s', animationDuration: '25s' }}></i>
          <i className="ri-movie-line absolute text-accent-cyan/20 text-7xl animate-float" style={{ bottom: '20%', left: '15%', animationDelay: '4s', animationDuration: '22s' }}></i>
          <i className="ri-clapperboard-line absolute text-accent-cyan/20 text-5xl animate-float" style={{ top: '40%', right: '20%', animationDelay: '1s', animationDuration: '18s' }}></i>
        </div>

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent-cyan rounded-full animate-rise opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Giant Play Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 flex items-center justify-center bg-gradient-accent rounded-3xl shadow-glow-cyan animate-spring">
              <i className="ri-play-fill text-6xl text-white ml-2"></i>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 glow-text">
            Video <span className="text-gradient">Library</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-gray max-w-3xl mx-auto mb-12 leading-relaxed">
            <span className="text-gradient font-semibold">Learn by watching.</span> Comprehensive tutorials and hands-on demonstrations to master DevOps technologies
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center space-x-3 bg-accent-cyan/10 backdrop-blur-lg border border-accent-cyan/30 rounded-full px-6 py-3 animate-pulse">
              <i className="ri-video-line text-accent-cyan text-2xl"></i>
              <div className="text-left">
                <div className="text-2xl font-display font-bold text-white">{videos.length}+</div>
                <div className="text-text-gray text-sm">Videos</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-accent-cyan/10 backdrop-blur-lg border border-accent-cyan/30 rounded-full px-6 py-3 animate-pulse" style={{ animationDelay: '0.2s' }}>
              <i className="ri-folder-line text-accent-cyan text-2xl"></i>
              <div className="text-left">
                <div className="text-2xl font-display font-bold text-white">{categories.length - 1}</div>
                <div className="text-text-gray text-sm">Categories</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-accent-cyan/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-accent-cyan rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
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
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 flex items-center justify-center bg-accent-cyan/20 rounded-2xl mx-auto mb-4 border border-accent-cyan/30">
                <i className="ri-video-line text-4xl text-accent-cyan"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No videos found</h3>
              <p className="text-text-gray">Check back soon for new content!</p>
            </div>
          ) : (
            /* Videos Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="card-dark group hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo({ url: `https://www.youtube.com/embed/${video.youtube_id}`, title: video.title })}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent"></div>
                    
                    {/* Play Button with Ripple */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="relative">
                        <div className="absolute inset-0 w-20 h-20 bg-accent-cyan rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-20 h-20 flex items-center justify-center bg-accent-cyan rounded-full shadow-glow-cyan">
                          <i className="ri-play-fill text-4xl text-white ml-1"></i>
                        </div>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                      <span className="text-white text-sm font-semibold">{video.duration}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-accent-cyan/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-bold uppercase">{video.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-gradient transition-colors duration-300 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-text-gray text-sm mb-4 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm pt-4 border-t border-accent-cyan/10">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-text-gray">
                          <i className="ri-eye-line text-accent-cyan"></i>
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-text-gray">
                          <i className="ri-calendar-line text-accent-cyan"></i>
                          <span>{video.publish_date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedVideo && (
        <VideoPlayerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes rise {
          0% { transform: translateY(100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes spring {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(5deg); }
          75% { transform: scale(0.95) rotate(-5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-rise {
          animation: rise linear infinite;
        }
        .animate-spring {
          animation: spring 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
