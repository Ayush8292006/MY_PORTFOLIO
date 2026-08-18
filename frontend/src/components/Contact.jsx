import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const contactInfo = [
    {
      label: "EMAIL",
      value: "aksrivastav0825@gmail.com",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      action: "copy",
    },
    {
      label: "LINKEDIN",
      value: "ayush-kumar-35499a32b",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://www.linkedin.com/in/ayush-kumar-35499a32b",
    },
    {
      label: "GITHUB",
      value: "Ayush8292006",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      href: "https://github.com/Ayush8292006",
    },
    {
      label: "LEETCODE",
      value: "ayush825",
      icon: <span className="text-xs font-bold">LC</span>,
      href: "https://leetcode.com/u/ayush825/",
    },
    {
      label: "LOCATION",
      value: "Greater Noida, Uttar Pradesh, India",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "aksrivastav0825@gmail.com",
        },
        PUBLIC_KEY
      );

      if (result.text === "OK") {
        setPopupType("success");
        setShowPopup(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setShowPopup(false), 4000);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("aksrivastav0825@gmail.com");
    setShowCopyPopup(true);
    setTimeout(() => setShowCopyPopup(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-24 bg-black relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-[#f59e0b] text-[11px] font-mono tracking-[0.25em] uppercase mb-3">
            [ CONTACT ]
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
  Let's Build <span className="text-[#f59e0b]">Something Real</span>
</h2>
<p className="text-neutral-500 text-sm max-w-lg leading-relaxed">
  I'm always open to exciting collaborations, innovative projects, or simply a 
  thoughtful conversation about technology. Whether you have a groundbreaking 
  idea, a challenging problem to solve, or just want to connect — my inbox is 
  ready. I personally respond to every message within 24 hours.
</p>
        </div>

        {/* Main Grid */}
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-14 transition-all duration-1000 delay-150 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* LEFT - Contact Info */}
          <div className="space-y-3">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                onClick={() => {
                  if (item.action === "copy") copyEmail();
                  else if (item.href) window.open(item.href, "_blank");
                }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#f59e0b]/30 cursor-pointer transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center text-[#f59e0b] group-hover:border-[#f59e0b]/40 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-neutral-600 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#f59e0b]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-600 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#f59e0b]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-neutral-600 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's it about?"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#f59e0b]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] text-neutral-600 uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#f59e0b]/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#f59e0b] text-black font-semibold text-sm hover:bg-[#fbbf24] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f59e0b]/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <span>✈</span>
                  SEND MESSAGE
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Tagline */}
        <div
          className={`mt-20 pt-10 border-t border-[#1a1a1a] text-center transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-neutral-500 text-sm">
            Good engineers ship. Let's{" "}
            <span className="text-[#f59e0b]">build something that does</span>.
          </p>
          <div className="mt-4 flex justify-center">
            <span className="w-8 h-8 rounded-full border border-[#f59e0b]/50 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            </span>
          </div>
        </div>
      </div>

      {/* Success / Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 max-w-sm w-full text-center">
            <div
              className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${
                popupType === "success"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {popupType === "success" ? "✓" : "✕"}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {popupType === "success" ? "Message Sent!" : "Something went wrong"}
            </h3>
            <p className="text-neutral-500 text-sm">
              {popupType === "success"
                ? "I'll get back to you within 24 hours."
                : "Please try again later."}
            </p>
          </div>
        </div>
      )}

      {/* Copy Popup */}
      {showCopyPopup && (
        <div className="fixed bottom-8 right-6 z-50 bg-[#f59e0b]/15 border border-[#f59e0b]/30 rounded-xl px-5 py-3 backdrop-blur-xl">
          <p className="text-[#f59e0b] text-sm font-medium">Email copied!</p>
        </div>
      )}
    </section>
  );
};

export default Contact;