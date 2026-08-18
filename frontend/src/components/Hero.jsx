import React, { useState, useEffect, useRef, useCallback } from "react";
import AyushImage from "../assets/Ayush.png";

const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

// ==================== PARTICLES 3D COMPONENT ====================
const Particles3D = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationRef = useRef(null);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = (Math.random() - 0.5) * 2000;
      this.y = (Math.random() - 0.5) * 2000;
      this.z = Math.random() * 800 + 100;
      this.size = Math.random() * 5 + 2;
      this.baseX = this.x;
      this.baseY = this.y;

      const roll = Math.random();
      if (roll < 0.8) {
        this.type = "orange";
        this.opacity = 0.8 + Math.random() * 0.2;
      } else {
        this.type = "white";
        this.opacity = 0.7 + Math.random() * 0.3;
      }

      this.floatSpeed = 0.0002 + Math.random() * 0.0004;
      this.floatOffset = Math.random() * Math.PI * 2;
      this.floatAmplitude = 0.4 + Math.random() * 0.6;
      this.depthFactor = 0.015 + Math.random() * 0.03;
      this.pulseSpeed = 0.01 + Math.random() * 0.02;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.baseSize = this.size;
    }

    update(mx, my, time) {
      const depthInfluence = 0.3 + (this.z / 1000) * 0.7;
      this.x = this.baseX - mx * this.depthFactor * depthInfluence * 1.5;
      this.y = this.baseY - my * this.depthFactor * depthInfluence * 1.5;

      this.x += Math.sin(time * this.floatSpeed + this.floatOffset) * this.floatAmplitude;
      this.y += Math.cos(time * this.floatSpeed * 0.6 + this.floatOffset * 0.7) * this.floatAmplitude;
      
      this.z += Math.sin(time * this.floatSpeed * 0.2 + this.floatOffset) * 0.5;
      this.z = Math.max(50, Math.min(900, this.z));
      this.size = this.baseSize * (0.8 + 0.2 * Math.sin(time * this.pulseSpeed + this.pulseOffset));
    }

    draw(ctx, w, h) {
      const perspective = 900;
      const scale = perspective / (perspective + this.z);
      const x2d = this.x * scale + w / 2;
      const y2d = this.y * scale + h / 2;
      const size = this.size * scale;
      const depthOpacity = this.opacity * (0.7 + 0.3 * (1 - this.z / 1000));

      ctx.save();
      ctx.translate(x2d, y2d);

      if (this.type === "orange") {
        const glowSize = size * 5;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
        gradient.addColorStop(0, `rgba(255, 200, 50, ${depthOpacity * 0.95})`);
        gradient.addColorStop(0.2, `rgba(245, 158, 11, ${depthOpacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(217, 119, 6, ${depthOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(217, 119, 6, 0)`);

        ctx.fillStyle = gradient;
        ctx.shadowColor = `rgba(245, 158, 11, ${depthOpacity * 0.8})`;
        ctx.shadowBlur = size * 8;
        ctx.beginPath();
        ctx.arc(0, 0, glowSize * 0.8, 0, Math.PI * 2);
        ctx.fill();

        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${depthOpacity * 0.95})`);
        coreGradient.addColorStop(0.3, `rgba(251, 191, 36, ${depthOpacity * 0.9})`);
        coreGradient.addColorStop(1, `rgba(245, 158, 11, ${depthOpacity * 0.5})`);
        ctx.fillStyle = coreGradient;
        ctx.shadowBlur = size * 3;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const glowSize = size * 4.5;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${depthOpacity * 0.9})`);
        gradient.addColorStop(0.3, `rgba(240, 245, 255, ${depthOpacity * 0.6})`);
        gradient.addColorStop(0.6, `rgba(220, 225, 240, ${depthOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(200, 210, 230, 0)`);

        ctx.fillStyle = gradient;
        ctx.shadowColor = `rgba(255, 255, 255, ${depthOpacity * 0.4})`;
        ctx.shadowBlur = size * 7;
        ctx.beginPath();
        ctx.arc(0, 0, glowSize * 0.8, 0, Math.PI * 2);
        ctx.fill();

        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${depthOpacity * 0.95})`);
        coreGradient.addColorStop(0.4, `rgba(240, 245, 255, ${depthOpacity * 0.7})`);
        coreGradient.addColorStop(1, `rgba(220, 225, 240, ${depthOpacity * 0.3})`);
        ctx.fillStyle = coreGradient;
        ctx.shadowBlur = size * 3;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      return { x: x2d, y: y2d, z: this.z };
    }
  }

  const drawConnections = (ctx, particles) => {
    const connectionDistance = 200;
    const maxConnections = 3;
    
    for (let i = 0; i < particles.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.5;
          const depthFactor = 1 - (particles[i].z + particles[j].z) / 1800;
          
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * depthFactor * 0.8})`;
          ctx.lineWidth = 0.8 + (1 - distance / connectionDistance) * 2;
          ctx.shadowColor = `rgba(245, 158, 11, ${opacity * depthFactor * 0.3})`;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.restore();
          connections++;
        }
      }
    }
  };

  const initParticles = useCallback(() => {
    const count = window.innerWidth < 768 ? 150 : 250;
    return Array.from({ length: count }, () => new Particle());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);
    particlesRef.current = initParticles();

    const onMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2);
    };

    window.addEventListener("mousemove", onMouseMove);

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const particlePositions = [];
      particlesRef.current.forEach((p) => {
        p.update(mouseRef.current.x, mouseRef.current.y, time);
        const pos = p.draw(ctx, width, height);
        if (pos) particlePositions.push(pos);
      });

      if (particlePositions.length > 0 && window.innerWidth > 768) {
        drawConnections(ctx, particlePositions);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: 0, 
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'transparent'
      }}
    />
  );
};

