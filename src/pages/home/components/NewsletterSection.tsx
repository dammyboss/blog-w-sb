import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section id="newsletter" className="relative py-24 overflow-hidden">
      {/* Gradient Banner Background */}
      <div className="absolute inset-0 bg-gradient-banner animated-gradient"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-lg rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Confetti-like elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-rise"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-6">
          <span className="text-white font-bold text-sm uppercase tracking-wider">🎉 Celebration Sale - 50% Off All Courses!</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 glow-text">
          Stay Ahead of the Curve
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
          Get weekly DevOps tips, tutorials, and exclusive content delivered straight to your inbox
        </p>

        {/* Newsletter Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 bg-white/95 backdrop-blur-sm text-primary rounded-button text-base focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300"
              />
              <button
                type="submit"
                className="btn-secondary text-base whitespace-nowrap group"
              >
                Subscribe Now
                <i className="ri-mail-send-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
            <p className="text-white/80 text-sm mt-4">
              Join <span className="font-bold">50,000+</span> developers already subscribed. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-sm border border-white/30 rounded-card p-8 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-full">
              <i className="ri-check-line text-4xl text-accent-cyan"></i>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Welcome Aboard! 🎉
            </h3>
            <p className="text-white/90">
              Check your inbox for a confirmation email. Get ready for amazing content!
            </p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-white mb-2">50K+</div>
            <div className="text-white/80 text-sm">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-white mb-2">Weekly</div>
            <div className="text-white/80 text-sm">Updates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-white mb-2">100%</div>
            <div className="text-white/80 text-sm">Free Content</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-white mb-2">No Spam</div>
            <div className="text-white/80 text-sm">Guaranteed</div>
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-rise {
          animation: rise linear infinite;
        }
      `}</style>
    </section>
  );
}
