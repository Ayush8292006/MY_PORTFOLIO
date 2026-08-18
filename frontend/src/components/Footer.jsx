import React, { useState } from "react";

const Footer = () => {
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "DSA", href: "#dsa" },
    { name: "EDUCATION", href: "#education" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  const handleEmailClick = () => {
    window.location.href = "mailto:aksrivastav0825@gmail.com";
    setTimeout(() => {
      navigator.clipboard.writeText("aksrivastav0825@gmail.com");
      setShowCopyPopup(true);
      setTimeout(() => setShowCopyPopup(false), 2000);
    }, 400);
  };

  return (
    <footer className="bg-black border-t border-[#1a1a1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left - Brand + Open to Work */}
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg tracking-tight">
              AYUSH<span className="text-[#f59e0b]">.DEV</span>
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase">
                Open to Work
              </span>
            </div>
          </div>

          {/* Center - Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-[11px] text-neutral-500 hover:text-[#f59e0b] transition-colors duration-300 tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right - Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Ayush8292006"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-center text-neutral-500 hover:text-white hover:border-[#333] transition-all duration-300"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/ayush-kumar-35499a32b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-center text-neutral-500 hover:text-white hover:border-[#333] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://leetcode.com/u/ayush825/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-center text-neutral-500 hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all duration-300"
              aria-label="LeetCode"
            >
              <span className="text-xs font-bold">LC</span>
            </a>

            <button
              onClick={handleEmailClick}
              className="w-9 h-9 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-center text-neutral-500 hover:text-white hover:border-[#333] transition-all duration-300"
              aria-label="Email"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1a1a1a]" />

        {/* Bottom Section */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-neutral-600">
            © {currentYear} Ayush Kumar — Built with precision, not templates.
          </p>
          <p className="text-[11px] text-neutral-600">
            Last Updated: August 2026
          </p>
        </div>
      </div>

      {/* Copy Popup */}
      {showCopyPopup && (
        <div className="fixed bottom-8 right-6 z-50 bg-[#f59e0b]/15 border border-[#f59e0b]/30 rounded-xl px-5 py-3 backdrop-blur-xl">
          <p className="text-[#f59e0b] text-sm font-medium">Email copied!</p>
        </div>
      )}
    </footer>
  );
};

export default Footer;