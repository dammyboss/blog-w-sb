import { useState, useEffect } from 'react';

export default function ContactHero() {
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

      {/* Floating Communication Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <i className="ri-mail-line absolute text-accent-cyan/20 text-6xl animate-float" style={{ top: '15%', left: '10%', animationDelay: '0s', animationDuration: '20s' }}></i>
        <i className="ri-message-3-line absolute text-accent-cyan/20 text-5xl animate-float" style={{ top: '25%', right: '15%', animationDelay: '2s', animationDuration: '25s' }}></i>
        <i className="ri-chat-3-line absolute text-accent-cyan/20 text-7xl animate-float" style={{ bottom: '20%', left: '15%', animationDelay: '4s', animationDuration: '22s' }}></i>
        <i className="ri-customer-service-2-line absolute text-accent-cyan/20 text-5xl animate-float" style={{ top: '40%', right: '20%', animationDelay: '1s', animationDuration: '18s' }}></i>
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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 flex items-center justify-center bg-gradient-accent rounded-3xl shadow-glow-cyan animate-spring">
            <i className="ri-customer-service-2-line text-5xl text-white"></i>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 glow-text">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-text-gray max-w-3xl mx-auto mb-8 leading-relaxed">
          Have questions? We'd love to hear from you. <span className="text-gradient font-semibold">Send us a message</span> and we'll respond as soon as possible.
        </p>

        {/* Response Time Badge */}
        <div className="inline-flex items-center space-x-3 bg-accent-cyan/10 backdrop-blur-lg border border-accent-cyan/30 rounded-full px-6 py-3">
          <i className="ri-time-line text-accent-cyan text-xl"></i>
          <span className="text-text-gray text-sm">Average response time: <span className="text-accent-cyan font-bold">24 hours</span></span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent-cyan/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-accent-cyan rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

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
    </section>
  );
}
