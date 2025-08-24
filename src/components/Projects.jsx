import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, TrendingUp, Users, Zap, Star } from 'lucide-react';
import { projects } from './mock';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const filteredProjects = getFilteredProjects();
          filteredProjects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleProjects((prev) => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [filter]);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'social-media', label: 'Digital Marketing' }
  ];

  const getFilteredProjects = () =>
    filter === 'all' ? projects : projects.filter((project) => project.category === filter);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleProjects([]);
    setTimeout(() => {
      const filteredProjects =
        newFilter === 'all'
          ? projects
          : projects.filter((project) => project.category === newFilter);

      filteredProjects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects((prev) => [...prev, index]);
        }, index * 100);
      });
    }, 100);
  };

  const getMetricIcon = (metric) => {
    if (
      metric.includes('performance') ||
      metric.includes('conversion') ||
      metric.includes('speed')
    )
      return TrendingUp;
    if (
      metric.includes('users') ||
      metric.includes('students') ||
      metric.includes('followers')
    )
      return Users;
    return Zap;
  };

  return (
    <section id="projects" className="py-20 bg-slate-800 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 text-sm font-semibold rounded-full border border-purple-500/20">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A showcase of recent work spanning web development and digital marketing campaigns
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => handleFilterChange(filterOption.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === filterOption.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredProjects().map((project, index) => {
            const isVisible = visibleProjects.includes(index);
            const isFeatured = project.featured;

            return (
              <div
                key={project.id}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${isFeatured ? 'lg:col-span-2' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Project Card */}
                <div className="relative bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 cursor-pointer h-full">
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <Star size={14} />
                      <span>Featured</span>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-slate-600 to-slate-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                    {/* Overlay Links */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors duration-300"
                      >
                        <ExternalLink size={16} className="text-white" />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors duration-300"
                      >
                        <Github size={16} className="text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-slate-600/50 text-slate-300 text-xs font-medium rounded-full border border-slate-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Project Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-600/30">
                        {Object.entries(project.metrics).map(([key, value]) => {
                          const MetricIcon = getMetricIcon(key);
                          return (
                            <div key={key} className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <MetricIcon size={14} className="text-purple-400 mr-1" />
                                <span className="text-sm font-bold text-purple-400">{value}</span>
                              </div>
                              <div className="text-xs text-slate-400 capitalize">
                                {key.replace('_', ' ')}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6 text-lg">
            Interested in seeing more work or discussing a project?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <span>Let's Work Together</span>
              <ExternalLink size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </button>

            <a
              href="https://github.com/pranavkumar431"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-white hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <Github size={20} />
              <span>View GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
