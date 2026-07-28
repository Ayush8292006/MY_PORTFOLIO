import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local images
import CravelyImg from '../assets/cravely.jpg';
import MovieMindImg from '../assets/MovieMind.jpg';
import CinebookImg from '../assets/cinebook.avif';
import AssistantImg from '../assets/Assistant.webp';
import TaskFlowImg from '../assets/task.jpeg';

const AllProjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const allProjects = [
    {
      id: 1,
      title: 'Cravely — Food Delivery Platform',
      icon: '🍕',
      image: CravelyImg,
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Razorpay', 'Firebase', 'Cloudinary', 'Geoapify'],
      description: [
        '🏪 4 User Roles — Customer, Restaurant Owner, Delivery Boy, Super Admin with separate dashboards',
        '📍 Real-time Order Tracking — Live location updates using Socket.io and React Leaflet maps',
        '💳 Payment Integration — Razorpay for online payments and Cash on Delivery option',
        '🔐 Authentication — Google OAuth (Firebase) and JWT-based secure authentication',
        '📧 Email Notifications — Order confirmation, delivery OTP, and status updates via Nodemailer',
        '🗺️ Location Services — Geoapify for auto city detection and address management',
        '📸 Image Storage — Cloudinary for shop and food item images',
        '🔄 Real-time Updates — Socket.io for instant order status changes and delivery assignments'
      ],
      live: 'https://cravely-food-delivery-website.vercel.app/',
      github: 'https://github.com/Ayush8292006/cravely-food-delivery',
      color: 'from-red-500 to-orange-500',
      glow: 'shadow-red-500/20',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'MovieMind – GraphRAG Movie Recommendation Engine',
      icon: '🎬',
      image: MovieMindImg,
      tech: ['React', 'Node.js', 'Neo4j', 'Pinecone', 'Gemini AI', 'Web Speech API'],
      description: [
        '🧠 GraphRAG Architecture — Combines graph traversal + vector similarity for hybrid search',
        '🗄️ Neo4j Graph Database — Stores 1,000+ movies with 10K+ relationships',
        '📐 Pinecone Vector Search — Semantic similarity for intelligent recommendations',
        '🤖 Google Gemini LLM — Natural language understanding and response generation',
        '🎤 Voice Input/Output — Speak queries and listen to answers',
        '📌 Currently using free Gemini API (3-4 queries/day). Will upgrade to paid for unlimited queries!'
      ],
      live: 'https://moviemind-xi.vercel.app/',
      github: 'https://github.com/Ayush8292006/MovieMind---GraphRAG',
      color: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/20',
      category: 'AI/ML'
    },
    {
      id: 3,
      title: 'CineBook — Movie Ticket Booking Platform',
      icon: '🎬',
      image: CinebookImg,
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Clerk', 'TMDB API'],
      description: [
        'Built a scalable full-stack movie booking platform with real-time seat selection supporting concurrent users.',
        'Designed secure authentication using Clerk (Google OAuth) with protected routes.',
        'Integrated Stripe payments with webhook verification and automated ticket generation.',
        'Implemented concurrency control to prevent double booking in high-traffic scenarios.'
      ],
      live: 'https://cinebook-omega.vercel.app/',
      github: 'https://github.com/Ayush8292006/CineBook-TicketBooking',
      color: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/20',
      category: 'Full Stack'
    },
    {
      id: 4,
      title: 'AI Virtual Assistant',
      icon: '🤖',
      image: AssistantImg,
      tech: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Web Speech API'],
      description: [
        'Developed a voice + text assistant using speech recognition and text-to-speech.',
        'Integrated Gemini API for contextual and intelligent responses.',
        'Implemented JWT authentication with persistent chat history in MongoDB.'
      ],
      live: 'https://virtual-chatbot-sandy.vercel.app',
      github: 'https://github.com/Ayush8292006/Virtual-Chatbot',
      color: 'from-green-500 to-emerald-500',
      glow: 'shadow-emerald-500/20',
      category: 'AI/ML'
    },
    {
      id: 5,
      title: 'ProjectFlow — Task Management App',
      icon: '📋',
      image: TaskFlowImg,
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
      description: [
        '📊 Kanban Board — Drag-and-drop task management with columns (To Do, In Progress, Done)',
        '📅 Timeline View — Visualize tasks on interactive timeline with date filters',
        '🎯 Drag & Drop — Smooth drag-and-drop functionality using Framer Motion',
        '💾 State Management — Zustand for global state with persistence',
        '⚡ Performance — Virtual scrolling for handling 500+ tasks efficiently',
        '🎨 Responsive Design — Fully responsive with dark/light mode support'
      ],
      live: 'https://kanban-timeline-website.vercel.app/',
      github: 'https://github.com/Ayush8292006/kanban-timeline-website',
      color: 'from-orange-500 to-yellow-500',
      glow: 'shadow-orange-500/20',
      category: 'Frontend'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Get unique categories
  const categories = [...new Set(allProjects.map(p => p.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === selectedCategory);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen py-20 bg-[#0a0e1a] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-40 right-40 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#4a7aaa]/20 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-4">
            <button
              onClick={() => navigate('/')}
              className="text-[#8aaac8] hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
            >
              ← Back to Home
            </button>
            <span className="text-xs text-[#4a7aaa] font-medium px-3 py-1 rounded-full bg-[#1a2236] border border-[#2a3a5a]">
              {allProjects.length} Projects
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            All <span className="bg-gradient-to-r from-[#4a7aaa] via-[#6aaadd] to-[#8aaac8] bg-clip-text text-transparent animate-gradient">Projects</span>
          </h2>
          <p className="text-[#8aaac8]/60 text-sm max-w-2xl mx-auto">
            Explore all my work across different domains
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-[#4a7aaa] text-white shadow-lg shadow-[#4a7aaa]/30'
                : 'bg-[#1a2236] text-[#8aaac8] hover:bg-[#2a3a5a] hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#4a7aaa] text-white shadow-lg shadow-[#4a7aaa]/30'
                  : 'bg-[#1a2236] text-[#8aaac8] hover:bg-[#2a3a5a] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-700 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative bg-gradient-to-br from-[#0d1424] to-[#0a0e1a] rounded-2xl overflow-hidden border border-[#1a2236] transition-all duration-500 hover:shadow-2xl hover:shadow-[#1a2236]/60 hover:border-[#4a7aaa]/50 hover:-translate-y-2 h-full">
                
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1a2236]/80 backdrop-blur-sm border border-[#2a3a5a]">
                    <span className="text-[8px] text-[#4a7aaa] font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 text-3xl bg-[#0a0e1a]/50 backdrop-blur-sm p-2 rounded-xl border border-[#1a2236]">
                    {project.icon}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base font-bold text-white group-hover:text-[#6aaadd] transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="p-4 pt-3 border-t border-[#1a2236]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full bg-[#1a2236] text-[8px] font-medium text-[#8aaac8] border border-[#1a2236]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 rounded-full bg-[#1a2236] text-[8px] font-medium text-[#4a7aaa] border border-[#1a2236]">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a7aaa]/0 via-[#4a7aaa]/5 to-[#4a7aaa]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8aaac8]/60 text-sm">No projects found in this category</p>
          </div>
        )}
      </div>

      {/* Modal - Same as Projects component */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e1a]/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative bg-gradient-to-br from-[#0d1424] to-[#0a0e1a] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#1a2236] shadow-2xl shadow-[#1a2236]/60 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-[#1a2236] border border-[#2a3a5a] text-[#8aaac8] hover:text-white hover:border-[#4a7aaa] transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#4a7aaa]/20 group"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9]">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-5xl bg-[#0a0e1a]/50 backdrop-blur-sm p-3 rounded-xl border border-[#1a2236]">
                  {selectedProject.icon}
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {selectedProject.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-5">
                {selectedProject.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full bg-[#1a2236] text-xs font-medium text-[#8aaac8] border border-[#1a2236]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                {selectedProject.description.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#1a2236]/30 border border-[#1a2236]/30">
                    <span className="text-[#4a7aaa] mt-0.5 text-lg">◆</span>
                    <p className="text-[#8aaac8]/80 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-5 border-t border-[#1a2236]">
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1a2a4a] to-[#2a4a7a] text-white font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-[#1a2a4a]/50 hover:-translate-y-1"
                >
                  <span className="text-lg">🚀</span>
                  Live Demo
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a2236] border border-[#2a3a5a] text-[#8aaac8] font-medium transition-all duration-300 hover:border-[#4a7aaa] hover:text-white hover:shadow-2xl hover:shadow-[#1a2236]/50 hover:-translate-y-1"
                >
                  <span className="text-lg">📁</span>
                  GitHub Repo
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AllProjects;