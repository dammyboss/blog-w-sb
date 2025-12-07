import { useState, useEffect } from 'react';
import VideoPlayerModal from '../../../components/feature/VideoPlayerModal';

export default function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
        <i className="ri-code-s-slash-line absolute text-accent-cyan/20 text-6xl animate-float" style={{ top: '15%', left: '10%', animationDelay: '0s', animationDuration: '20s' }}></i>
        <i className="ri-terminal-box-line absolute text-accent-cyan/20 text-5xl animate-float" style={{ top: '25%', right: '15%', animationDelay: '2s', animationDuration: '25s' }}></i>
        <i className="ri-cloud-line absolute text-accent-cyan/20 text-7xl animate-float" style={{ bottom: '20%', left: '15%', animationDelay: '4s', animationDuration: '22s' }}></i>
        <i className="ri-database-2-line absolute text-accent-cyan/20 text-5xl animate-float" style={{ top: '40%', right: '20%', animationDelay: '1s', animationDuration: '18s' }}></i>
        <i className="ri-git-branch-line absolute text-accent-cyan/20 text-6xl animate-float" style={{ bottom: '30%', right: '10%', animationDelay: '3s', animationDuration: '24s' }}></i>
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* User Badge */}
          <div className="inline-flex items-center space-x-3 bg-accent-cyan/10 backdrop-blur-lg border border-accent-cyan/30 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <div className="flex -space-x-2">
              <img src="https://readdy.ai/api/search-image?query=professional%20software%20engineer%20headshot%20portrait%20simple%20clean%20background%20confident%20smile%20modern%20tech%20professional&width=40&height=40&seq=user1&orientation=squarish" alt="User" className="w-8 h-8 rounded-full border-2 border-accent-cyan object-cover" />
              <img src="https://readdy.ai/api/search-image?query=professional%20devops%20engineer%20headshot%20portrait%20simple%20clean%20background%20confident%20smile%20modern%20tech%20professional&width=40&height=40&seq=user2&orientation=squarish" alt="User" className="w-8 h-8 rounded-full border-2 border-accent-cyan object-cover" />
              <img src="https://readdy.ai/api/search-image?query=professional%20cloud%20architect%20headshot%20portrait%20simple%20clean%20background%20confident%20smile%20modern%20tech%20professional&width=40&height=40&seq=user3&orientation=squarish" alt="User" className="w-8 h-8 rounded-full border-2 border-accent-cyan object-cover" />
            </div>
            <span className="text-text-gray text-sm font-medium">Join <span className="text-accent-cyan font-bold">50,000+</span> learners</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 animate-fade-in glow-text" style={{ animationDelay: '0.2s' }}>
            Build, Break, Fix,
            <br />
            <span className="text-gradient">Learn</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-text-gray max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Master <span className="text-gradient font-semibold">DevOps, Cloud, and Infrastructure</span> through hands-on labs, real-world projects, and expert-led courses. Build the skills that matter.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button className="bg-accent-cyan hover:bg-accent-cyan-light text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-glow-cyan hover:shadow-[0_0_40px_rgba(0,184,212,0.6)] hover:scale-105 whitespace-nowrap cursor-pointer group">
              Start Learning Free
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>
          </div>

          {/* Featured Video Card */}
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
              <div className="absolute inset-0 bg-gradient-accent rounded-card blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
              <div className="relative card-glass overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-accent-cyan text-white text-xs font-bold px-4 py-2 rounded-full animate-pulse">
                    LATEST VIDEO
                  </span>
                </div>
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=modern%20devops%20engineer%20working%20with%20kubernetes%20docker%20containers%20cloud%20infrastructure%20monitoring%20dashboards%20dark%20tech%20workspace%20multiple%20screens%20code%20terminal%20professional%20setup&width=1200&height=600&seq=hero-video&orientation=landscape"
                    alt="Complete DevOps Tutorial"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 flex items-center justify-center bg-accent-cyan rounded-full shadow-glow-cyan group-hover:scale-110 transition-all duration-300 animate-pulse">
                      <i className="ri-play-fill text-4xl text-white ml-1"></i>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Complete DevOps Tutorial for Beginners
                  </h3>
                  <p className="text-text-gray">
                    Learn the fundamentals of DevOps, CI/CD, and cloud infrastructure in this comprehensive guide
                  </p>
                </div>
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
      </div>

      <VideoPlayerModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Complete DevOps Tutorial for Beginners"
      />

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
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-rise {
          animation: rise linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
