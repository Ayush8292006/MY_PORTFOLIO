import React, { useState, useEffect } from 'react';
import AyushImage from '../assets/Ayush.png';

// Custom SVG Icons
const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 3L14 8L19 8L15 12L16.5 17L12 14.5L7.5 17L9 12L5 8L10 8L12 3Z"/>
      <path d="M19 21L20 19L22 19L20.5 17L21 15L19 16L17 15L17.5 17L16 19L18 19L19 21Z"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ArrowDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <polyline points="19 12 12 19 5 12"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  // ✅ Tech Icons
  React: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2C7.58 2 4 4.69 4 8c0 2.21 1.49 4.07 3.62 5.1C7.22 14.42 7 15.2 7 16c0 3.31 2.24 6 5 6s5-2.69 5-6c0-.8-.22-1.58-.62-2.9C18.51 12.07 20 10.21 20 8c0-3.31-3.58-6-8-6z"/>
      <ellipse cx="12" cy="8" rx="3" ry="2"/>
      <ellipse cx="12" cy="16" rx="3" ry="2"/>
      <line x1="9" y1="10" x2="15" y2="10"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  ),
  Node: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  Mongo: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2a8 8 0 0 0-8 8c0 3.1 1.8 5.8 4.5 7.2L10 18v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2l1.5-.8C18.2 15.8 20 13.1 20 10a8 8 0 0 0-8-8z"/>
      <path d="M12 2v20"/>
    </svg>
  )
};

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);

  // ✅ Updated Roles (Recruiter-friendly)
  const roles = [
    "Full Stack Developer",
    "Software Developer",
    "Generative AI Developer",
    "MERN Stack Developer"
    
  ];

  useEffect(() => {
    const currentText = roles[currentRole];
    let typingInterval;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        typingInterval = setTimeout(() => {
          setTypedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      }
    } else {
      if (charIndex > 0) {
        typingInterval = setTimeout(() => {
          setTypedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(typingInterval);
  }, [charIndex, isDeleting, currentRole, roles]);

  const downloadResume = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Ayush_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadPopup(true);
    setTimeout(() => setShowDownloadPopup(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('aksrivastav0825@gmail.com');
    setShowCopyPopup(true);
    setTimeout(() => setShowCopyPopup(false), 2000);
  };

  return (
    <section 
      id="home"
      className="min-h-screen relative overflow-hidden bg-[#0a0e1a] flex items-center"
    >
      {/* ✅ Floating Particles (Welcome page se inspired) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#4a7aaa]/15 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* ✅ Gradient Orbs (Softened) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Floating Elements */}
      <div className="absolute top-32 right-32 text-[#4a7aaa]/5 text-6xl animate-float-slow pointer-events-none font-light">✦</div>
      <div className="absolute bottom-40 left-24 text-[#6aaadd]/5 text-5xl animate-float-medium pointer-events-none font-light">◇</div>
      <div className="absolute top-1/3 right-20 text-[#8aaac8]/4 text-4xl animate-float-fast pointer-events-none font-light">○</div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* ===== LEFT - CONTENT ===== */}
          <div className="space-y-5 md:space-y-6 order-2 lg:order-1">
            
            {/* ✅ Badge - Updated */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1a2236]/50 border border-[#2a3a5a]/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#8aaac8] font-medium tracking-[0.15em] uppercase">Available for Internship</span>
            </div>

            {/* ✅ Heading - With Surname */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Hi, I'm
                <br />
                <span className="bg-gradient-to-r from-[#4a7aaa] via-[#6aaadd] to-[#8aaac8] bg-clip-text text-transparent">
                  Ayush Kumar
                </span>
              </h1>
            </div>

            {/* Animated Role */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#1a2236]/20 border border-[#2a3a5a]/10 backdrop-blur-sm w-fit">
              <span className="text-base sm:text-lg md:text-xl font-medium text-[#8aaac8]">
                {typedText}
                <span className="inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-[#4a7aaa] animate-pulse ml-0.5" />
              </span>
            </div>

            {/* ✅ Description - Updated with max-w-xl */}
            <div className="space-y-2 max-w-xl">
              <p className="text-sm sm:text-base text-[#8aaac8]/80 leading-relaxed">
                <span className="text-white font-medium">Full Stack &amp; Generative AI Developer</span> building scalable web applications with <span className="text-[#6aaadd] font-medium">React</span>, 
                <span className="text-[#6aaadd] font-medium"> Node.js</span>, 
                <span className="text-[#6aaadd] font-medium"> Express.js</span>, 
                <span className="text-[#6aaadd] font-medium"> MongoDB</span> &amp; 
                <span className="text-[#6aaadd] font-medium"> MySQL</span>.
              </p>
              <p className="text-sm sm:text-base text-[#8aaac8]/70 leading-relaxed">
                ⚡ 250+ DSA Problems Solved • LangChain • RAG • Clean &amp; Scalable Code
              </p>
            </div>

            {/* ✅ Tech Icons */}
            <div className="flex items-center gap-4 text-[#6a8aaa] text-sm">
              <span className="flex items-center gap-1.5"><Icons.React /> React</span>
              <span className="flex items-center gap-1.5"><Icons.Node /> Node</span>
              <span className="flex items-center gap-1.5"><Icons.Mongo /> Mongo</span>
              <span className="flex items-center gap-1.5"><Icons.AI /> AI</span>
            </div>

            {/* ✅ Statistics Cards */}
            <div className="flex flex-wrap gap-4 pt-1">
              <div className="bg-[#1a2236]/40 backdrop-blur-sm border border-[#2a3a5a]/20 rounded-xl px-4 py-2">
                <span className="text-lg font-bold text-white">250+</span>
                <span className="block text-[9px] text-[#6a8aaa] uppercase tracking-wider">DSA Problems</span>
              </div>
              <div className="bg-[#1a2236]/40 backdrop-blur-sm border border-[#2a3a5a]/20 rounded-xl px-4 py-2">
                <span className="text-lg font-bold text-white">4+</span>
                <span className="block text-[9px] text-[#6a8aaa] uppercase tracking-wider">Projects</span>
              </div>
              <div className="bg-[#1a2236]/40 backdrop-blur-sm border border-[#2a3a5a]/20 rounded-xl px-4 py-2">
                <span className="text-lg font-bold text-white">3rd</span>
                <span className="block text-[9px] text-[#6a8aaa] uppercase tracking-wider">Year CSE (AI)</span>
              </div>
            </div>

            {/* ✅ Buttons - Updated */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contact"
                className="group relative px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#1a2a4a] to-[#2a4a7a] text-white font-medium text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-[#1a2a4a]/40 hover:-translate-y-1 flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let's Connect
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    <Icons.ChevronRight />
                  </span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#2a4a7a] to-[#4a7aaa] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </a>

              <button
                onClick={downloadResume}
                className="group relative px-6 sm:px-8 py-3 rounded-xl bg-[#1a2236]/40 border border-[#2a3a5a]/20 text-[#8aaac8] font-medium text-sm transition-all duration-300 hover:border-[#4a7aaa]/40 hover:text-white hover:shadow-xl hover:shadow-[#1a2236]/20 hover:-translate-y-1 flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    <Icons.Download />
                  </span>
                  Download Resume
                </span>
                <span className="absolute inset-0 bg-[#2a3a5a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </button>

              {/* ✅ View Projects Button */}
              <a
                href="#projects"
                className="group relative px-6 sm:px-8 py-3 rounded-xl bg-[#1a2236]/30 border border-[#2a3a5a]/20 text-[#8aaac8] font-medium text-sm transition-all duration-300 hover:border-[#4a7aaa]/40 hover:text-white hover:shadow-xl hover:shadow-[#1a2236]/20 hover:-translate-y-1 flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects →
                </span>
                <span className="absolute inset-0 bg-[#2a3a5a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </a>
            </div>

            {/* Social Links - Updated with scale on hover */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-[9px] sm:text-[10px] text-[#6a8aaa] tracking-[0.2em] uppercase">Connect</span>
              <div className="w-8 sm:w-10 h-px bg-[#2a3a5a]/20" />
              <div className="flex gap-2 sm:gap-2.5">
                <a
                  href="https://github.com/Ayush8292006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-xl bg-[#1a2236]/30 border border-[#2a3a5a]/10 text-[#6a8aaa] hover:text-white hover:border-[#4a7aaa]/30 hover:shadow-lg hover:shadow-[#1a2236]/20 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Icons.Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/ayush-kumar-35499a32b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-xl bg-[#1a2236]/30 border border-[#2a3a5a]/10 text-[#6a8aaa] hover:text-white hover:border-[#4a7aaa]/30 hover:shadow-lg hover:shadow-[#1a2236]/20 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Icons.Linkedin />
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 sm:p-2.5 rounded-xl bg-[#1a2236]/30 border border-[#2a3a5a]/10 text-[#6a8aaa] hover:text-white hover:border-[#4a7aaa]/30 hover:shadow-lg hover:shadow-[#1a2236]/20 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  aria-label="Copy Email"
                >
                  <Icons.Mail />
                </button>
              </div>
            </div>
          </div>

          {/* ===== RIGHT - IMAGE ===== */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-sm">
              
              {/* ✅ Soft Light Glow - Reduced intensity */}
              <div className="absolute -inset-10 sm:-inset-12 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-[#4a7aaa]/15 to-[#6aaadd]/8 rounded-full blur-2xl animate-pulse delay-700" />
              <div className="absolute -inset-4 sm:-inset-5 bg-gradient-to-tr from-blue-400/8 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-1500" />
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1a2236]/20 border border-[#2a3a5a]/10 bg-[#0d1424]">
                <img 
                  src={AyushImage}
                  alt="Ayush Kumar - Full Stack & Generative AI Developer"
                  className={`w-full h-auto object-cover transition-all duration-1000 ${
                    imageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  style={{ 
                    borderRadius: '16px',
                    filter: 'brightness(0.98) contrast(1.02)'
                  }}
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0e1a]/20 via-transparent to-transparent rounded-2xl" />
                
                {/* Floating Icons */}
                <div className="absolute top-4 right-4 text-[#4a7aaa]/10 animate-float-slow">
                  <Icons.Code />
                </div>
                <div className="absolute bottom-4 left-4 text-[#6aaadd]/10 animate-float-medium delay-500">
                  <Icons.Zap />
                </div>
              </div>

              {/* ✅ Status Indicator - Updated */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-[#1a2236]/70 backdrop-blur-sm border border-[#2a3a5a]/20 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-xl shadow-[#1a2236]/20">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-white/80 font-medium tracking-wide">Open to Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Scroll Indicator - Updated */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 animate-bounce">
          <span className="text-[7px] sm:text-[8px] text-[#6a8aaa] tracking-[0.3em] uppercase">Scroll</span>
          <Icons.ArrowDown />
          <span className="text-[6px] sm:text-[7px] text-[#6a8aaa]/50 tracking-[0.2em] uppercase">Explore My Work</span>
        </div>
      </div>

      {/* Download Popup */}
      {showDownloadPopup && (
        <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-50 bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl animate-slideIn">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 rounded-lg bg-green-500/20">
              <Icons.Download />
            </div>
            <div>
              <p className="text-green-400 font-medium text-xs sm:text-sm">Resume Downloaded</p>
              <p className="text-[10px] sm:text-xs text-green-400/60">Check your downloads folder</p>
            </div>
          </div>
        </div>
      )}

      {/* Email Copy Popup */}
      {showCopyPopup && (
        <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-50 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl animate-slideIn">
          <p className="text-blue-300 text-sm font-medium">📧 Email copied to clipboard!</p>
        </div>
      )}
    </section>
  );
};

export default Hero;