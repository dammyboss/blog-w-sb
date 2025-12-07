import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card-glass p-8 md:p-10">
      <h2 className="text-3xl font-display font-bold text-white mb-6 glow-text">
        Send us a <span className="text-gradient">Message</span>
      </h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-primary/50 border border-accent-cyan/20 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-primary/50 border border-accent-cyan/20 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-white font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-primary/50 border border-accent-cyan/20 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-primary/50 border border-accent-cyan/20 rounded-xl text-white placeholder-text-gray focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all duration-300 resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full text-lg group"
          >
            Send Message
            <i className="ri-send-plane-fill ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
          </button>
        </form>
      ) : (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-accent rounded-full shadow-glow-cyan">
            <i className="ri-check-line text-5xl text-white"></i>
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Message Sent! 🎉
          </h3>
          <p className="text-text-gray">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
        </div>
      )}
    </div>
  );
}
