import React, { useState, useEffect, useRef } from 'react';

export default function BuildYourDreamTeam() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'mission', 'initiative', 'team'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const teamMembers = [
    {
      role: "Creative Lead & Artist",
      person: "Me",
      superpowers: ["creativity", "emotional intelligence", "intuition", "strong sense for energy"],
      why: "responsible for vision, music, embodiment, and creative execution"
    },
    {
      role: "AI and Tech Lead",
      person: "Life partner",
      superpowers: ["Machine Learning", "Data", "AI automation", "Business consultation", "critical thinking and decision making"],
      why: "takes care of the Technical aspects builds and maintains the website and supports online distribution and advanced technical and business implementation"
    },
    {
      role: "Music Production & Female Producer Network",
      person: "External producer (Munich) & Female Producer Collective",
      superpowers: ["music production", "sound design", "technical expertise", "mentorship", "professional network"],
      why: "ensures high-quality music production and access to a female-led creative ecosystem"
    },
    {
      role: "Creative & Podcast Sparring Partner",
      person: "Emilia",
      superpowers: ["podcast experience", "communication", "yoga background"],
      why: "mutual inspiration, direct exchange"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background-color: #cfc3b5;
          color: #292524;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }

        .glow-effect {
          position: relative;
        }

        .glow-effect::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #d4c4ad, #e3dcd3, #b9a489, #dfd4c3);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
          filter: blur(20px);
        }

        .glow-effect:hover::before {
          opacity: 0.6;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .shimmer-effect {
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(212, 196, 173, 0.3),
                       0 0 40px rgba(212, 196, 173, 0.2);
        }

        .perspective-card {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .perspective-card:hover {
          transform: rotateY(5deg) rotateX(5deg) translateZ(20px);
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        .nav-link-active {
          position: relative;
        }

        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #78716c, transparent);
          animation: shimmer 2s infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        [data-animate] {
          opacity: 0;
        }

        [data-animate].visible {
          opacity: 1;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-stone-200/50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 rounded-sm px-2 py-1 hover:scale-105"
            >
              My Personal Board
            </button>
            
            <div className="flex items-center gap-6">
              {[
                { id: 'mission', label: 'Mission' },
                { id: 'initiative', label: 'Initiative' },
                { id: 'team', label: 'Team' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 rounded-sm px-3 py-2 hover:scale-105 ${
                    activeSection === item.id
                      ? 'text-stone-900 font-medium nav-link-active'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated background with floating orbs */}
        <div className="absolute inset-0 gradient-animate bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/30 -z-10" />
        
        {/* Floating ambient orbs */}
        <div 
          className="floating-orb w-96 h-96 bg-amber-200/20 top-20 -left-48"
          style={{ 
            animationDelay: '0s',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="floating-orb w-80 h-80 bg-stone-300/20 bottom-32 -right-40"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="floating-orb w-64 h-64 bg-amber-100/30 top-1/2 right-1/4"
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        <div 
          className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 600
          }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-stone-900 tracking-tight leading-tight animate-fadeInUp text-glow">
              My Personal Board
            </h1>
            
            {/* Motto with individual word effects */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-fadeInUp delay-200">
              <span className="group relative inline-flex items-center px-6 py-3 rounded-full text-lg font-medium bg-gradient-to-r from-amber-100 to-amber-50 text-stone-800 border-2 border-amber-200/70 hover:scale-110 hover:shadow-xl transition-all duration-500 cursor-default">
                <span className="relative z-10">Wellness</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/50 to-amber-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </span>
              
              <span className="text-2xl text-stone-400 animate-pulse">•</span>
              
              <span className="group relative inline-flex items-center px-6 py-3 rounded-full text-lg font-medium bg-gradient-to-r from-stone-100 to-stone-50 text-stone-800 border-2 border-stone-300/70 hover:scale-110 hover:shadow-xl transition-all duration-500 cursor-default">
                <span className="relative z-10">Music</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-stone-200/50 to-stone-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </span>
              
              <span className="text-2xl text-stone-400 animate-pulse" style={{ animationDelay: '0.5s' }}>•</span>
              
              <span className="group relative inline-flex items-center px-6 py-3 rounded-full text-lg font-medium bg-gradient-to-r from-amber-50 to-stone-100 text-stone-800 border-2 border-amber-300/50 hover:scale-110 hover:shadow-xl transition-all duration-500 cursor-default">
                <span className="relative z-10">Embodiment</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-100/50 to-stone-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </span>
            </div>

            <p className="text-xl sm:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-300 pt-4">
              A conscious approach to music, wellness, and collaboration
            </p>

            <div className="pt-8 max-w-md mx-auto space-y-2 animate-fadeInUp delay-400">
              {[
                'Create with integrity',
                'Collaborate consciously',
                'Build something lasting'
              ].map((intention, index) => (
                <p 
                  key={index} 
                  className="text-stone-600 text-sm italic hover:text-stone-800 transition-colors duration-300"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  {intention}
                </p>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fadeInUp delay-600">
              <button
                onClick={() => scrollToSection('mission')}
                className="group relative px-8 py-3 bg-stone-800 text-stone-50 rounded-full font-medium hover:bg-stone-900 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-stone-700 focus:ring-offset-2 shadow-lg hover:shadow-2xl overflow-hidden hover:scale-105"
              >
                <span className="relative z-10">Explore the vision</span>
                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className="group px-8 py-3 bg-transparent text-stone-700 rounded-full font-medium border-2 border-stone-300 hover:border-stone-400 hover:bg-stone-100 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 hover:scale-105 hover:shadow-lg"
              >
                Meet the dream team
              </button>
            </div>
            
            <div className="pt-16 animate-fadeInUp delay-600">
              <button
                onClick={() => scrollToSection('mission')}
                className="inline-flex flex-col items-center gap-2 text-stone-400 hover:text-stone-600 transition-all duration-300 focus:outline-none group hover:scale-110"
              >
                <span className="text-xs uppercase tracking-wider">Scroll</span>
                <svg 
                  className="w-5 h-5 animate-bounce" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div 
              className="mb-8"
              data-animate
              id="mission-label"
            >
              <span className={`inline-block text-sm uppercase tracking-wider text-stone-500 font-medium ${isVisible['mission-label'] ? 'animate-fadeInUp' : ''}`}>
                Mission Statement
              </span>
            </div>
            
            <div 
              className={`glow-effect bg-stone-50 rounded-2xl p-8 sm:p-10 lg:p-12 border border-stone-200/80 shadow-lg hover:shadow-2xl transition-all duration-700 ${isVisible['mission-card'] ? 'animate-fadeInScale' : ''}`}
              data-animate
              id="mission-card"
            >
              <p className="text-lg sm:text-xl leading-relaxed text-stone-700 max-w-2xl">
                My mission is to create music and embodied wellness experiences that help people reconnect with their inner wisdom, self-worth, and presence.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-300 to-stone-400 my-6 rounded-full" />
              <p className="text-lg sm:text-xl leading-relaxed text-stone-700 max-w-2xl">
                Through meditation, voice, and conscious community, I aim to support lasting wellbeing that integrates into everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Initiative Section */}
      <section id="initiative" className="py-16 sm:py-20 lg:py-24 bg-stone-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-200/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div 
              className="mb-8"
              data-animate
              id="initiative-label"
            >
              <span className={`inline-block text-sm uppercase tracking-wider text-stone-500 font-medium ${isVisible['initiative-label'] ? 'animate-fadeInUp' : ''}`}>
                My Initiative
              </span>
            </div>
            
            <div className="space-y-8">
              <div 
                className={`glow-effect bg-white rounded-2xl p-8 sm:p-10 border border-stone-200/80 shadow-lg hover:shadow-2xl transition-all duration-700 ${isVisible['initiative-overview'] ? 'animate-fadeInScale' : ''}`}
                data-animate
                id="initiative-overview"
              >
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-6 text-glow">
                  Building a Wellness & Music Program
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-stone-300 mb-6 rounded-full" />
                <p className="text-lg leading-relaxed text-stone-700">
                  My initiative is the first step toward building a long-term Wellness & Music program. The focus is on writing, producing, and releasing meditation and energy songs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className={`glow-effect bg-white rounded-2xl p-8 border border-stone-200/80 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 ${isVisible['initiative-role'] ? 'animate-fadeInUp delay-200' : ''}`}
                  data-animate
                  id="initiative-role"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <h3 className="font-serif text-xl text-stone-900">
                      My Role
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-stone-700">
                    I lead the creative direction, songwriting, and vocals. I collaborate with producers and female-led music networks to ensure high-quality production and sustainable growth.
                  </p>
                </div>

                <div 
                  className={`glow-effect bg-white rounded-2xl p-8 border border-stone-200/80 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 ${isVisible['initiative-community'] ? 'animate-fadeInUp delay-400' : ''}`}
                  data-animate
                  id="initiative-community"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <h3 className="font-serif text-xl text-stone-900">
                      Community Vision
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-stone-700">
                    In parallel, I aim to build a female-based friendship and creative community, locally and internationally, with the long-term vision of sharing this music in conscious spaces such as singing circles and embodied gatherings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Ambient background orbs */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-stone-200/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div 
              className={`mb-12 text-center ${isVisible['team-header'] ? 'animate-fadeInUp' : ''}`}
              data-animate
              id="team-header"
            >
              <span className="inline-block text-sm uppercase tracking-wider text-stone-500 font-medium mb-4">
                My Dream Team
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 max-w-3xl mx-auto text-glow">
                The people who bring this vision to life
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`group perspective-card glow-effect bg-stone-50 rounded-2xl p-8 border border-stone-200/80 shadow-lg hover:shadow-2xl transition-all duration-700 focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2 ${isVisible[`team-${index}`] ? 'animate-fadeInScale' : ''}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                  data-animate
                  id={`team-${index}`}
                  tabIndex={0}
                  role="article"
                  aria-label={`${member.role} - ${member.person}`}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/0 via-transparent to-stone-100/0 group-hover:from-amber-100/20 group-hover:to-stone-100/20 rounded-2xl transition-all duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* Role with animated underline */}
                    <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mb-3 leading-tight group-hover:text-stone-950 transition-colors duration-300">
                      {member.role}
                    </h3>
                    <div className="w-0 h-0.5 bg-gradient-to-r from-amber-400 to-stone-400 group-hover:w-16 transition-all duration-500 mb-3 rounded-full" />

                    {/* Person */}
                    <p className="text-sm uppercase tracking-wider text-stone-500 font-medium mb-5 group-hover:text-stone-600 transition-colors duration-300">
                      {member.person}
                    </p>

                    {/* Superpowers */}
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider text-stone-400 mb-3 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Superpowers
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.superpowers.map((power, powerIndex) => (
                          <span
                            key={powerIndex}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100/60 text-stone-700 border border-amber-200/70 hover:bg-amber-100 hover:scale-110 transition-all duration-300 cursor-default shadow-sm"
                            style={{ animationDelay: `${powerIndex * 0.1}s` }}
                          >
                            {power}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Divider with gradient */}
                    <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mb-6 group-hover:via-amber-300 transition-colors duration-500" />

                    {/* Why */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                        Why
                      </p>
                      <p className="text-base leading-relaxed text-stone-700 group-hover:text-stone-800 transition-colors duration-300">
                        {member.why}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-stone-200/80 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-100/30 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div 
            className={`max-w-4xl mx-auto text-center space-y-6 ${isVisible['footer'] ? 'animate-fadeInUp' : ''}`}
            data-animate
            id="footer"
          >
            <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
              This is an invitation to create something meaningful together—rooted in purpose, built with intention.
            </p>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 rounded-full px-4 py-2 hover:bg-stone-100 hover:scale-105"
              >
                <svg 
                  className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                <span>Back to top</span>
              </button>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent max-w-xs mx-auto" />

            <p className="text-xs text-stone-400">
              © {new Date().getFullYear()} My Personal Board
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
