// Lightweight Web Audio API synthesizer for tactile UI sound effects
// Completely self-contained, no external mp3/wav files needed, muted by default.

let audioCtx = null;
let isMuted = true; // default muted for polite UX

// Initialize AudioContext on first user gesture
function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch((err) => {
      // Audio resume blocked by browser policy until user interaction
      return err;
    });
  }
  return audioCtx;
}

export const soundManager = {
  getMuted() {
    return isMuted;
  },
  setMuted(muted) {
    isMuted = muted;
    try {
      localStorage.setItem("portfolio-sound-muted", muted ? "1" : "0");
    } catch (e) {
      void e;
    }
    if (!muted) {
      getAudioContext();
      this.playChime();
    }
  },
  toggleMuted() {
    this.setMuted(!isMuted);
    return isMuted;
  },
  init() {
    try {
      const stored = localStorage.getItem("portfolio-sound-muted");
      if (stored !== null) {
        isMuted = stored === "1";
      }
    } catch (e) {
      void e;
    }
  },
  playClick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch (e) {
      void e;
    }
  },
  playHover() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(380, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {
      void e;
    }
  },
  playChime() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.035, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.26);
      });
    } catch (e) {
      void e;
    }
  },
};
