import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { contactInfo, personalInfo } from './mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'web-development'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Mock form submission
  //   setIsSubmitted(true);
  //   setTimeout(() => {
  //     setIsSubmitted(false);
  //     setFormData({
  //       name: '',
  //       email: '',
  //       subject: '',
  //       message: '',
  //       projectType: 'web-development'
  //     });
  //   }, 3000);
  // };

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          projectType: "web-development",
        });
      }, 3000);
    } else {
      alert("❌ Failed to send message. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ An error occurred.");
  }
};


  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'blue'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'green'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      color: 'purple'
    }
  ];

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'social-media', label: 'Social Media Marketing' },
    { value: 'digital-strategy', label: 'Digital Strategy' },
    { value: 'consultation', label: 'Consultation' }
  ];

  const colorMap = {
    blue: {
      bg: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
      hover: 'hover:border-blue-400'
    },
    green: {
      bg: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30',
      icon: 'text-green-400',
      hover: 'hover:border-green-400'
    },
    purple: {
      bg: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30',
      icon: 'text-purple-400',
      hover: 'hover:border-purple-400'
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/20">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Create Something
            <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to start your next project? I'd love to hear about your ideas and discuss how we can bring them to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Talk About Your Project
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Whether you need a stunning website, a comprehensive digital marketing strategy, 
                or both, I'm here to help transform your vision into reality.
              </p>
              {/* Availability Info */}
              <div className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-green-400 font-semibold">{contactInfo.availability}</p>
                  <p className="text-slate-400 text-sm">Response time: {contactInfo.responseTime}</p>
                </div>
              </div>
            </div>
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                const colors = colorMap[method.color];
                return (
                  <div
                    key={method.label}
                    className={`group transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <a
                      href={method.href}
                      className={`flex items-center space-x-4 p-6 bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} ${colors.hover} rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                    >
                      <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} className={colors.icon} />
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-medium">{method.label}</p>
                        <p className="text-white font-semibold">{method.value}</p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
            {/* Additional Info */}
            <div className="mt-8 p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock size={20} className="text-yellow-400" />
                <h4 className="text-white font-semibold">Working Hours</h4>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>Monday - Friday: 9:00 AM - 7:00 PM IST</p>
                <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                <p className="text-slate-400 text-sm">Available for urgent projects anytime</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                    <p className="text-slate-400">Fill out the form below and I'll get back to you soon.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    {/* Project Type */}
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                      >
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Subject */}
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                        placeholder="Brief description of your project"
                      />
                    </div>
                    {/* Message */}
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="Tell me more about your project, timeline, and requirements..."
                      />
                    </div>
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                    >
                      <Send size={20} className="group-hover:-rotate-12 transition-transform duration-300" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </>
              ) : (
                // Success State
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-slate-300 mb-6">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full animate-pulse w-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
