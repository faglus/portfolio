import React, { useState, useEffect, useRef } from 'react';
import { Code, Megaphone, Target, ArrowRight, Check } from 'lucide-react';
import { services } from './mock';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          services.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const iconMap = {
    code: Code,
    megaphone: Megaphone,
    target: Target
  };

  const colorMap = {
    blue: {
      bg: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
      hover: 'hover:border-blue-400',
      glow: 'hover:shadow-blue-500/25'
    },
    green: {
      bg: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30',
      icon: 'text-green-400',
      hover: 'hover:border-green-400',
      glow: 'hover:shadow-green-500/25'
    },
    purple: {
      bg: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30',
      icon: 'text-purple-400',
      hover: 'hover:border-purple-400',
      glow: 'hover:shadow-purple-500/25'
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-green-500/10 text-green-400 text-sm font-semibold rounded-full border border-green-500/20">
              Services
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What I
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions that combine technical expertise with strategic marketing insights
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            const colors = colorMap[service.color];
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredCard === index;

            return (
              <div
                key={service.id}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* 3D Card Container */}
                <div
                  className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} ${colors.hover} rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-2xl ${colors.glow} hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Animated Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Service Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={32} className={colors.icon} />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-slate-300 mb-6 leading-relaxed">{service.description}</p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`flex items-center space-x-3 transition-all duration-300 ${
                            isHovered ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-1'
                          }`}
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <Check size={12} className={colors.icon} />
                          </div>
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Link */}
                    <div className="flex items-center space-x-2 text-slate-400 group-hover:text-white transition-colors duration-300">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight
                        size={16}
                        className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-white/10 to-white/0 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6 text-lg">Ready to bring your vision to life?</p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
          >
            <span>Start Your Project</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