// ==================== HERO COMPONENT ====================
const Hero = () => {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const roles = [
    "Software Developer",
    "Full Stack Developer",
    "GenAI Enthusiast",
    "MERN Stack Developer",
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const currentText = roles[currentRole];
    let timeout;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setTypedText(currentText.substring(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 90);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentText.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 45);
      } else {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole]);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ayush_Kumar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadPopup(true);
    setTimeout(() => setShowDownloadPopup(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("aksrivastav0825@gmail.com");
    setShowCopyPopup(true);
    setTimeout(() => setShowCopyPopup(false), 2000);
  };

  const techStack = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "LangChain",
    "Python",
  ];

  const stats = [
    { value: "250+", label: "DSA Problems Solved" },
    { value: "12+", label: "Projects Completed" },
    { value: "3+", label: "GenAI Projects Built" },
    { value: "3rd", label: "Year CSE (AI) Student" },
  ];

  return (
    <>
      {/* Particles3D Background */}
      <Particles3D />

      <section
        id="home"
        className="min-h-screen relative overflow-hidden bg-black flex items-center"
        style={{ zIndex: 1, position: 'relative' }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-center">
                  {/* ========== LEFT CONTENT ========== */}
            <div
              className={`space-y-4 sm:space-y-5 transition-all duration-1000 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {/* 🟢 Badge - Mobile par margin-top add kiya */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm md:mt-0 mt-12">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                  Available for Opportunities
                </span>
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.1] tracking-tight">
                  Hi, I&apos;m
                  <br />
                  <span className="bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#d97706] bg-clip-text text-transparent">
                    Ayush Kumar
                  </span>
                </h1>
              </div>

              {/* Moving typewriter role */}
              <div className="flex items-center gap-2 min-h-[2rem]">
                <span className="text-lg sm:text-xl font-medium text-neutral-300">
                  {typedText}
                </span>
                <span className="inline-block w-[3px] h-6 sm:h-7 bg-[#f59e0b] animate-pulse rounded-full" />
              </div>

              {/* Description */}
              <p className="text-sm sm:text-[15px] text-neutral-400 leading-relaxed max-w-lg">
                I build scalable web applications and intelligent AI solutions
                using{" "}
                <span className="text-[#f59e0b]">React</span>,{" "}
                <span className="text-[#f59e0b]">Node.js</span>,{" "}
                <span className="text-[#f59e0b]">MongoDB</span> and Generative AI
                technologies like{" "}
                <span className="text-[#f59e0b]">LangChain</span>,{" "}
                <span className="text-[#f59e0b]">RAG</span>, and{" "}
                <span className="text-[#f59e0b]">LLMs</span>.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-semibold text-sm hover:shadow-xl hover:shadow-[#f59e0b]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  View My Projects
                  <span className="group-hover:translate-x-1 transition-transform">
                    <Icons.ArrowRight />
                  </span>
                </a>
                <button
                  onClick={downloadResume}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-black/30 text-neutral-300 font-medium text-sm hover:border-[#f59e0b]/40 hover:text-white hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
                >
                  <Icons.Download />
                  Download Resume
                </button>
              </div>

              {/* Tech stack */}
              <div className="pt-2">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 mb-2.5">
                  I Work With
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-[11px] text-neutral-400 hover:border-[#f59e0b]/40 hover:text-[#f59e0b] transition-all duration-300 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-black/30 border border-white/10 rounded-xl p-3 hover:border-[#f59e0b]/30 hover:bg-white/[0.05] transition-all duration-300 group backdrop-blur-sm"
                  >
                    <p className="text-xl font-bold text-[#f59e0b] group-hover:scale-105 transition-transform origin-left">
                      {s.value}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                  Connect with me
                </span>
                <div className="w-8 h-px bg-white/10" />
                <div className="flex gap-2">
                  <a
                    href="https://github.com/Ayush8292006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-black/30 border border-white/10 text-neutral-500 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all duration-300 hover:-translate-y-0.5"
                    aria-label="GitHub"
                  >
                    <Icons.Github />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ayush-kumar-35499a32b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-black/30 border border-white/10 text-neutral-500 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all duration-300 hover:-translate-y-0.5"
                    aria-label="LinkedIn"
                  >
                    <Icons.Linkedin />
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-black/30 border border-white/10 text-neutral-500 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all duration-300 hover:-translate-y-0.5"
                    aria-label="Copy Email"
                  >
                    <Icons.Mail />
                  </button>
                </div>
              </div>
            </div>

            {/* ========== RIGHT — IMAGE SHIFTED FURTHER RIGHT ========== */}
            <div
              className={`relative flex justify-end transition-all duration-1000 delay-150 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] ml-auto lg:mr-[-20px] xl:mr-[-40px]">
                {/* Soft ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[125%] bg-[#f59e0b]/12 rounded-full blur-[90px] pointer-events-none" />

                {/* Image */}
                <div className="relative">
                  <img
                    src={AyushImage}
                    alt="Ayush Kumar — Software Developer"
                    className={`w-full h-[700px] lg:h-[680px] object-contain transition-all duration-700 ${
                      imageLoaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                    }`}
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 5%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 5%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
                      maskComposite: "intersect",
                      WebkitMaskComposite: "source-in",
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='700'%3E%3Crect fill='%23000000' width='560' height='700'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='%23f59e0b' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E";
                      setImageLoaded(true);
                    }}
                  />

                  {/* Soft edge overlays */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/25" />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black" />
                </div>

                {/* Open to Work badge */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-2 whitespace-nowrap hover:border-[#f59e0b]/40 transition-all duration-300">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] text-neutral-300 font-medium tracking-wide">
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
            <div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5">
              <div className="w-1 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
            </div>
            <span className="text-[8px] tracking-[0.25em] uppercase text-neutral-600">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      {/* Popups */}
      {showDownloadPopup && (
        <div className="fixed bottom-8 right-6 z-50 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-xl px-4 py-3 shadow-2xl">
          <p className="text-emerald-400 text-sm font-medium">Resume downloaded</p>
        </div>
      )}
      {showCopyPopup && (
        <div className="fixed bottom-8 right-6 z-50 bg-[#f59e0b]/15 backdrop-blur-xl border border-[#f59e0b]/30 rounded-xl px-4 py-3 shadow-2xl">
          <p className="text-[#f59e0b] text-sm font-medium">Email copied!</p>
        </div>
      )}
    </>
  );
};

export default Hero;