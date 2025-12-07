import { Link } from 'react-router-dom';

export default function Footer() {
  const learningPaths = [
    { name: 'DevOps Engineer', path: '#' },
    { name: 'Cloud Architect', path: '#' },
    { name: 'Site Reliability Engineer', path: '#' },
    { name: 'Platform Engineer', path: '#' },
  ];

  const courses = [
    { name: 'Docker & Kubernetes', path: '/videos' },
    { name: 'CI/CD Pipelines', path: '/videos' },
    { name: 'Cloud Infrastructure', path: '/videos' },
    { name: 'Monitoring & Logging', path: '/videos' },
  ];

  const resources = [
    { name: 'Articles', path: '/articles' },
    { name: 'Videos', path: '/videos' },
    { name: 'Contact', path: '/contact' },
    { name: 'Newsletter', path: '/#newsletter' },
  ];

  const community = [
    { name: 'Discord', path: '#' },
    { name: 'GitHub', path: '#' },
    { name: 'Twitter', path: '#' },
    { name: 'LinkedIn', path: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-primary-navy to-primary border-t border-accent-cyan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-accent rounded-xl shadow-glow-cyan group-hover:scale-110 transition-transform duration-300">
                <i className="ri-eye-line text-2xl text-white"></i>
              </div>
              <span className="text-xl font-display font-bold text-white">
                DevOps <span className="text-gradient">WithDami</span>
              </span>
            </Link>
            <p className="text-text-gray text-sm leading-relaxed mb-6">
              Build, Break, Fix, Learn. Master DevOps skills through hands-on learning and practical experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                <i className="ri-twitter-x-line text-accent-cyan hover:text-white text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                <i className="ri-linkedin-fill text-accent-cyan hover:text-white text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                <i className="ri-github-fill text-accent-cyan hover:text-white text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-accent-cyan/10 hover:bg-accent-cyan rounded-lg transition-all duration-300 hover:shadow-glow-cyan cursor-pointer">
                <i className="ri-youtube-fill text-accent-cyan hover:text-white text-lg"></i>
              </a>
            </div>
          </div>

          {/* Learning Paths */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Learning Paths</h4>
            <ul className="space-y-3">
              {learningPaths.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-text-gray hover:text-accent-cyan transition-colors duration-300 text-sm cursor-pointer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Courses</h4>
            <ul className="space-y-3">
              {courses.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-text-gray hover:text-accent-cyan transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-text-gray hover:text-accent-cyan transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Community</h4>
            <ul className="space-y-3">
              {community.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-text-gray hover:text-accent-cyan transition-colors duration-300 text-sm cursor-pointer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent-cyan/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-gray text-sm">
              © {new Date().getFullYear()} DevOps WithDami. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-text-gray hover:text-accent-cyan transition-colors duration-300 text-sm cursor-pointer">
                Privacy Policy
              </a>
              <a href="#" className="text-text-gray hover:text-accent-cyan transition-colors duration-300 text-sm cursor-pointer">
                Terms of Service
              </a>
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-text-gray hover:text-accent-cyan transition-colors duration-300 text-sm cursor-pointer">
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
