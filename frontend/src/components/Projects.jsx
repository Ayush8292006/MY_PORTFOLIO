import React, { useEffect, useRef, useState } from "react";
import CravelyImg from "../assets/cravely.jpg";
import MovieMindImg from "../assets/MovieMind.jpg";
import CinebookImg from "../assets/cinebook.avif";
import AssistantImg from "../assets/Assistant.webp";
import TaskFlowImg from "../assets/task.jpeg";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [tilts, setTilts] = useState({});
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const projects = [
    {
      id: 1,
      number: "01",
      tag: "Full-Stack · Web",
      title: "Cravely — Food Delivery Platform",
      short:
        "Multi-role food delivery system with real-time tracking, payments, and four separate dashboards for customers, restaurants, delivery partners and admin.",
      image: CravelyImg,
      live: "https://cravely-food-delivery-website.vercel.app/",
      github: "https://github.com/Ayush8292006/cravely-food-delivery",
      badge: "LIVE WEB APP",
      metrics: [
        { value: "4 Roles", label: "User Dashboards" },
        { value: "Real-time", label: "Order Tracking" },
        { value: "100%", label: "Online Payments" },
      ],
      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "Socket.io",
        "Razorpay",
        "Firebase",
        "Cloudinary",
        "Geoapify",
      ],
      challenge:
        "Handling concurrent order updates and live location tracking across multiple clients without race conditions — solved using Socket.io rooms and optimistic UI updates.",
    },
    {
      id: 2,
      number: "02",
      tag: "AI · Full-Stack",
      title: "MovieMind — GraphRAG Movie Engine",
      short:
        "AI-powered movie recommendation system that combines Neo4j graph relationships with Pinecone vector search and Gemini for natural language answers.",
      image: MovieMindImg,
      live: "https://moviemind-xi.vercel.app/",
      github: "https://github.com/Ayush8292006/MovieMind---GraphRAG",
      badge: "LIVE WEB APP",
      metrics: [
        { value: "1K+", label: "Movies Indexed" },
        { value: "Graph + Vector", label: "Hybrid Search" },
        { value: "Voice", label: "Input / Output" },
      ],
      tech: ["React", "Node.js", "Neo4j", "Pinecone", "Gemini AI", "Web Speech API"],
      challenge:
        "Merging graph traversal results with vector similarity scores into a single ranked list while keeping response latency under control on free-tier APIs.",
    },
    {
      id: 3,
      number: "03",
      tag: "Full-Stack · Web",
      title: "CineBook — Ticket Booking Platform",
      short:
        "Scalable movie ticket booking with real-time seat selection, concurrent booking protection, Stripe payments and Clerk authentication.",
      image: CinebookImg,
      live: "https://cinebook-omega.vercel.app/",
      github: "https://github.com/Ayush8292006/CineBook-TicketBooking",
      badge: "LIVE WEB APP",
      metrics: [
        { value: "Real-time", label: "Seat Locking" },
        { value: "Stripe", label: "Payments" },
        { value: "Clerk", label: "Auth" },
      ],
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Clerk", "TMDB API"],
      challenge:
        "Preventing double-booking under high concurrency by implementing temporary seat locks with automatic release on timeout.",
    },
    {
      id: 4,
      number: "04",
      tag: "AI · Full-Stack",
      title: "AI Virtual Assistant",
      short:
        "Voice + text AI assistant powered by Gemini with persistent chat history, JWT authentication and speech recognition.",
      image: AssistantImg,
      live: "https://virtual-chatbot-sandy.vercel.app",
      github: "https://github.com/Ayush8292006/Virtual-Chatbot",
      badge: "LIVE WEB APP",
      metrics: [
        { value: "Voice", label: "I/O Support" },
        { value: "Gemini", label: "LLM Backend" },
        { value: "JWT", label: "Secure Sessions" },
      ],
      tech: ["React", "Node.js", "MongoDB", "Gemini API", "Web Speech API"],
      challenge:
        "Maintaining conversational context across voice and text turns while keeping the free Gemini quota usable for longer sessions.",
    },
    {
      id: 5,
      number: "05",
      tag: "Frontend · Productivity",
      title: "ProjectFlow — Task Management",
      short:
        "Kanban + Timeline task manager with drag-and-drop, virtual scrolling, Zustand state and dark/light mode.",
      image: TaskFlowImg,
      live: "https://kanban-timeline-website.vercel.app/",
      github: "https://github.com/Ayush8292006/kanban-timeline-website",
      badge: "LIVE WEB APP",
      metrics: [
        { value: "500+", label: "Tasks Supported" },
        { value: "Drag & Drop", label: "Kanban" },
        { value: "Timeline", label: "View" },
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
      challenge:
        "Keeping the UI smooth while rendering hundreds of tasks using virtual scrolling and optimized re-renders.",
    },
  ];

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

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              if (prev.includes(index)) return prev;
              return [...prev, index];
            });
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      obs.observe(card);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const handleMouseMove = (e, id) => {
    const card = cardRefs.current.find(
      (el) => el && el.dataset.id === String(id)
    );
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilts((prev) => ({
      ...prev,
      [id]: { x: rotateX, y: rotateY },
    }));
  };

  const handleMouseLeave = (id) => {
    setTilts((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 },
    }));
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-24 bg-black relative overflow-hidden"
    >
      {/* Soft ambient amber glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#f59e0b]/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-[#f59e0b]/5 rounded-full blur-[140px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111] border border-[#f59e0b]/30 mb-4">
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#f59e0b] tracking-[0.22em] uppercase">
              [ CASE STUDIES ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Projects That <span className="text-[#f59e0b]">Shipped</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-2xl leading-relaxed">
            Production-ready full-stack and AI systems. Hover any card for 3D
            tilt • Click to explore architecture, metrics & live demos.
          </p>
        </div>

        {/* Project Cards with 3D Tilt */}
        <div className="space-y-8" style={{ perspective: "1400px" }}>
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            const isCardVisible = visibleCards.includes(index);
            const tilt = tilts[project.id] || { x: 0, y: 0 };
            const isTilting = tilt.x !== 0 || tilt.y !== 0;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                  if (el) el.dataset.id = String(project.id);
                }}
                className={`transition-all duration-700 ease-out ${
                  isCardVisible
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-16 opacity-0 blur-sm"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                      isTilting ? 1.015 : 1
                    })`,
                    transition:
                      tilt.x === 0 && tilt.y === 0
                        ? "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)"
                        : "transform 0.08s ease-out",
                    transformStyle: "preserve-3d",
                  }}
                  className="relative will-change-transform"
                >
                  {/* Soft gradient border that reacts to tilt */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl transition-all duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(${
                        135 + tilt.y * 2.5
                      }deg, rgba(245,158,11,${isTilting ? 0.45 : 0.18}), rgba(245,158,11,0.04), rgba(245,158,11,${
                        isTilting ? 0.35 : 0.12
                      }))`,
                      boxShadow: isTilting
                        ? "0 25px 50px -12px rgba(245, 158, 11, 0.25)"
                        : "0 0 0 transparent",
                      opacity: isTilting || isExpanded ? 1 : 0.7,
                    }}
                  />

                  <div
                    className={`relative rounded-2xl border overflow-hidden transition-all duration-500 group
                      ${
                        isExpanded
                          ? "border-[#f59e0b]/50 bg-gradient-to-br from-[#141414] to-[#0a0a0a] shadow-[0_0_40px_-10px_rgba(245,158,11,0.18)]"
                          : "border-[#2a2a2a] bg-gradient-to-br from-[#141414] to-[#0a0a0a] hover:border-[#f59e0b]/35"
                      }`}
                  >
                    {/* Light inner gradient wash */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, rgba(245,158,11,${
                          isTilting ? 0.07 : 0.03
                        }), transparent 55%, rgba(245,158,11,${
                          isTilting ? 0.05 : 0.02
                        }))`,
                        opacity: isTilting || isExpanded ? 1 : 0.6,
                      }}
                    />

                    {/* Top accent line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b]/50 to-transparent transition-opacity duration-500 ${
                        isExpanded || isTilting
                          ? "opacity-100"
                          : "opacity-40 group-hover:opacity-70"
                      }`}
                    />

                    {/* Collapsed Header */}
                    <div
                      className="relative z-10 p-5 sm:p-6 cursor-pointer select-none"
                      onClick={() => toggleExpand(project.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className="text-[#f59e0b] text-xs font-mono font-semibold tracking-wider bg-[#f59e0b]/10 px-2 py-0.5 rounded">
                              {project.number}
                            </span>
                            <span className="text-neutral-700">·</span>
                            <span className="text-neutral-500 text-xs tracking-wide">
                              {project.tag}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-[#fbbf24] transition-colors duration-300">
                            {project.title}
                          </h3>

                          <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 max-w-2xl group-hover:text-neutral-300 transition-colors duration-300">
                            {project.short}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0 self-start">
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f59e0b]/35 bg-[#f59e0b]/5 text-[#f59e0b] text-[10px] font-medium tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                            {project.badge}
                          </span>

                          <button className="flex items-center gap-1.5 text-neutral-500 text-xs font-medium hover:text-[#f59e0b] transition-colors duration-300 group-hover:text-[#f59e0b]/80">
                            {isExpanded ? "COLLAPSE" : "EXPLORE"}
                            <span
                              className={`inline-block transition-transform duration-400 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            >
                              ↓
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <div
                      className={`relative z-10 grid transition-all duration-500 ease-in-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-6 border-t border-[#2a2a2a]">
                          <div className="grid lg:grid-cols-2 gap-6 pt-6">
                            {/* Left - Image */}
                            <div className="relative rounded-xl overflow-hidden border border-[#2a2a2a] bg-black aspect-video group/img">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover/img:scale-105"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23141414' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23555' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3E%3C/t%3E%3C/svg%3E";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] text-white/80 font-medium">
                                  Live
                                </span>
                              </div>
                            </div>

                            {/* Right - Details */}
                            <div className="space-y-5 flex flex-col">
                              {/* Metrics */}
                              <div>
                                <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider mb-2.5">
                                  // Engineering Metrics
                                </p>
                                <div className="grid grid-cols-3 gap-2.5">
                                  {project.metrics.map((m, i) => (
                                    <div
                                      key={i}
                                      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 text-center hover:border-[#f59e0b]/30 transition-colors duration-300"
                                    >
                                      <p className="text-[#f59e0b] font-bold text-sm sm:text-base">
                                        {m.value}
                                      </p>
                                      <p className="text-neutral-500 text-[10px] mt-0.5 leading-tight">
                                        {m.label}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Tech Stack */}
                              <div>
                                <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider mb-2.5">
                                  // Tech Stack
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.tech.map((t) => (
                                    <span
                                      key={t}
                                      className="px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[11px] text-neutral-400 hover:border-[#f59e0b]/40 hover:text-[#f59e0b] transition-all duration-300"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Challenge */}
                              <div className="flex-1">
                                <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider mb-2.5">
                                  // Engineering Challenge
                                </p>
                                <div className="relative pl-3.5 border-l-2 border-[#f59e0b]/50 bg-[#1a1a1a]/30 rounded-r-lg p-3">
                                  <p className="text-neutral-400 text-sm leading-relaxed">
                                    {project.challenge}
                                  </p>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-wrap gap-3 pt-1">
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f59e0b] text-black text-sm font-semibold hover:bg-[#fbbf24] hover:shadow-lg hover:shadow-[#f59e0b]/20 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                  <span>🌐</span>
                                  LIVE DEMO
                                </a>
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2a2a2a] text-neutral-400 text-sm font-medium hover:border-[#f59e0b]/50 hover:text-[#f59e0b] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                  GitHub →
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className={`mt-10 pt-16 border-t border-[#2a2a2a] transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#f59e0b]/30" />
              <span className="text-[#f59e0b] text-xl">✦</span>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#f59e0b]/30" />
            </div>

            <div className="mb-8">
              <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide">
                Each project reflects my passion for building{" "}
                <br className="hidden sm:block" />
                <span className="text-[#f59e0b] font-medium">
                  impactful solutions
                </span>
              </p>
              <p className="text-neutral-500 text-sm mt-3 font-light tracking-wider">
                From concept to deployment — every line of code tells a story
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
    </section>
  );
};

export default Projects;