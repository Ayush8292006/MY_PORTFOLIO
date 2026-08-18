
import React, { useEffect, useRef, useCallback } from "react";

const Particles3D = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationRef = useRef(null);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = (Math.random() - 0.5) * 2200;
      this.y = (Math.random() - 0.5) * 2200;
      this.z = Math.random() * 900 + 80;

      this.size = Math.random() * 2.8 + 0.4;
      this.baseSize = this.size;
      this.baseX = this.x;
      this.baseY = this.y;

      // Only orange + white (hero theme)
      const roll = Math.random();
      if (roll < 0.55) {
        // Amber / orange
        this.type = "orange";
        this.opacity = 0.45 + Math.random() * 0.4;
      } else if (roll < 0.8) {
        // Soft gold
        this.type = "gold";
        this.opacity = 0.35 + Math.random() * 0.35;
      } else {
        // White / soft white
        this.type = "white";
        this.opacity = 0.25 + Math.random() * 0.4;
      }

      this.floatSpeed = 0.00012 + Math.random() * 0.0004;
      this.floatOffset = Math.random() * Math.PI * 2;
      this.floatAmplitude = 0.25 + Math.random() * 0.5;
      this.depthFactor = 0.008 + Math.random() * 0.03;
      this.pulseSpeed = 0.008 + Math.random() * 0.018;
      this.pulseOffset = Math.random() * Math.PI * 2;
    }

    update(mx, my, time) {
      const depthInfluence = 0.35 + (this.z / 1100) * 0.65;
      this.x = this.baseX - mx * this.depthFactor * depthInfluence;
      this.y = this.baseY - my * this.depthFactor * depthInfluence;

      this.x += Math.sin(time * this.floatSpeed + this.floatOffset) * this.floatAmplitude;
      this.y += Math.cos(time * this.floatSpeed * 0.7 + this.floatOffset * 0.8) * this.floatAmplitude;

      this.z += Math.sin(time * this.floatSpeed * 0.15 + this.floatOffset) * 0.25;
      this.z = Math.max(60, Math.min(980, this.z));

      this.size =
        this.baseSize *
        (0.75 + 0.25 * Math.sin(time * this.pulseSpeed + this.pulseOffset));
    }

    draw(ctx, w, h) {
      const perspective = 900;
      const scale = perspective / (perspective + this.z);
      const x2d = this.x * scale + w / 2;
      const y2d = this.y * scale + h / 2;
      const size = this.size * scale;

      const depthOpacity = this.opacity * (0.55 + 0.45 * (1 - this.z / 1000));
      const glowBoost = 0.5 + 0.5 * (1 - this.z / 1000);

      ctx.save();
      ctx.translate(x2d, y2d);

      const glowSize = size * 2.2;
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);

      if (this.type === "orange") {
        gradient.addColorStop(0, `rgba(251, 191, 36, ${depthOpacity * 0.95})`);
        gradient.addColorStop(0.25, `rgba(245, 158, 11, ${depthOpacity * 0.65})`);
        gradient.addColorStop(0.55, `rgba(217, 119, 6, ${depthOpacity * 0.3})`);
        gradient.addColorStop(1, "rgba(217, 119, 6, 0)");
        ctx.shadowColor = `rgba(245, 158, 11, ${depthOpacity * glowBoost * 0.55})`;
      } else if (this.type === "gold") {
        gradient.addColorStop(0, `rgba(253, 224, 71, ${depthOpacity * 0.85})`);
        gradient.addColorStop(0.3, `rgba(250, 204, 21, ${depthOpacity * 0.5})`);
        gradient.addColorStop(1, "rgba(250, 204, 21, 0)");
        ctx.shadowColor = `rgba(250, 204, 21, ${depthOpacity * glowBoost * 0.4})`;
      } else {
        // White
        gradient.addColorStop(0, `rgba(255, 255, 255, ${depthOpacity * 0.9})`);
        gradient.addColorStop(0.35, `rgba(255, 255, 255, ${depthOpacity * 0.4})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.shadowColor = `rgba(255, 255, 255, ${depthOpacity * glowBoost * 0.25})`;
      }

      ctx.shadowBlur = size * (2.5 + glowBoost * 1.5);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, glowSize * 0.65, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.7);
      if (this.type === "white") {
        core.addColorStop(0, `rgba(255, 255, 255, ${depthOpacity})`);
        core.addColorStop(1, `rgba(255, 255, 255, ${depthOpacity * 0.15})`);
      } else {
        core.addColorStop(0, `rgba(255, 255, 255, ${depthOpacity * 0.95})`);
        core.addColorStop(0.4, `rgba(251, 191, 36, ${depthOpacity * 0.7})`);
        core.addColorStop(1, `rgba(245, 158, 11, ${depthOpacity * 0.2})`);
      }

      ctx.fillStyle = core;
      ctx.shadowBlur = size;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      return { x: x2d, y: y2d, z: this.z };
    }
  }

  const drawConnections = (ctx, positions) => {
    const maxDist = 130;
    const maxPer = 2;

    for (let i = 0; i < positions.length; i++) {
      let count = 0;
      for (let j = i + 1; j < positions.length && count < maxPer; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.22;
          const depth = 1 - (positions[i].z + positions[j].z) / 2000;

          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * depth})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          count++;
        }
      }
    }
  };

  const initParticles = useCallback(() => {
    const count = window.innerWidth < 768 ? 90 : 160;
    return Array.from({ length: count }, () => new Particle());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = initParticles();

    const onMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX - width / 2;
      mouseRef.current.targetY = e.clientY - height / 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    let time = 0;
    const animate = () => {
      time++;
      // Transparent clear — black comes from page bg
      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const positions = [];
      particlesRef.current.forEach((p) => {
        p.update(mouseRef.current.x, mouseRef.current.y, time);
        const pos = p.draw(ctx, width, height);
        if (pos) positions.push(pos);
      });

      if (positions.length > 0 && width > 768) {
        drawConnections(ctx, positions);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, background: "transparent" }}
    />
  );
};

export default Particles3D;
