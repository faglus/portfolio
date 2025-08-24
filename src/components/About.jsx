
import React, { useState, useEffect, useRef } from 'react';
import { Code, Megaphone, TrendingUp, Users, Award, Coffee } from 'lucide-react';
import { personalInfo, skills } from './mock';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === aboutRef.current && entry.isIntersecting) {
          setIsVisible(true);
        }
        if (entry.target === skillsRef.current && entry.isIntersecting) {
          setSkillsVisible(true);
        }
      });
    }, observerOptions);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+', color: 'blue' },
    { icon: Users, label: 'Happy Clients', value: '25+', color: 'green' },
    { icon: TrendingUp, label: 'Growth Achieved', value: '200%', color: 'purple' },
    { icon: Coffee, label: 'Coffee Consumed', value: '∞', color: 'yellow' }
  ];

  const SkillBar = ({ skill, delay }) => {
    return (
      <div 
        className={`mb-6 transition-all duration-1000 ${
          skillsVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-10'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-300 font-medium">{skill.name}</span>
          <span className="text-blue-400 text-sm font-semibold">{skill.level}%</span>
        </div>
        <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1500 ease-out"
            style={{ 
              width: skillsVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${delay + 200}ms`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    );
  };

  return (
    <section id="about" className="py-20 bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div ref={aboutRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/20">
                About Me
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Crafting Digital 
              <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              I'm a passionate full-stack developer and digital marketing specialist who loves creating 
              innovative solutions that drive real business results.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Code size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Full-Stack Development</p>
                  <p className="text-slate-400 text-sm">End-to-end solutions</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Megaphone size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Digital Marketing</p>
                  <p className="text-slate-400 text-sm">Growth-focused strategies</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                By the Numbers
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div 
                      key={stat.label}
                      className="text-center group transition-all duration-500"
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="w-16 h-16 mx-auto mb-3 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} className="text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div ref={skillsRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Skills & Expertise
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A comprehensive skill set spanning modern web technologies and digital marketing strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillCategory, categoryIndex) => (
              <div 
                key={skillCategory.category}
                className={`bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-1 ${
                  skillsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <h4 className="text-white font-semibold mb-6 text-center">
                  {skillCategory.category}
                </h4>
                
                {skillCategory.items.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skill.name} 
                    skill={skill} 
                    delay={categoryIndex * 200 + skillIndex * 100}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


