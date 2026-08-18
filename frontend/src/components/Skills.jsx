import React, { useEffect, useRef, useState } from "react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

  const skills = [
    // Languages
    { id: 1, name: "C++", category: "languages", icon: "C++", color: "#f59e0b", level: "DSA & System Design", projects: ["LeetCode 250+", "System Design"] },
    { id: 2, name: "JavaScript", category: "languages", icon: "JS", color: "#f59e0b", level: "ES6+ & Modern JS", projects: ["Cravely", "MovieMind", "CineBook", "AI Assistant", "ProjectFlow"] },
    { id: 3, name: "TypeScript", category: "languages", icon: "TS", color: "#f59e0b", level: "Type-safe JS", projects: ["ProjectFlow"] },
    { id: 4, name: "Python", category: "languages", icon: "Py", color: "#f59e0b", level: "Scripting & AI", projects: ["AI Scripts"] },
    { id: 5, name: "Java", category: "languages", icon: "Ja", color: "#f59e0b", level: "Core Java", projects: [] },

    // Frontend
    { id: 6, name: "React", category: "frontend", icon: "⚛", color: "#f59e0b", level: "Hooks & Ecosystem", projects: ["Cravely", "MovieMind", "CineBook", "AI Assistant", "ProjectFlow"] },
    { id: 7, name: "Next.js", category: "frontend", icon: "N", color: "#f59e0b", level: "App Router", projects: [] },
    { id: 8, name: "Tailwind CSS", category: "frontend", icon: "TW", color: "#f59e0b", level: "Utility-first CSS", projects: ["Cravely", "MovieMind", "CineBook", "ProjectFlow"] },
    { id: 9, name: "HTML5", category: "frontend", icon: "5", color: "#f59e0b", level: "Semantic Markup", projects: ["All Projects"] },
    { id: 10, name: "CSS3", category: "frontend", icon: "3", color: "#f59e0b", level: "Modern CSS", projects: ["All Projects"] },
    { id: 11, name: "Framer Motion", category: "frontend", icon: "FM", color: "#f59e0b", level: "Animations", projects: ["ProjectFlow"] },

    // Backend
    { id: 12, name: "Node.js", category: "backend", icon: "N", color: "#f59e0b", level: "Runtime & APIs", projects: ["Cravely", "MovieMind", "CineBook", "AI Assistant"] },
    { id: 13, name: "Express.js", category: "backend", icon: "Ex", color: "#f59e0b", level: "REST Framework", projects: ["Cravely", "MovieMind", "CineBook", "AI Assistant"] },
    { id: 14, name: "REST APIs", category: "backend", icon: "API", color: "#f59e0b", level: "API Design", projects: ["Cravely", "CineBook", "AI Assistant"] },
    { id: 15, name: "WebSockets", category: "backend", icon: "⚡", color: "#f59e0b", level: "Real-time", projects: ["Cravely"] },
    { id: 16, name: "Socket.io", category: "backend", icon: "IO", color: "#f59e0b", level: "Real-time Engine", projects: ["Cravely"] },
    { id: 17, name: "JWT", category: "backend", icon: "JWT", color: "#f59e0b", level: "Authentication", projects: ["Cravely", "AI Assistant"] },

    // Database
    { id: 18, name: "MongoDB", category: "database", icon: "DB", color: "#f59e0b", level: "NoSQL Database", projects: ["Cravely", "CineBook", "AI Assistant"] },
    { id: 19, name: "MySQL", category: "database", icon: "SQL", color: "#f59e0b", level: "Relational DB", projects: [] },
    { id: 20, name: "PostgreSQL", category: "database", icon: "PG", color: "#f59e0b", level: "Relational DB", projects: [] },
    { id: 21, name: "Neo4j", category: "database", icon: "N4j", color: "#f59e0b", level: "Graph Database", projects: ["MovieMind"] },
    { id: 22, name: "Pinecone", category: "database", icon: "Pi", color: "#f59e0b", level: "Vector Database", projects: ["MovieMind"] },

    // AI
    { id: 23, name: "LangChain", category: "ai", icon: "LC", color: "#f59e0b", level: "LLM Framework", projects: ["MovieMind"] },
    { id: 24, name: "RAG", category: "ai", icon: "RAG", color: "#f59e0b", level: "Retrieval Augmented", projects: ["MovieMind"] },
    { id: 25, name: "Gemini AI", category: "ai", icon: "G", color: "#f59e0b", level: "Google LLM", projects: ["MovieMind", "AI Assistant"] },
    { id: 26, name: "GraphRAG", category: "ai", icon: "GR", color: "#f59e0b", level: "Graph + Vector", projects: ["MovieMind"] },
    { id: 27, name: "Web Speech API", category: "ai", icon: "🎤", color: "#f59e0b", level: "Voice I/O", projects: ["MovieMind", "AI Assistant"] },

    // Tools
    { id: 28, name: "Git", category: "tools", icon: "Git", color: "#f59e0b", level: "Version Control", projects: ["All Projects"] },
    { id: 29, name: "GitHub", category: "tools", icon: "GH", color: "#f59e0b", level: "CI/CD & Open Source", projects: ["All Projects"] },
    { id: 30, name: "Firebase", category: "tools", icon: "🔥", color: "#f59e0b", level: "Auth & Hosting", projects: ["Cravely"] },
    { id: 31, name: "Razorpay", category: "tools", icon: "₹", color: "#f59e0b", level: "Payments", projects: ["Cravely"] },
    { id: 32, name: "Stripe", category: "tools", icon: "S", color: "#f59e0b", level: "Payments", projects: ["CineBook"] },
    { id: 33, name: "Docker", category: "tools", icon: "🐳", color: "#f59e0b", level: "Containers", projects: [] },
    { id: 34, name: "AWS", category: "tools", icon: "AWS", color: "#f59e0b", level: "Cloud", projects: [] },
    { id: 35, name: "Vercel", category: "tools", icon: "▲", color: "#f59e0b", level: "Deployment", projects: ["Cravely", "MovieMind", "CineBook"] },
  ];

  const categories = [
    { id: "all", label: "ALL", count: skills.length },
    { id: "languages", label: "LANGUAGES", count: skills.filter((s) => s.category === "languages").length },
    { id: "frontend", label: "FRONTEND", count: skills.filter((s) => s.category === "frontend").length },
    { id: "backend", label: "BACKEND", count: skills.filter((s) => s.category === "backend").length },
    { id: "database", label: "DATABASE", count: skills.filter((s) => s.category === "database").length },
    { id: "ai", label: "AI / ML", count: skills.filter((s) => s.category === "ai").length },
    { id: "tools", label: "TOOLS", count: skills.filter((s) => s.category === "tools").length },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const displaySkill = selectedSkill || hoveredSkill;

  const getRelatedSkillIds = (skill) => {
    if (!skill || !skill.projects.length) return [];
    return skills
      .filter(
        (s) =>
          s.id !== skill.id &&
          s.projects.some((p) => skill.projects.includes(p))
      )
      .map((s) => s.id);
  };

  const relatedSkillIds = displaySkill ? getRelatedSkillIds(displaySkill) : [];

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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-16 bg-black relative overflow-hidden"
    >
      {/* Soft ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#f59e0b]/8 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-56 h-56 bg-[#f59e0b]/6 rounded-full blur-[90px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header — compact */}
        <div
          className={`mb-7 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111] border border-[#f59e0b]/30 mb-3">
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#f59e0b] tracking-[0.2em] uppercase">
              ⚡ SKILL STACK
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
            Crafted with <span className="text-[#f59e0b]">Modern Tools</span>
          </h2>
          <p className="text-neutral-500 text-xs max-w-md">
            Every skill below maps to a real shipped project.
          </p>
        </div>

        {/* Category Tabs — tighter */}
        <div
          className={`mb-6 overflow-x-auto pb-1 transition-all duration-1000 delay-75 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#2a2a2a]">
            {categories.map((cat) => {
              const isCategoryActive =
                activeCategory === cat.id ||
                (displaySkill && displaySkill.category === cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedSkill(null);
                    setHoveredSkill(null);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all duration-300 whitespace-nowrap ${
                    isCategoryActive
                      ? "bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 shadow-md shadow-[#f59e0b]/10"
                      : "text-neutral-500 hover:text-white border border-transparent hover:bg-[#1a1a1a]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[8px] px-1.5 py-0.5 rounded ${
                      isCategoryActive
                        ? "bg-[#f59e0b]/30 text-[#f59e0b]"
                        : "bg-[#1a1a1a] text-neutral-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid — smaller cards */}
        <div
          className={`grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 transition-all duration-1000 delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.id === skill.id;
            const isHovered = hoveredSkill?.id === skill.id;
            const isRelated = relatedSkillIds.includes(skill.id);
            const isHighlighted = isSelected || isHovered || isRelated;

            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(isSelected ? null : skill)}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`relative group cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden
                  ${
                    isSelected
                      ? "border-[#f59e0b] bg-gradient-to-br from-[#f59e0b]/15 to-[#f59e0b]/5 shadow-lg shadow-[#f59e0b]/15 -translate-y-1 scale-[1.03]"
                      : isHovered
                      ? "border-[#f59e0b]/50 bg-gradient-to-br from-[#f59e0b]/10 to-transparent -translate-y-0.5 shadow-md shadow-[#f59e0b]/10"
                      : isRelated
                      ? "border-[#f59e0b]/25 bg-[#f59e0b]/5"
                      : "border-[#2a2a2a] bg-gradient-to-br from-[#141414] to-[#0a0a0a] hover:border-[#3a3a3a] hover:bg-[#161616]"
                  }`}
              >
                <div className="relative p-2.5 flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold mb-1.5 transition-all duration-300 ${
                      isHighlighted ? "scale-110" : ""
                    }`}
                    style={{
                      backgroundColor: isHighlighted
                        ? "rgba(245, 158, 11, 0.18)"
                        : "rgba(245, 158, 11, 0.06)",
                      color: isHighlighted ? "#f59e0b" : "#777",
                      border: isHighlighted
                        ? "1px solid rgba(245, 158, 11, 0.35)"
                        : "1px solid rgba(255,255,255,0.04)",
                      boxShadow: isHighlighted
                        ? "0 0 12px rgba(245, 158, 11, 0.15)"
                        : "none",
                    }}
                  >
                    {skill.icon}
                  </div>

                  <p
                    className={`text-[10px] font-medium truncate w-full leading-tight transition-colors duration-300 ${
                      isHighlighted
                        ? "text-white"
                        : "text-neutral-500 group-hover:text-neutral-300"
                    }`}
                  >
                    {skill.name}
                  </p>

                  {isSelected && (
                    <span className="absolute top-1 right-1 text-[6px] font-bold px-1 py-0.5 rounded bg-[#f59e0b] text-black animate-pulse">
                      ●
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom detail bar — compact */}
        <div
          className={`mt-6 transition-all duration-400 ${
            displaySkill
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          {displaySkill && (
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[#f59e0b]/35 bg-gradient-to-br from-[#141414] to-[#0a0a0a] shadow-xl shadow-[#f59e0b]/5">
              <div className="flex items-center gap-3 min-w-0 w-full">
                <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold bg-[#f59e0b]/12 border border-[#f59e0b]/25 text-[#f59e0b]">
                  {displaySkill.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white font-medium truncate">
                      {displaySkill.name}
                    </p>
                    <span className="text-[10px] text-[#f59e0b]/80 truncate hidden sm:inline">
                      · {displaySkill.level}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {displaySkill.projects.length > 0 ? (
                      displaySkill.projects.slice(0, 4).map((project, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#333] text-neutral-400"
                        >
                          {project}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] text-neutral-600">
                        No projects yet
                      </span>
                    )}
                    {displaySkill.projects.length > 4 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#333] text-neutral-500">
                        +{displaySkill.projects.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-lg border border-[#f59e0b]/45 text-[#f59e0b] text-[11px] font-medium hover:bg-[#f59e0b]/10 hover:border-[#f59e0b] transition-all duration-300 whitespace-nowrap w-full sm:w-auto text-center"
              >
                VIEW CASE STUDIES ↓
              </button>
            </div>
          )}
        </div>

        {!displaySkill && (
          <div className="mt-5 text-center">
            <p className="text-neutral-600 text-[10px] font-mono tracking-wider">
              Hover to preview · Click to lock
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;