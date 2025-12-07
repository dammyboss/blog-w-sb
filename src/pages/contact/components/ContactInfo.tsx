export default function ContactInfo() {
  const contactDetails = [
    {
      icon: 'ri-mail-line',
      title: 'Email',
      value: 'hello@devopswithdami.com',
      link: 'mailto:hello@devopswithdami.com',
      color: 'from-accent-cyan to-accent-cyan-light',
    },
    {
      icon: 'ri-phone-line',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'from-accent-cyan-light to-accent-teal',
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Location',
      value: 'San Francisco, CA',
      link: '#',
      color: 'from-accent-teal to-accent-cyan',
    },
  ];

  return (
    <div className="card-glass p-8">
      <h3 className="text-2xl font-display font-bold text-white mb-6 glow-text">
        Contact <span className="text-gradient">Information</span>
      </h3>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <a
            key={index}
            href={detail.link}
            className="flex items-start space-x-4 group cursor-pointer"
          >
            <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${detail.color} rounded-xl shadow-glow-cyan group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
              <i className={`${detail.icon} text-2xl text-white`}></i>
            </div>
            <div className="flex-1">
              <div className="text-text-gray text-sm mb-1">{detail.title}</div>
              <div className="text-white font-semibold group-hover:text-gradient transition-colors duration-300">
                {detail.value}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-accent-cyan/10">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 flex items-center justify-center bg-gradient-accent rounded-xl shadow-glow-cyan flex-shrink-0">
            <i className="ri-time-line text-2xl text-white"></i>
          </div>
          <div>
            <div className="text-text-gray text-sm mb-1">Office Hours</div>
            <div className="text-white font-semibold">Monday - Friday</div>
            <div className="text-text-gray text-sm">9:00 AM - 6:00 PM PST</div>
          </div>
        </div>
      </div>
    </div>
  );
}
