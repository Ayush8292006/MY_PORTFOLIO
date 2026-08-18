import React, { useEffect, useRef, useState } from "react";
import image from "../assets/ayush1.png";

// ==================== ICONS ====================
const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Terminal: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  ),
};

// ==================== MAIN COMPONENT ====================
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");
  const [typedOutput, setTypedOutput] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const terminalData = {
    skills: {
      title: "skills.json",
      content: `{
  "languages": ["C++", "JavaScript", "TypeScript", "Python", "Java"],
  "frontend": ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  "backend": ["Node.js", "Express.js", "WebSockets", "Socket.io"],
  "databases": ["MongoDB", "MySQL", "PostgreSQL"],
  "ai_tools": ["LangChain", "RAG", "Gemini", "Pinecone", "Neo4j"],
  "tools": ["Git", "Docker", "AWS", "Firebase", "Razorpay"]
}`,
    },
    projects: {
      title: "projects.md",
      content: `## Featured Projects

1. Cravely — Food Delivery Platform
2. MovieMind — GraphRAG Movie Engine
3. CineBook — Ticket Booking
4. AI Virtual Assistant
5. ProjectFlow — Task Management`,
    },
    about: {
      title: "about_me.sh",
      content: `#!/bin/bash
# About Ayush Kumar

NAME="Ayush Kumar"
ROLE="Software Developer & Full Stack Developer"
EDUCATION="B.Tech CSE (AI) • 3rd Year"
LOCATION="Greater Noida, Uttar Pradesh, India"
SKILLS="React • Node.js • TypeScript • MongoDB • LangChain"
ACHIEVEMENTS="250+ DSA Problems • 12+ Projects • 3 AI Projects"
OPEN_TO_WORK="true"

echo "Building scalable web applications with modern technologies."
echo "Passionate about Full Stack Development & Generative AI."`,
    },
  };

  useEffect(() => {
    const content = terminalData[activeTab].content;
    let index = 0;
    setTypedOutput("");
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      if (index < content.length) {
        setTypedOutput(content.substring(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [activeTab]);

  const socialLinks = [
    { icon: <Icons.Github />, url: "https://github.com/Ayush8292006", label: "GitHub" },
    { icon: <Icons.Linkedin />, url: "https://linkedin.com/in/ayush-kumar-35499a32b", label: "LinkedIn" },
  ];



  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-24 bg-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#f59e0b]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f59e0b]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#111] border border-[#f59e0b]/30 mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[11px] font-mono text-[#f59e0b] tracking-widest uppercase">~/about</span>
            <Icons.Terminal className="text-[#f59e0b]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            <span className="text-[#f59e0b] font-mono">#</span> About Me
          </h2>
          <p className="mt-3 text-neutral-500 text-sm max-w-xl">
            Software Developer • Full Stack Engineer • Generative AI Enthusiast
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14">
          
          {/* LEFT COLUMN */}
          <div
            className={`space-y-5 transition-all duration-1000 delay-150 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
          >
            {/* Software Developer */}
            <div className="group relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl p-5 border border-[#2a2a2a] hover:border-[#f59e0b]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#f59e0b]/10">
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-[#f59e0b] to-[#d97706] rounded-full" />
              <div className="flex items-center gap-2.5 mb-3 pl-3">
                <span className="text-lg">💻</span>
                <h3 className="text-white font-semibold text-[15px]">Software Developer</h3>
              </div>
              <p className="text-neutral-400 text-[13px] leading-relaxed pl-3">
                Passionate <span className="text-white font-medium">Software Developer</span> specializing in
                scalable web applications, REST APIs, and end-to-end solutions.
                Solved <span className="text-[#f59e0b] font-semibold">250+ DSA problems</span> on LeetCode with
                strong command over <span className="text-white">C++</span>,{" "}
                <span className="text-white">JavaScript</span> & <span className="text-white">TypeScript</span>.
              </p>
            </div>

            {/* Full Stack */}
            <div className="group relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl p-5 border border-[#2a2a2a] hover:border-[#f59e0b]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#f59e0b]/10">
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-[#f59e0b] to-[#d97706] rounded-full" />
              <div className="flex items-center gap-2.5 mb-3 pl-3">
                <span className="text-lg">⚡</span>
                <h3 className="text-white font-semibold text-[15px]">Full Stack Development</h3>
              </div>
              <p className="text-neutral-400 text-[13px] leading-relaxed pl-3">
                Built production-ready full-stack applications using the{" "}
                <span className="text-white font-medium">MERN</span> stack and{" "}
                <span className="text-white font-medium">MySQL</span>. Experienced with{" "}
                <span className="text-white">JWT authentication</span>, REST APIs,{" "}
                <span className="text-white">WebSockets</span> and real-time systems.
              </p>
              <div className="flex flex-wrap gap-2 mt-3.5 pl-3">
                {["React", "Node.js", "Express", "MongoDB", "MySQL", "WebSockets"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-[#1a1a1a] text-[11px] text-[#f59e0b] border border-[#333] hover:border-[#f59e0b]/50 transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Generative AI */}
            <div className="group relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl p-5 border border-[#2a2a2a] hover:border-[#f59e0b]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#f59e0b]/10">
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-[#f59e0b] to-[#d97706] rounded-full" />
              <div className="flex items-center gap-2.5 mb-3 pl-3">
                <span className="text-lg">🤖</span>
                <h3 className="text-white font-semibold text-[15px]">Generative AI & LLMs</h3>
              </div>
              <p className="text-neutral-400 text-[13px] leading-relaxed pl-3">
                Building intelligent applications with{" "}
                <span className="text-white font-medium">LangChain</span>,{" "}
                <span className="text-white">RAG</span>,{" "}
                <span className="text-white">Google Gemini</span>,{" "}
                <span className="text-white">Pinecone</span> &{" "}
                <span className="text-white">Neo4j</span>. Delivered{" "}
                <span className="text-[#f59e0b] font-semibold">3 AI projects</span> including a GraphRAG
                movie engine and a voice-enabled AI assistant.
              </p>
              <div className="flex flex-wrap gap-2 mt-3.5 pl-3">
                {["LangChain", "RAG", "Gemini", "Neo4j", "Pinecone"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-[#1a1a1a] text-[11px] text-[#f59e0b] border border-[#333] hover:border-[#f59e0b]/50 transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* DSA */}
            <div className="group relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl p-5 border border-[#2a2a2a] hover:border-[#f59e0b]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#f59e0b]/10">
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-[#f59e0b] to-[#d97706] rounded-full" />
              <div className="flex items-center gap-2.5 mb-3 pl-3">
                <span className="text-lg">🧩</span>
                <h3 className="text-white font-semibold text-[15px]">Data Structures & Algorithms</h3>
              </div>
              <p className="text-neutral-400 text-[13px] leading-relaxed pl-3">
                Solved <span className="text-[#f59e0b] font-semibold">250+ problems</span> on LeetCode using{" "}
                <span className="text-white">C++</span>. Solid foundation in arrays, linked lists, trees,
                graphs, dynamic programming and system design fundamentals.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Software Developer", "Full Stack", "Generative AI", "DSA", "MERN", "LangChain"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-[#141414] text-neutral-400 text-[11px] border border-[#2a2a2a] hover:border-[#f59e0b]/50 hover:text-[#f59e0b] hover:bg-[#1a1a1a] transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Looking for roles */}
            <div className="mt-2 bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a] text-center">
              <p className="text-neutral-400 text-sm font-mono">
                <span className="text-[#f59e0b]"></span> Looking for{" "}
                <span className="text-white font-semibold">Software Developer</span> roles
                <span className="inline-block w-1.5 h-3.5 bg-[#f59e0b] animate-pulse ml-1.5 align-middle" />
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
          >
            {/* Profile Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f59e0b]/20 via-[#f59e0b]/5 to-[#f59e0b]/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 group-hover:scale-105" />

              <div className="relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-3xl border border-[#2a2a2a] p-8 text-center overflow-hidden shadow-2xl hover:shadow-[#f59e0b]/10 transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
                  <span className="text-8xl font-black tracking-tighter text-white">AYUSH</span>
                </div>

                <div className="relative z-10">
                  {/* Profile Image */}
                  <div className="relative mx-auto w-36 h-36 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f59e0b] via-[#fbbf24] to-[#d97706] p-[3px] animate-[spin_8s_linear_infinite]">
                      <div className="w-full h-full rounded-full bg-black" />
                    </div>

                    <div className="absolute inset-[6px] rounded-full overflow-hidden border-4 border-black shadow-2xl shadow-[#f59e0b]/20">
                      <img
                        src={image}
                        alt="Ayush Kumar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f59e0b' width='200' height='200'/%3E%3Ctext x='50%25' y='54%25' font-size='80' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-black">
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white">Ayush Kumar</h3>
                  <p className="text-[#f59e0b] font-mono text-sm mt-1.5">Software Developer</p>
                  <p className="text-neutral-500 text-xs mt-1">Full Stack • Generative AI</p>

                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333]">
                      <Icons.MapPin className="text-[#f59e0b]" />
                      <span className="text-xs text-neutral-400">Greater Noida</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-xs text-emerald-400 font-medium">Open to Work</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 mt-6">
                    {socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-neutral-500 hover:text-[#f59e0b] hover:border-[#f59e0b]/50 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#f59e0b]/10 transition-all duration-300"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-2xl hover:shadow-[#f59e0b]/5 transition-all duration-500">
              <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-[#2a2a2a]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#eab308]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
                </div>
                <span className="text-[10px] font-mono text-neutral-600 ml-2">bash — guest@ayush-dev:~</span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 mb-4">
                  <span className="text-[#f59e0b]">$</span>
                  <span className="text-neutral-400">ls</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { key: "about", label: "about_me.sh" },
                    { key: "skills", label: "skills.json" },
                    { key: "projects", label: "projects.md" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
                        activeTab === tab.key
                          ? "bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 shadow-lg shadow-[#f59e0b]/10"
                          : "text-neutral-500 hover:text-[#f59e0b] border border-transparent hover:border-[#f59e0b]/30 hover:bg-[#1a1a1a]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="bg-black/60 rounded-xl p-4 border border-[#2a2a2a] min-h-[210px]">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 mb-3">
                    <span className="text-[#f59e0b]">$</span>
                    <span className="text-neutral-400">cat {terminalData[activeTab].title}</span>
                  </div>
                  <pre className="text-neutral-400 text-[12px] font-mono leading-relaxed whitespace-pre-wrap">
                    {typedOutput}
                    {!isTypingComplete && (
                      <span className="inline-block w-1.5 h-3.5 bg-[#f59e0b] animate-pulse ml-0.5 align-middle" />
                    )}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;