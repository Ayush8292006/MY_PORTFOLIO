import React, { useEffect, useRef, useState } from "react";

const Education = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [tilts, setTilts] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const educationData = [
    {
      id: 1,
      number: "01",
      year: "2024 — 2028",
      title: "B.Tech in Computer Science & Engineering (AI)",
      institution: "G.L. Bajaj Institute of Technology and Management",
      location: "Greater Noida, Uttar Pradesh",
      description:
        "Currently pursuing B.Tech with specialization in Artificial Intelligence. Building strong foundations in software engineering, data structures, algorithms, and AI systems.",
      tags: ["CSE (AI)", "Technical Member", "Ongoing"],
      icon: "🎓",
      gradient: "from-[#f59e0b]/20 to-transparent",
    },
    {
      id: 2,
      number: "02",
      year: "2023",
      title: "Intermediate (12th) — Science Stream",
      institution: "B.D College",
      location: "Patna, Bihar",
      description:
        "Completed Higher Secondary Education with Science stream under Bihar Board.",
      tags: ["81.2%", "Science", "Bihar Board"],
      icon: "📚",
      gradient: "from-[#f59e0b]/15 to-transparent",
    },
    {
      id: 3,
      number: "03",
      year: "2021",
      title: "Matriculation (10th)",
      institution: "S.R. Public School",
      location: "Patna, Bihar",
      description: "Completed Secondary Education.",
      tags: ["Secondary Education"],
      icon: "🏫",
      gradient: "from-[#f59e0b]/10 to-transparent",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e, id, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    setTilts((prev) => ({ ...prev, [id]: { x: rotateX, y: rotateY } }));
  };

  const handleMouseLeave = (id) => {
    setTilts((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    setHoveredId(null);
  };

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="min-h-screen py-24 bg-black relative overflow-hidden flex items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#f59e0b]/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#f59e0b]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111] border border-[#f59e0b]/30 mb-4">
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#f59e0b] tracking-[0.22em] uppercase">[ EDUCATION ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Academic <span className="text-[#f59e0b]">Journey</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-lg">
            A clear path from secondary education to pursuing B.Tech in Computer Science & AI.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {educationData.map((edu, index) => {
            const tilt = tilts[edu.id] || { x: 0, y: 0 };
            const isHovered = hoveredId === edu.id;

            return (
              <div
                key={edu.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, edu.id, index)}
                onMouseEnter={() => handleMouseEnter(edu.id)}
                onMouseLeave={() => handleMouseLeave(edu.id)}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div
                  style={{
                    transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                      tilt.x !== 0 || tilt.y !== 0 ? 1.03 : 1
                    })`,
                    transition:
                      tilt.x === 0 && tilt.y === 0
                        ? "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
                        : "transform 0.1s ease-out",
                  }}
                  className="relative h-full rounded-2xl overflow-hidden group will-change-transform"
                >
                  {/* Glow border */}
                  <div
                    className={`absolute -inset-[1px] rounded-2xl transition-all duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, rgba(245,158,11,0.5), rgba(245,158,11,0.05), rgba(245,158,11,0.3))`,
                      boxShadow: isHovered
                        ? "0 25px 50px -12px rgba(245, 158, 11, 0.25)"
                        : "none",
                    }}
                  />

                  <div className="relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 h-full shadow-2xl hover:shadow-[#f59e0b]/5 transition-shadow duration-500">
                    {/* Top decorative gradient */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${edu.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      {/* Top row: number + icon */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono text-neutral-600 group-hover:text-[#f59e0b] transition-colors duration-300">
                          {edu.number} / 03
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#f59e0b]/20 transition-all duration-300">
                          {edu.icon}
                        </div>
                      </div>

                      {/* Year badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/25 mb-4 group-hover:bg-[#f59e0b]/20 group-hover:border-[#f59e0b]/40 transition-all duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                        <span className="text-[11px] text-[#f59e0b] font-medium tracking-wide">
                          {edu.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#fbbf24] transition-colors duration-300">
                        {edu.title}
                      </h3>

                      {/* Institution */}
                      <p className="text-sm text-neutral-300 mb-1 font-medium group-hover:text-white transition-colors duration-300">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-neutral-500 mb-4 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-neutral-600" />
                        {edu.location}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-neutral-400 leading-relaxed mb-5 group-hover:text-neutral-300 transition-colors duration-300">
                        {edu.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {edu.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[11px] text-neutral-400 group-hover:border-[#f59e0b]/40 group-hover:text-[#f59e0b] group-hover:bg-[#f59e0b]/10 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Hover indicator line */}
                      <div
                        className={`mt-4 h-0.5 bg-gradient-to-r from-[#f59e0b] to-transparent transition-all duration-500 ${
                          isHovered ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;