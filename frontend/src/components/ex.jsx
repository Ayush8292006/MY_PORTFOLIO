import React, { useEffect, useRef, useState } from 'react';

// Custom SVG Icons
const Icons = {
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 3a3 3 0 0 1 6 0v12a3 3 0 0 1-6 0V3z"/>
      <path d="M12 3v18"/>
      <path d="M9 12h6"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 3L14 8L19 8L15 12L16.5 17L12 14.5L7.5 17L9 12L5 8L10 8L12 3Z"/>
      <path d="M19 21L20 19L22 19L20.5 17L21 15L19 16L17 15L17.5 17L16 19L18 19L19 21Z"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const counterRefs = useRef([]);

  // ✅ Stats - Software Developer Focus
  const stats = [
    { 
      icon: <Icons.Code />, 
      value: 250, 
      label: 'DSA Problems', 
      suffix: '+', 
      color: 'from-yellow-500 to-orange-500' 
    },
    { 
      icon: <Icons.Users />, 
      value: 12, 
      label: 'Projects Built', 
      suffix: '+', 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      icon: <Icons.Rocket />, 
      value: 5, 
      label: 'Tech Stacks', 
      suffix: '+', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      icon: <Icons.Sparkles />, 
      value: 3, 
      label: 'AI Projects', 
      suffix: '+', 
      color: 'from-green-500 to-emerald-500' 
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      counterRefs.current.forEach((counter, index) => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current += increment;
          if (step >= steps) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current) + (stats[index].suffix || '');
        }, duration / steps);
      });
    }
  }, [isVisible]);

  const socialLinks = [
    { icon: <Icons.Github />, url: 'https://github.com/Ayush8292006', label: 'GitHub' },
    { icon: <Icons.Linkedin />, url: 'https://linkedin.com/in/ayush-kumar-35499a32b', label: 'LinkedIn' },
    { icon: <Icons.Twitter />, url: 'https://twitter.com/ayush8292006', label: 'Twitter' },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 bg-[#0a0e1a] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-40 right-40 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1a2236] to-[#1a2a4a] border border-[#2a3a5a] mb-4 shadow-xl shadow-[#1a2236]/30">
            <span className="w-1.5 h-1.5 bg-[#4a7aaa] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-semibold text-[#4a7aaa] tracking-[0.2em] uppercase">
              About Me
            </span>
            <Icons.Sparkles className="w-3 h-3 text-[#4a7aaa] animate-pulse" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Software <span className="bg-gradient-to-r from-[#4a7aaa] via-[#6aaadd] to-[#8aaac8] bg-clip-text text-transparent">Developer</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#4a7aaa]"></div>
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#4a7aaa] shadow-lg shadow-[#4a7aaa]/50 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full bg-[#4a7aaa]/20 animate-ping"></div>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#4a7aaa]"></div>
          </div>
          <p className="text-[#8aaac8]/50 text-sm mt-4 max-w-2xl mx-auto font-light tracking-wide">
            Full Stack Developer • Generative AI • Problem Solver
          </p>
        </div>

        {/* Profile Card */}
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-br from-[#0d1424] via-[#0a0e1a] to-[#0d1424] rounded-3xl p-8 border border-[#1a2236]/50 hover:border-[#4a7aaa]/30 transition-all duration-700 shadow-2xl shadow-[#0a0e1a] hover:shadow-[#1a2a4a]/40 group ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            
            <div className="relative">
              {/* Header with Avatar */}
              <div className="flex items-start gap-6 flex-wrap">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1a2a4a] to-[#2a4a7a] flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-[#1a2a4a]/40 group-hover:shadow-[#4a7aaa]/40 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    A
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#4a7aaa] to-[#6aaadd] rounded-2xl opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500"></div>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-1.5 border-2 border-[#0a0e1a] shadow-lg shadow-green-500/30">
                    <span className="block w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                  </div>
                </div>
                
                <div className="flex-1 pt-1">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3 flex-wrap">
                    Ayush Kumar
                    <span className="text-[10px] font-medium text-[#6a8aaa] bg-[#1a2236] px-3 py-1 rounded-full border border-[#2a3a5a]">
                      🎓 3rd Year
                    </span>
                    <span className="text-[10px] font-medium text-[#4a7aaa] bg-[#1a2236] px-3 py-1 rounded-full border border-[#4a7aaa]/30">
                      <Icons.Zap className="w-3 h-3 inline mr-1" />
                      Active Learner
                    </span>
                  </h3>
                  <p className="text-[#4a7aaa] font-medium text-sm">B.Tech CSE (AI) • Software Developer</p>
                  <p className="text-[#8aaac8]/60 text-xs mt-0.5 tracking-wide">
                    React • Node.js • LangChain • RAG • Generative AI
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1a2236]/40 border border-[#1a2236]/20">
                      <Icons.MapPin className="text-[#4a7aaa] w-3 h-3" />
                      <span className="text-xs text-[#8aaac8]">Greater Noida, India</span>
                    </div>
                    <span className="w-0.5 h-4 bg-[#2a3a5a]"></span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-xs text-green-400 font-medium">Open to Work</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== CONTENT - Software Developer First ===== */}
              <div className="mt-6 pt-6 border-t border-[#1a2236]">
                <div className="text-[#8aaac8]/90 text-sm leading-relaxed space-y-4">
                  
                  {/* ✅ 1. SOFTWARE DEVELOPER - Main Highlight */}
                  <div className="bg-gradient-to-r from-[#1a2236]/40 to-[#1a2236]/10 p-5 rounded-xl border-l-4 border-[#4a7aaa] hover:border-l-[6px] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4a7aaa]/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#4a7aaa] text-lg">💻</span>
                      <span className="text-white font-semibold text-sm">Software Developer</span>
                    </div>
                    <p className="text-[#8aaac8] text-sm">
                      Passionate <span className="text-white font-semibold">Software Developer</span> with expertise in building 
                      scalable web applications, REST APIs, and end-to-end solutions. 
                      <span className="text-white font-semibold"> 250+ DSA problems</span> solved on LeetCode, 
                      with strong proficiency in <span className="text-white font-semibold">C++</span>, 
                      <span className="text-white font-semibold"> JavaScript</span>, and 
                      <span className="text-white font-semibold"> TypeScript</span>.
                    </p>
                  </div>

                  {/* ✅ 2. FULL STACK - Second Priority */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#1a2236]/20 to-transparent border-l-4 border-[#6aaadd] hover:border-l-[6px] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6aaadd]/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#6aaadd] text-lg">⚡</span>
                      <span className="text-white font-semibold text-sm">Full Stack Development</span>
                    </div>
                    <p>
                      Built <span className="text-white font-semibold"> full-stack projects</span> using 
                      <span className="text-white font-semibold"> MERN</span> stack (React, Node.js, Express, MongoDB) 
                      and <span className="text-white font-semibold"> MySQL</span>. 
                      Experienced in <span className="text-white font-semibold">JWT authentication</span>, 
                      <span className="text-white font-semibold"> REST APIs</span>, 
                      <span className="text-white font-semibold"> WebSockets</span>, and 
                      <span className="text-white font-semibold"> real-time applications</span>.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#6aaadd] border border-[#2a3a5a]">React</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#6aaadd] border border-[#2a3a5a]">Node.js</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#6aaadd] border border-[#2a3a5a]">Express</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#6aaadd] border border-[#2a3a5a]">MongoDB</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#6aaadd] border border-[#2a3a5a]">MySQL</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#6aaadd] border border-[#2a3a5a]">WebSockets</span>
                    </div>
                  </div>

                  {/* ✅ 3. GENERATIVE AI - Third Priority */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#1a2236]/30 to-[#1a2236]/5 border border-[#4a7aaa]/20 hover:border-[#4a7aaa]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4a7aaa]/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#8aaac8] text-lg">🤖</span>
                      <span className="text-white font-semibold text-sm">Generative AI & LLMs</span>
                    </div>
                    <p className="text-[#8aaac8]">
                      Building AI-powered applications with <span className="text-white font-semibold">LangChain</span>, 
                      <span className="text-white font-semibold"> RAG</span>, <span className="text-white font-semibold">Google Gemini</span>, 
                      <span className="text-white font-semibold"> Pinecone</span> and <span className="text-white font-semibold">Neo4j</span>. 
                      Created <span className="text-white font-semibold">3 AI projects</span> including a GraphRAG movie engine 
                      and voice-enabled AI assistant.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#8aaac8] border border-[#2a3a5a]">🔗 LangChain</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#8aaac8] border border-[#2a3a5a]">📄 RAG</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#8aaac8] border border-[#2a3a5a]">⚡ Gemini</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#8aaac8] border border-[#2a3a5a]">🧠 Neo4j</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1a2236] text-[10px] text-[#8aaac8] border border-[#2a3a5a]">📐 Pinecone</span>
                    </div>
                  </div>

                  {/* ✅ 4. DSA & Problem Solving */}
                  <div className="p-4 rounded-xl bg-gradient-to-l from-[#1a2236]/20 to-transparent border-r-4 border-[#8aaac8]/30 hover:border-r-[6px] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4a7aaa]/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#8aaac8] text-lg">🧩</span>
                      <span className="text-white font-semibold text-sm">Data Structures & Algorithms</span>
                    </div>
                    <p>
                      Solved <span className="text-white font-semibold">250+ problems</span> on LeetCode using 
                      <span className="text-white font-semibold"> C++</span>. Strong understanding of 
                      <span className="text-white font-semibold"> arrays</span>, 
                      <span className="text-white font-semibold"> linked lists</span>, 
                      <span className="text-white font-semibold"> trees</span>, 
                      <span className="text-white font-semibold"> graphs</span>, 
                      <span className="text-white font-semibold"> DP</span>, and 
                      <span className="text-white font-semibold"> system design</span>.
                    </p>
                  </div>

                  {/* ✅ Closing - Professional */}
                  <div className="text-[#6a8aaa] italic text-center py-3 px-6 bg-gradient-to-r from-[#1a2236]/20 to-[#1a2236]/20 rounded-full border border-[#1a2236]/30 hover:border-[#4a7aaa]/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4a7aaa]/20 transition-all duration-300">
                    <p className="text-sm">
                      <span className="text-[#8aaac8]">Looking for Software Developer roles where I can build impactful products and grow as an engineer.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ✅ Tags - Software Dev Focus */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#1a2236]">
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1a2236] to-[#1a2a4a] text-[#8aaac8] text-[10px] border border-[#2a3a5a] hover:border-[#4a7aaa] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#4a7aaa]/10 transition-all duration-300 cursor-default">
                  💻 Software Developer
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1a2236] to-[#1a2a4a] text-[#8aaac8] text-[10px] border border-[#2a3a5a] hover:border-[#4a7aaa] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#4a7aaa]/10 transition-all duration-300 cursor-default">
                  🚀 Full Stack
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1a2236] to-[#1a2a4a] text-[#8aaac8] text-[10px] border border-[#2a3a5a] hover:border-[#4a7aaa] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#4a7aaa]/10 transition-all duration-300 cursor-default">
                  🤖 Generative AI
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1a2236] to-[#1a2a4a] text-[#8aaac8] text-[10px] border border-[#2a3a5a] hover:border-[#4a7aaa] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#4a7aaa]/10 transition-all duration-300 cursor-default">
                  🧩 DSA
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1a2236] to-[#1a2a4a] text-[#8aaac8] text-[10px] border border-[#2a3a5a] hover:border-[#4a7aaa] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#4a7aaa]/10 transition-all duration-300 cursor-default">
                  📦 MERN
                </span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1a2236] to-[#1a2a4a] text-[#8aaac8] text-[10px] border border-[#2a3a5a] hover:border-[#4a7aaa] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#4a7aaa]/10 transition-all duration-300 cursor-default">
                  🔗 LangChain
                </span>
              </div>

          

  
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;