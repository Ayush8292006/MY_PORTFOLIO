import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Mic, MicOff } from "lucide-react";
import CustomCursor from "./CustomCursor";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const terminalRef = useRef(null);

  // Hero's terminal script (Aapka existing script)
  const terminalScript = [
    { type: "command", text: "clear && neofetch" },
    { type: "output", text: "┌──────────────────────────────────────────────┐" },
    { type: "output", text: "│  AYUSH KUMAR  ·  Software Portfolio │" },
    { type: "output", text: "└──────────────────────────────────────────────┘" },
    { type: "command", text: "whoami" },
    { type: "output", text: "ayush  ·  Software Developer  ·  Full Stack  ·  GenAI" },
    { type: "command", text: "cat ~/profile/about.md" },
    { type: "output", text: "" },
    { type: "output", text: "  Education   B.Tech CSE (AI) — GL Bajaj Institute of Technology and Management" },
    { type: "output", text: "  Role        Software Developer building production systems" },
    { type: "output", text: "  Stack       React · Node.js · TypeScript · MongoDB · WebSockets" },
    { type: "output", text: "  AI Focus    LangChain · RAG · Gemini · GraphRAG · Voice Agents" },
    { type: "output", text: "  Status      Open to Software Developer & Full Stack roles" },
    { type: "output", text: "" },
    { type: "command", text: "ls ~/shipped" },
    { type: "output", text: "  Cravely/   MovieMind/   CineBook/   AI-Assistant/   ProjectFlow/" },
    { type: "command", text: 'echo $MISSION' },
    { type: "output", text: "  Building scalable web applications and intelligent AI systems." },
    { type: "command", text: "exit" },
    { type: "output", text: "  Session ready. Press Esc to close." },
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "DSA", href: "#dsa" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // ==========================================
  // SCROLL DETECTION (IntersectionObserver)
  // ==========================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: "0px 0px 0px 0px" 
    });

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // ==========================================
  // Terminal aur Voice ke saare useEffect
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(true);
        setTypedLines([]);
        setCurrentLine("");
        setLineIndex(0);
        setCharIndex(0);
      }
      if (e.key === "Escape") {
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!terminalOpen) return;
    if (lineIndex >= terminalScript.length) return;

    const line = terminalScript[lineIndex];
    const text = line.text;

    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(text.substring(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 15);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedLines((prev) => [...prev, line]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((i) => i + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [terminalOpen, lineIndex, charIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typedLines, currentLine]);

  // ==========================================
  // FUNCTIONS
  // ==========================================
  const handleNavClick = (e, href, linkName) => {
    e.preventDefault();
    setActiveLink(linkName);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    if (isOpen) setIsOpen(false);
  };

  const handleVoiceNavigation = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    setIsListening(true);
    setTranscript("🎤 Listening...");

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(`🗣️ "${command}"`);

      const commandMap = {
        home: "#home", about: "#about", skills: "#skills", dsa: "#dsa",
        project: "#projects", projects: "#projects", education: "#education",
        contact: "#contact", "go to home": "#home", "go to about": "#about",
        "go to skills": "#skills", "go to dsa": "#dsa", "go to projects": "#projects",
        "go to education": "#education", "go to contact": "#contact",
      };

      let targetHref = null;
      for (const [key, value] of Object.entries(commandMap)) {
        if (command.includes(key)) {
          targetHref = value;
          break;
        }
      }

      if (targetHref) {
        const linkName = targetHref.replace("#", "");
        setActiveLink(linkName);
        const element = document.querySelector(targetHref);
        if (element) element.scrollIntoView({ behavior: "smooth" });
        speakText(`Navigating to ${linkName}`);
      } else {
        speakText("Command not recognized. Please say home, about, skills, dsa, projects, education, or contact.");
      }

      setIsListening(false);
      setTimeout(() => setTranscript(""), 3000);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setTranscript("❌ Error: " + event.error);
      setIsListening(false);
      setTimeout(() => setTranscript(""), 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-US";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const openTerminal = useCallback(() => {
    setTerminalOpen(true);
    setTypedLines([]);
    setCurrentLine("");
    setLineIndex(0);
    setCharIndex(0);
  }, []);

  return (
    <>
      <CustomCursor />

      {/* ==========================================
          RIGHT SIDE VERTICAL SIDEBAR
          ========================================== */}
            {/* ==========================================
          RIGHT SIDE VERTICAL SIDEBAR (NOW + Green Dot)
          ========================================== */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 p-3 pr-0 bg-[#0a0e1a]/90 backdrop-blur-md border border-[#2a3a5a] border-r-0 rounded-l-xl shadow-xl shadow-black/50">
        
        {/* Vertical Header: Green Dot + "NOW" Text */}
        <div className="writing-mode-vertical flex flex-col items-center justify-center gap-2.5 h-[220px] mb-3 pb-2 border-b border-[#2a3a5a]">
          

          {/* "NOW" Text */}
          <span className="text-[12px] font-bold text-emerald-400 tracking-[0.2em] mt-1">
            NOW
            <span className="relative inline-flex h-2 m-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
          </span>
         
            
        </div>

       
      </div>

      {/* ==========================================
          MAIN TOP NAVBAR
          ========================================== */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border-b border-[#2a2a2a] shadow-xl shadow-black/40"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                className="flex items-center gap-2 group"
                onClick={(e) => handleNavClick(e, "#home", "home")}
              >
                <span className="text-xl font-bold text-white tracking-tight group-hover:text-[#f59e0b] transition-colors duration-300">
                  AYUSH
                  <span className="text-[#f59e0b] group-hover:text-white transition-colors duration-300">
                    .DEV
                  </span>
                </span>
              </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              
              {/* Desktop Navigation (Top Bar) */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-8 lg:ml-12">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name.toLowerCase())}
                    className={`
                      text-sm font-medium transition-all duration-300 relative cursor-pointer
                      ${
                        activeLink === link.name.toLowerCase()
                          ? "text-white"
                          : "text-neutral-500 hover:text-[#f59e0b]"
                      }
                    `}
                  >
                    {link.name}
                    
                    {/* 🔥 DOUBLE UNDERLINE (Patli aur Lambi) 🔥 */}
                    {activeLink === link.name.toLowerCase() && (
                      <span className="absolute -bottom-1 left-0 right-0 flex flex-col items-center gap-[2px]">
                        {/* Upar wala chota, patla line */}
                        <span className="h-0.5 w-5 bg-[#f59e0b] rounded-full shadow-lg shadow-[#f59e0b]/25" />
                        {/* Neeche wala lamba, patla line */}
                        <span className="h-0.5 w-12 bg-[#f59e0b] rounded-full shadow-lg shadow-[#f59e0b]/25" />
                      </span>
                    )}
                  </a>
                ))}
              </div>

              {/* Voice Assistant */}
              <button
                onClick={handleVoiceNavigation}
                className={`
                  p-2 rounded-lg transition-all duration-300 relative
                  ${isListening ? "text-red-400" : "text-neutral-500 hover:text-[#f59e0b]"}
                  ${isSpeaking ? "text-[#f59e0b]" : ""}
                `}
                aria-label="Voice assistant"
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                {isListening && (
                  <span className="absolute -top-0.5 -right-0.5">
                    <span className="flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                  </span>
                )}
                {isSpeaking && (
                  <span className="absolute -top-0.5 -right-0.5">
                    <span className="flex h-2.5 w-2.5">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f59e0b]" />
                    </span>
                  </span>
                )}
              </button>

              {/* Transcript */}
              {transcript && (
                <div
                  className={`
                  hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg
                  bg-[#141414] border border-[#2a2a2a]
                  text-xs text-neutral-400
                  ${transcript.includes("✅") ? "border-emerald-500/30 text-emerald-400" : ""}
                  ${transcript.includes("❌") ? "border-red-500/30 text-red-400" : ""}
                `}
                >
                  <span className="w-1 h-1 rounded-full bg-[#f59e0b] animate-pulse" />
                  {transcript}
                </div>
              )}

              {/* Ctrl + K button */}
              <button
                onClick={openTerminal}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#141414] border border-[#2a2a2a] hover:border-[#f59e0b]/40 hover:bg-[#1a1a1a] transition-all duration-300 cursor-pointer"
                title="Open terminal (Ctrl+K)"
              >
                <kbd className="px-1.5 py-0.5 rounded bg-black/60 text-neutral-400 text-xs font-medium">Ctrl</kbd>
                <span className="text-neutral-600 text-xs">+</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/60 text-neutral-400 text-xs font-medium">K</kbd>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-neutral-500 hover:text-[#f59e0b] hover:bg-[#1a1a1a] transition-all"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden fixed inset-x-0 top-16
            bg-black/95 backdrop-blur-xl border-b border-[#2a2a2a]
            transform transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link.name.toLowerCase());
                  setIsOpen(false);
                  const element = document.querySelector(link.href);
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className={`
                  block px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${
                    activeLink === link.name.toLowerCase()
                      ? "text-white bg-[#141414] border-l-2 border-[#f59e0b]"
                      : "text-neutral-500 hover:text-[#f59e0b] hover:bg-[#141414]"
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Terminal Overlay */}
      {terminalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTerminalOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#0c0c0c] to-[#080808] rounded-xl border border-[#2a2a2a] shadow-2xl shadow-[#f59e0b]/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 px-4 py-3 bg-black/70 border-b border-[#2a2a2a]">
              <div className="flex gap-1.5">
                <button onClick={() => setTerminalOpen(false)} className="w-3 h-3 rounded-full bg-[#ef4444]/80 hover:bg-[#ef4444] transition-colors" />
                <div className="w-3 h-3 rounded-full bg-[#eab308]/80" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
              </div>
              <span className="text-[11px] font-mono text-neutral-500 ml-2">bash — ayush@portfolio:~</span>
              <button onClick={() => setTerminalOpen(false)} className="ml-auto text-neutral-600 hover:text-neutral-400 text-xs font-mono transition-colors">Esc</button>
            </div>

            <div ref={terminalRef} className="p-5 h-[360px] sm:h-[400px] overflow-y-auto font-mono text-[13px] leading-relaxed">
              {typedLines.map((line, i) => (
                <div key={i} className={`mb-0.5 ${line.type === "command" ? "text-[#f59e0b]" : "text-neutral-400"}`}>
                  {line.text || "\u00A0"}
                </div>
              ))}
              {currentLine && (
                <div className={`${terminalScript[lineIndex - 1]?.type === "command" ? "text-[#f59e0b]" : "text-neutral-400"}`}>
                  {currentLine}
                  <span className="inline-block w-2 h-3.5 bg-[#f59e0b] animate-pulse ml-0.5 align-middle" />
                </div>
              )}
              {lineIndex >= terminalScript.length && (
                <div className="text-[#f59e0b] mt-1">
                  $ <span className="inline-block w-2 h-3.5 bg-[#f59e0b] animate-pulse ml-0.5 align-middle" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;