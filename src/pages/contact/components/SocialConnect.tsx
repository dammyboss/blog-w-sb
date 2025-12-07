export default function SocialConnect() {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: 'ri-twitter-x-line',
      url: '#',
      color: 'from-accent-cyan to-accent-cyan-light',
      followers: '25K',
    },
    {
      name: 'LinkedIn',
      icon: 'ri-linkedin-fill',
      url: '#',
      color: 'from-accent-cyan-light to-accent-teal',
      followers: '18K',
    },
    {
      name: 'GitHub',
      icon: 'ri-github-fill',
      url: '#',
      color: 'from-accent-teal to-accent-cyan',
      followers: '12K',
    },
    {
      name: 'YouTube',
      icon: 'ri-youtube-fill',
      url: '#',
      color: 'from-accent-cyan to-primary-purple',
      followers: '50K',
    },
  ];

  return (
    <div className="card-glass p-8">
      <h3 className="text-2xl font-display font-bold text-white mb-6 glow-text">
        Connect on <span className="text-gradient">Social Media</span>
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            className="card-dark p-6 text-center group hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${social.color} rounded-2xl shadow-glow-cyan group-hover:rotate-12 transition-transform duration-300`}>
              <i className={`${social.icon} text-3xl text-white`}></i>
            </div>
            <div className="text-white font-semibold mb-1 group-hover:text-gradient transition-colors duration-300">
              {social.name}
            </div>
            <div className="text-text-gray text-sm">
              {social.followers} followers
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl">
        <div className="flex items-center space-x-3">
          <i className="ri-information-line text-accent-cyan text-xl"></i>
          <p className="text-text-gray text-sm">
            Follow us for daily DevOps tips, tutorials, and community updates
          </p>
        </div>
      </div>
    </div>
  );
}
