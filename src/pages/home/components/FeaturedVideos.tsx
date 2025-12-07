import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type Video } from '../../../lib/supabase';
import VideoPlayerModal from '../../../components/feature/VideoPlayerModal';

export default function FeaturedVideos() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error loading videos:', error);
    } else {
      setVideos(data || []);
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

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-navy to-primary"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block bg-accent-cyan/10 border border-accent-cyan/30 rounded-full px-6 py-2 mb-4">
              <span className="text-accent-cyan font-semibold text-sm uppercase tracking-wider">Learn by Doing</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white glow-text">
              Featured <span className="text-gradient">Video Tutorials</span>
            </h2>
          </div>
          <Link
            to="/videos"
            className="hidden md:flex items-center space-x-2 text-accent-cyan hover:text-accent-cyan-light transition-colors duration-300 font-semibold cursor-pointer"
          >
            <span>View All</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="card-dark group hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedVideo({ url: `https://www.youtube.com/embed/${video.youtube_id}`, title: video.title })}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 flex items-center justify-center bg-accent-cyan rounded-full shadow-glow-cyan scale-100 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-play-fill text-3xl text-white ml-1"></i>
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
                  <div className="flex items-center space-x-2 text-text-gray">
                    <i className="ri-eye-line text-accent-cyan"></i>
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center space-x-2 text-accent-cyan font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    <span>Watch Now</span>
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-12 md:hidden">
          <Link to="/videos" className="btn-primary inline-flex items-center whitespace-nowrap">
            View All Videos
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
}
