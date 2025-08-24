import React from 'react';
import { Heart, Code, Megaphone, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { personalInfo } from './mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/pranavkumar431',
      label: 'GitHub',
      color: 'hover:text-slate-300'
    },
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      href: '#',
      label: 'Twitter',
      color: 'hover:text-sky-400'
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
      color: 'hover:text-green-400'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'Web Development', icon: Code },
    { name: 'Digital Marketing', icon: Megaphone }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {personalInfo.name}
              </h3>
              <p className="text-slate-400 text-lg mb-4">
                {personalInfo.title}
              </p>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Creating digital experiences that combine stunning design with strategic marketing 
                to help businesses grow and succeed online.
              </p>
            </div>

            {/* Services Icons */}
            <div className="flex items-center space-x-6 mb-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.name} className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-300">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors duration-300">
                      <IconComponent size={16} />
                    </div>
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 ${social.color} hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1`}
                    aria-label={social.label}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-slate-400 hover:text-white transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Email</p>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-white hover:text-blue-400 transition-colors duration-300 break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Phone</p>
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="text-white hover:text-green-400 transition-colors duration-300"
                >
                  {personalInfo.phone}
                </a>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Location</p>
                <p className="text-white">{personalInfo.location}</p>
              </div>
            </div>

            {/* Availability Status */}
            <div className="mt-6 flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Available for new projects</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>© {currentYear} {personalInfo.name}. Made with</span>
              <Heart size={14} className="text-red-400 animate-pulse" />
              <span>in India</span>
            </div>
            {/* Tech Stack */}
            <div className="flex items-center space-x-4 text-slate-400 text-sm">
              <span>Built with React & Tailwind CSS</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full flex items-center justify-center hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 z-40"
        aria-label="Scroll to top"
      >
        <Code size={20} className="transform rotate-180" />
      </button>
    </footer>
  );
};

export default Footer;
