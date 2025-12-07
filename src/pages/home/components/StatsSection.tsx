export default function StatsSection() {
  const stats = [
    {
      icon: 'ri-video-line',
      value: '500+',
      label: 'Video Tutorials',
      color: 'from-accent-cyan to-accent-cyan-light',
    },
    {
      icon: 'ri-article-line',
      value: '1,000+',
      label: 'Technical Articles',
      color: 'from-accent-cyan-light to-accent-teal',
    },
    {
      icon: 'ri-group-line',
      value: '50K+',
      label: 'Active Learners',
      color: 'from-accent-teal to-accent-cyan',
    },
    {
      icon: 'ri-trophy-line',
      value: '95%',
      label: 'Success Rate',
      color: 'from-accent-cyan to-primary-purple',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-navy to-primary"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 glow-text">
            Trusted by Thousands of <span className="text-gradient">DevOps Engineers</span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Join a thriving community of professionals mastering cloud-native technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-glass p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${stat.color} rounded-2xl shadow-glow-cyan group-hover:rotate-12 transition-transform duration-300`}>
                <i className={`${stat.icon} text-3xl text-white`}></i>
              </div>
              <div className="text-5xl font-display font-bold text-white mb-2 glow-text">
                {stat.value}
              </div>
              <div className="text-text-gray font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
