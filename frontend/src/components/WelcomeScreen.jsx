import React, { useEffect, useState, useRef } from 'react';

const WelcomeScreen = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [showSubtext, setShowSubtext] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const hasSpoken = useRef(false);
  const fullText = "Welcome to Ayush's Portfolio";
  
const subTexts = [
  "✦ Full Stack Developer",
  "✦ Software Developer",
  "✦ Generative AI Enthusiast",
  "✦ AI/ML Enthusiast",
];

  const speakFullSentence = () => {
    if (!('speechSynthesis' in window)) return;
    if (hasSpoken.current) return;
    hasSpoken.current = true;

    const utterance = new SpeechSynthesisUtterance("Welcome to Ayush's Portfolio");
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';
    
    utterance.onend = () => {
      console.log('✅ Speech complete');
      setTimeout(() => {
        console.log('⏳ 3 seconds done, navigating...');
        setNavigate(true);
      }, 3000); // ✅ 3 seconds
    };

    utterance.onerror = () => {
      console.log('❌ Speech error, navigating anyway...');
      setNavigate(true);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < fullText.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowSubtext(true), 300);
          return prev;
        }
      });
    }, 60);

    const voiceTimer = setTimeout(() => {
      speakFullSentence();
    }, 1500);

    const fallbackTimer = setTimeout(() => {
      if (!navigate) {
        console.log('⚠️ Fallback: Navigating after 6 seconds');
        setNavigate(true);
      }
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(voiceTimer);
      clearTimeout(fallbackTimer);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (navigate) {
      const event = new CustomEvent('welcomeComplete');
      window.dispatchEvent(event);
    }
  }, [navigate]);

  useEffect(() => {
    if (!showSubtext) return;
    let subIndex = 0;
    const subInterval = setInterval(() => {
      subIndex = (subIndex + 1) % subTexts.length;
      const subtextEl = document.getElementById('subtext');
      if (subtextEl) {
        subtextEl.textContent = subTexts[subIndex];
      }
    }, 1200);

    return () => clearInterval(subInterval);
  }, [showSubtext]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0e1a] overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#4a7aaa]/30 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1a2a4a] to-[#2a4a7a] flex items-center justify-center text-5xl font-bold text-white shadow-2xl shadow-[#1a2a4a]/50 animate-[pulse_2s_ease-in-out_infinite]">
            A
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-[#4a7aaa]/20 to-[#6aaadd]/20 rounded-3xl blur-2xl animate-pulse" />
          <div className="absolute -inset-8 bg-gradient-to-r from-[#4a7aaa]/10 to-[#6aaadd]/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          {fullText.substring(0, textIndex)}
          <span className="inline-block w-0.5 h-8 sm:h-10 md:h-12 bg-[#4a7aaa] animate-pulse ml-1" />
        </h1>

        <div className="mt-4 h-8">
          {showSubtext && (
            <p
              id="subtext"
              className="text-lg sm:text-xl text-[#8aaac8] font-medium animate-[fadeInUp_0.5s_ease-out]"
            >
              ✦ Full Stack Developer
            </p>
          )}
        </div>

        <div className="mt-8 w-48 sm:w-64 h-1 bg-[#1a2236] rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-[#4a7aaa] to-[#6aaadd] rounded-full animate-[loadingBar_3s_ease-in-out_forwards]" />
        </div>

        <p className="mt-4 text-[#6a8aaa] text-xs tracking-widest uppercase animate-pulse">
          Loading Experience...
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;