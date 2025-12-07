import { Link } from 'react-router-dom';

export default function TopicsShowcase() {
  const topics = [
    {
      title: 'Docker & Containers',
      description: 'Master containerization and orchestration',
      icon: 'ri-box-3-line',
      courses: 12,
      hours: 24,
      color: 'from-accent-cyan to-accent-cyan-light',
      image: 'https://readdy.ai/api/search-image?query=docker%20containers%20kubernetes%20pods%20orchestration%20isometric%203d%20illustration%20dark%20background%20tech%20modern%20clean%20simple&width=400&height=300&seq=topic-docker&orientation=landscape',
    },
    {
      title: 'CI/CD Pipelines',
      description: 'Automate your deployment workflows',
      icon: 'ri-git-branch-line',
      courses: 15,
      hours: 30,
      color: 'from-accent-cyan-light to-accent-teal',
      image: 'https://readdy.ai/api/search-image?query=cicd%20pipeline%20automation%20jenkins%20github%20actions%20isometric%203d%20illustration%20dark%20background%20tech%20modern%20clean%20simple&width=400&height=300&seq=topic-cicd&orientation=landscape',
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Build scalable cloud architectures',
      icon: 'ri-cloud-line',
      courses: 18,
      hours: 36,
      color: 'from-accent-teal to-accent-cyan',
      image: 'https://readdy.ai/api/search-image?query=cloud%20infrastructure%20aws%20azure%20servers%20networking%20isometric%203d%20illustration%20dark%20background%20tech%20modern%20clean%20simple&width=400&height=300&seq=topic-cloud&orientation=landscape',
    },
    {
      title: 'Monitoring & Observability',
      description: 'Track and optimize system performance',
      icon: 'ri-line-chart-line',
      courses: 10,
      hours: 20,
      color: 'from-accent-cyan to-primary-purple',
      image: 'https://readdy.ai/api/search-image?query=monitoring%20observability%20dashboards%20metrics%20graphs%20analytics%20isometric%203d%20illustration%20dark%20background%20tech%20modern%20clean%20simple&width=400&height=300&seq=topic-monitoring&orientation=landscape',
    },
    {
      title: 'Infrastructure as Code',
      description: 'Manage infrastructure with code',
      icon: 'ri-code-s-slash-line',
      courses: 14,
      hours: 28,
      color: 'from-primary-purple to-accent-cyan',
      image: 'https://readdy.ai/api/search-image?query=infrastructure%20as%20code%20terraform%20ansible%20configuration%20isometric%203d%20illustration%20dark%20background%20tech%20modern%20clean%20simple&width=400&height=300&seq=topic-iac&orientation=landscape',
    },
    {
      title: 'Security & Compliance',
      description: 'Secure your DevOps pipeline',
      icon: 'ri-shield-check-line',
      courses: 11,
      hours: 22,
      color: 'from-accent-teal to-accent-cyan-light',
      image: 'https://readdy.ai/api/search-image?query=security%20compliance%20shield%20lock%20protection%20cybersecurity%20isometric%203d%20illustration%20dark%20background%20tech%20modern%20clean%20simple&width=400&height=300&seq=topic-security&orientation=landscape',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-navy to-primary"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-accent-cyan/10 border border-accent-cyan/30 rounded-full px-6 py-2 mb-6">
            <span className="text-accent-cyan font-semibold text-sm uppercase tracking-wider">Curated Courses</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 glow-text">
            Curated Courses for <span className="text-gradient">Future-Ready Skills</span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Master the technologies that power modern infrastructure with hands-on, practical courses
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="card-dark group hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-card via-background-card/50 to-transparent"></div>
                <div className={`absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br ${topic.color} rounded-xl shadow-glow-cyan`}>
                  <i className={`${topic.icon} text-2xl text-white`}></i>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-gradient transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-text-gray mb-6 leading-relaxed">
                  {topic.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-text-gray">
                    <i className="ri-book-line text-accent-cyan"></i>
                    <span>{topic.courses} courses</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-gray">
                    <i className="ri-time-line text-accent-cyan"></i>
                    <span>{topic.hours} hours</span>
                  </div>
                </div>

                {/* Instructor Badge */}
                <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-accent-cyan/10">
                  <img
                    src={`https://readdy.ai/api/search-image?query=professional%20devops%20instructor%20expert%20teacher%20headshot%20portrait%20simple%20clean%20background%20confident%20smile&width=40&height=40&seq=instructor-${index}&orientation=squarish`}
                    alt="Instructor"
                    className="w-10 h-10 rounded-full border-2 border-accent-cyan object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">Expert Instructor</div>
                    <div className="text-text-gray text-xs">10+ years experience</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/videos" className="btn-primary text-lg group inline-flex items-center">
            View All Courses
            <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
