
import React, { useEffect, useState } from "react";

const WelcomeScreen = () => {
  const [phase, setPhase] = useState("enter"); // enter | type | hold | zoom
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const fullText = "Welcome to Ayush's Portfolio";
  const subTexts = [
    "Software Developer",
    "Full Stack Developer",
    "GenAI Enthusiast",
    "MERN Stack Developer",
  ];

  // Phase timeline
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("type"), 600);
    return () => clearTimeout(t1);
  }, []);

  // Typewriter
  useEffect(() => {
    if (phase !== "type") return;
    if (textIndex >= fullText.length) {
      setPhase("hold");
      return;
    }
    const t = setTimeout(() => setTextIndex((p) => p + 1), 45);
    return () => clearTimeout(t);
  }, [phase, textIndex]);

  // Subtext cycle during hold
  useEffect(() => {
    if (phase !== "hold" && phase !== "type") return;
    const t = setInterval(() => {
      setSubIndex((p) => (p + 1) % subTexts.length);
    }, 1100);
    return () => clearInterval(t);
  }, [phase]);

  // Progress + zoom out to home
  useEffect(() => {
    if (phase === "enter") return;

    const start = Date.now();
    const duration = 3800;

    const tick = () => {
      const pct = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setPhase("zoom");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("welcomeComplete"));
        }, 700);
      }
    };

    const delay = setTimeout(() => requestAnimationFrame(tick), 200);
    return () => clearTimeout(delay);
  }, [phase === "type"]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden transition-all duration-700 ease-in-out
        ${phase === "zoom" ? "scale-150 opacity-0 blur-md" : "scale-100 opacity-100 blur-0"}
      `}
    >
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#f59e0b]/20 transition-all duration-1000
            ${phase === "enter" ? "scale-50 opacity-0" : "scale-100 opacity-100"}
          `}
          style={{ animation: phase !== "enter" ? "spinSlow 18s linear infinite" : "none" }}
        />
        <div
          className={`absolute w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] rounded-full border border-[#f59e0b]/10 transition-all duration-1000 delay-150
            ${phase === "enter" ? "scale-50 opacity-0" : "scale-100 opacity-100"}
          `}
          style={{ animation: phase !== "enter" ? "spinSlow 28s linear infinite reverse" : "none" }}
        />
        <div
          className={`absolute w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full border border-white/5 transition-all duration-1000 delay-300
            ${phase === "enter" ? "scale-50 opacity-0" : "scale-100 opacity-100"}
          `}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#f59e0b]/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-[250px] h-[250px] bg-[#f59e0b]/10 rounded-full blur-[90px] animate-pulse delay-1000" />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#f59e0b]/40"
            style={{
              left: `${8 + (i * 5.2) % 84}%`,
              top: `${12 + (i * 7.3) % 76}%`,
              animation: `floatDot ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 5) * 0.35}s`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-700
          ${phase === "enter" ? "scale-90 opacity-0 translate-y-6" : "scale-100 opacity-100 translate-y-0"}
        `}
      >
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.35)]">
            <span className="text-2xl sm:text-3xl font-black text-black">AK</span>
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-[#f59e0b]/30 animate-ping opacity-50" />
        </div>

        {/* Title typewriter */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight min-h-[1.3em]">
          {fullText.substring(0, textIndex)}
          {(phase === "type" || phase === "hold") && (
            <span className="inline-block w-[3px] h-7 sm:h-9 bg-[#f59e0b] animate-pulse ml-1 align-middle rounded-full" />
          )}
        </h1>

        {/* Role cycle */}
        <div className="mt-4 h-7 flex items-center justify-center overflow-hidden">
          {(phase === "type" || phase === "hold") && textIndex > 10 && (
            <p
              key={subIndex}
              className="text-sm sm:text-base text-[#f59e0b] font-medium tracking-wide animate-[roleIn_0.4s_ease-out]"
            >
              {subTexts[subIndex]}
            </p>
          )}
        </div>

        {/* Progress ring style bar */}
        <div className="mt-10 w-44 sm:w-56">
          <div className="h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] rounded-full transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-600">
            Entering portfolio
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.35; }
          50% { transform: translateY(-14px) scale(1.4); opacity: 0.8; }
        }
        @keyframes roleIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
