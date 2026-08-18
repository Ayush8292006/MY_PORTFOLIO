import React, { useEffect, useRef, useState } from "react";

const DSA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeDomain, setActiveDomain] = useState("dp");
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const leetcode = {
    name: "Ayush Kumar",
    username: "ayush825",
    profileUrl: "https://leetcode.com/u/ayush825/",
    rank: "510,437",
    problemsSolved: 300,
    contestRating: 1417,
    topPercent: "74.87%",
    attended: 4,
    easy: { solved: 107, total: 960 },
    medium: { solved: 163, total: 2103 },
    hard: { solved: 23, total: 966 },
    badge: "50 Days Badge 2026",
    submissions: 441,
    activeDays: 100,
  };

  const domains = [
    { id: "dp", label: "DP", icon: "🧩", topics: "Knapsack · LIS · LCS · DP on Trees" },
    { id: "greedy", label: "Greedy", icon: "⚡", topics: "Interval · Huffman · Activity Selection" },
    { id: "graphs", label: "Graphs", icon: "🌐", topics: "BFS · DFS · Dijkstra · Union-Find" },
    { id: "ds", label: "Data Structures", icon: "📦", topics: "Trees · Heaps · Trie · Segment Tree" },
  ];

  const totalSolved = leetcode.easy.solved + leetcode.medium.solved + leetcode.hard.solved;
  const easyPercent = Math.round((leetcode.easy.solved / totalSolved) * 100);
  const mediumPercent = Math.round((leetcode.medium.solved / totalSolved) * 100);
  const hardPercent = Math.round((leetcode.hard.solved / totalSolved) * 100);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="dsa"
      ref={sectionRef}
      className="min-h-screen py-20 bg-black relative overflow-hidden flex items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#f59e0b]/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111] border border-[#f59e0b]/30 mb-4">
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#f59e0b] tracking-[0.22em] uppercase">[ DSA & ALGORITHMS ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            DSA & <span className="text-[#f59e0b]">Problem Solving</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-xl">
            Consistent problem-solving practice focused on data structures, algorithms, and contest performance.
          </p>
        </div>

        {/* Wide Card with 3D Tilt */}
        <div
          className={`transition-all duration-1000 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ perspective: "1200px" }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                tilt.x !== 0 || tilt.y !== 0 ? 1.02 : 1
              })`,
              transition:
                tilt.x === 0 && tilt.y === 0
                  ? "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
                  : "transform 0.1s ease-out",
              transformStyle: "preserve-3d",
            }}
            className="relative will-change-transform"
          >
            {/* Animated Glow */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-70 transition-all duration-300"
              style={{
                background: `linear-gradient(${135 + tilt.y * 3}deg, rgba(245,158,11,0.4), rgba(245,158,11,0.05), rgba(245,158,11,0.3))`,
                boxShadow:
                  tilt.x !== 0 || tilt.y !== 0
                    ? "0 30px 60px -15px rgba(245, 158, 11, 0.3)"
                    : "0 0 0 transparent",
              }}
            />

            <div className="relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl border border-[#2a2a2a] p-6 sm:p-8 overflow-hidden shadow-2xl hover:shadow-[#f59e0b]/5 transition-shadow duration-500">
              
              {/* Top Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-[#f59e0b]/30">
                    LC
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold text-xl">LeetCode</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[9px] text-[#f59e0b] font-semibold animate-pulse">
                        ACTIVE SOLVER
                      </span>
                    </div>
                    <p className="text-neutral-500 text-sm mt-0.5">
                      @{leetcode.username} · Rank {leetcode.rank}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="px-5 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-center min-w-[100px] hover:border-[#f59e0b]/50 hover:bg-[#1f1f1f] transition-all duration-300">
                    <p className="text-2xl font-bold text-white">{leetcode.problemsSolved}+</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Solved</p>
                  </div>
                  <div className="px-5 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-center min-w-[100px] hover:border-[#f59e0b]/50 hover:bg-[#1f1f1f] transition-all duration-300">
                    <p className="text-2xl font-bold text-[#f59e0b]">{leetcode.contestRating}</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Rating</p>
                  </div>
                  <div className="px-5 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-center min-w-[100px] hover:border-[#f59e0b]/50 hover:bg-[#1f1f1f] transition-all duration-300">
                    <p className="text-2xl font-bold text-white">{leetcode.topPercent}</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Top</p>
                  </div>
                </div>
              </div>

              {/* Middle Row */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Difficulty Bars */}
                <div className="space-y-3.5">
                  <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider mb-1">
                     Difficulty Breakdown
                  </p>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5 text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> EASY
                      </span>
                      <span className="text-neutral-500">{leetcode.easy.solved} / {leetcode.easy.total}</span>
                    </div>
                    <div className="h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a]">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-1000"
                        style={{ width: isVisible ? `${easyPercent}%` : "0%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5 text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" /> MEDIUM
                      </span>
                      <span className="text-neutral-500">{leetcode.medium.solved} / {leetcode.medium.total}</span>
                    </div>
                    <div className="h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a]">
                      <div
                        className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full transition-all duration-1000 delay-100"
                        style={{ width: isVisible ? `${mediumPercent}%` : "0%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5 text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> HARD
                      </span>
                      <span className="text-neutral-500">{leetcode.hard.solved} / {leetcode.hard.total}</span>
                    </div>
                    <div className="h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a]">
                      <div
                        className="h-full bg-gradient-to-r from-red-400 to-red-300 rounded-full transition-all duration-1000 delay-200"
                        style={{ width: isVisible ? `${hardPercent}%` : "0%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Extra Stats */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 text-center hover:border-[#f59e0b]/40 hover:bg-[#1f1f1f] transition-all duration-300">
                      <p className="text-lg font-bold text-white">{leetcode.submissions}</p>
                      <p className="text-[10px] text-neutral-500">Submissions</p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 text-center hover:border-[#f59e0b]/40 hover:bg-[#1f1f1f] transition-all duration-300">
                      <p className="text-lg font-bold text-white">{leetcode.activeDays}+</p>
                      <p className="text-[10px] text-neutral-500">Active Days</p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 text-center hover:border-[#f59e0b]/40 hover:bg-[#1f1f1f] transition-all duration-300">
                      <p className="text-lg font-bold text-white">{leetcode.attended}</p>
                      <p className="text-[10px] text-neutral-500">Contests</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#f59e0b]/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-lg">
                      🏅
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{leetcode.badge}</p>
                      <p className="text-[11px] text-neutral-500">Most Recent Badge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Domains + Button */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider mb-2.5">
                    Core Domains
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2.5">
                    {domains.map((d) => (
                      <button
                        key={d.id}
                        onMouseEnter={() => setActiveDomain(d.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-300 border ${
                          activeDomain === d.id
                            ? "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/50 scale-105 shadow-lg shadow-[#f59e0b]/10"
                            : "bg-[#1a1a1a] text-neutral-400 border-[#2a2a2a] hover:border-[#444] hover:text-white"
                        }`}
                      >
                        {d.icon} {d.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-400">
                    <span className="text-[#f59e0b] font-medium">
                      {domains.find((d) => d.id === activeDomain)?.icon}{" "}
                      {domains.find((d) => d.id === activeDomain)?.label}:
                    </span>{" "}
                    {domains.find((d) => d.id === activeDomain)?.topics}
                  </p>
                </div>

                <a
                  href={leetcode.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black text-sm font-semibold hover:from-[#fbbf24] hover:to-[#f59e0b] hover:shadow-xl hover:shadow-[#f59e0b]/30 transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-full sm:w-auto justify-center"
                >
                  VERIFY ON LEETCODE ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DSA;
