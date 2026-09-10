"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

interface Ring {
  radiusMult: number;
  tilt: number;
  speed: number;
  opacity: number;
  isSecondary: boolean;
}

/**
 * HolographicOrb – High-Performance Canvas 2D holographic AI orb.
 * Zero layout thrashing, precomputed colors, cached dimensions, 60+ FPS.
 */
export default function HolographicOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = canvas.offsetWidth || 200;
    let H = canvas.offsetHeight || 200;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    let cx = W / 2;
    let cy = H / 2;
    let R = Math.min(W, H) * 0.38;

    // ---- Pre-generate particle sphere (Fibonacci lattice) ----
    const PARTICLE_COUNT = 90;
    const particles: Particle[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y3d = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y3d * y3d));
      const theta = goldenAngle * i;
      particles.push({
        x: rad * Math.cos(theta),
        y: y3d,
        z: rad * Math.sin(theta),
        size: 1.2 + (i % 3) * 0.4,
        opacity: 0.4 + ((i % 5) / 5) * 0.4,
      });
    }

    // ---- Rings definition ----
    const rings: Ring[] = [
      { radiusMult: 1.18, tilt: 0.5,  speed: 0.4,  opacity: 0.45, isSecondary: false },
      { radiusMult: 1.35, tilt: -0.3, speed: -0.25, opacity: 0.3,  isSecondary: true },
      { radiusMult: 1.5,  tilt: 1.1,  speed: 0.18, opacity: 0.2,  isSecondary: false },
    ];

    // ---- Precomputed theme colors ----
    let accentRgb = "164, 119, 91";
    let secondaryRgb = "184, 169, 154";

    const updateColors = () => {
      try {
        const style = getComputedStyle(document.documentElement);
        const p = style.getPropertyValue("--accent-primary").trim();
        const s = style.getPropertyValue("--accent-secondary").trim();
        if (p.startsWith("#")) {
          const r = parseInt(p.slice(1, 3), 16) || 164;
          const g = parseInt(p.slice(3, 5), 16) || 119;
          const b = parseInt(p.slice(5, 7), 16) || 91;
          accentRgb = `${r}, ${g}, ${b}`;
        }
        if (s.startsWith("#")) {
          const r = parseInt(s.slice(1, 3), 16) || 184;
          const g = parseInt(s.slice(3, 5), 16) || 169;
          const b = parseInt(s.slice(5, 7), 16) || 154;
          secondaryRgb = `${r}, ${g}, ${b}`;
        }
      } catch {}
    };
    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class", "style"] });

    // ---- Mouse handler ----
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rotX = 0;
    let rotY = 0;

    // ---- Ellipse (ring) helper ----
    const drawRing = (ring: Ring, t: number, ringRad: number) => {
      const segments = 48;
      const cosT = Math.cos(ring.tilt + t * ring.speed);
      const sinT = Math.sin(ring.tilt + t * ring.speed);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      ctx.beginPath();
      for (let s = 0; s <= segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        const x3 = Math.cos(angle) * ringRad;
        const y3 = Math.sin(angle) * ringRad * cosT;
        const z3 = Math.sin(angle) * ringRad * sinT;

        const rx2 = x3 * cosY - z3 * sinY;
        const rz2 = x3 * sinY + z3 * cosY;
        const ry2 = y3 * cosX - rz2 * sinX;
        if (s === 0) ctx.moveTo(cx + rx2, cy + ry2);
        else ctx.lineTo(cx + rx2, cy + ry2);
      }
      ctx.strokeStyle = `rgba(${ring.isSecondary ? secondaryRgb : accentRgb}, ${ring.opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    // ---- Main render loop ----
    let t = 0;
    const animate = () => {
      t += 0.008;

      ctx.clearRect(0, 0, W, H);

      // Smooth rotation
      const targetX = mouse.current.y * 0.35;
      const targetY = t + mouse.current.x * 0.35;
      rotX += (targetX - rotX) * 0.05;
      rotY += (targetY - rotY) * 0.05;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      // ---- Core Glow ----
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentRgb}, 0.05)`;
      ctx.fill();

      // ---- Project particles ----
      const projected = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const nx = p.x * cosY - p.z * sinY;
        const nz = p.x * sinY + p.z * cosY;
        const ny2 = p.y * cosX - nz * sinX;
        const nz2 = p.y * sinX + nz * cosX;
        const px = cx + nx * R;
        const py = cy + ny2 * R;
        const scale = (nz2 + 1.5) * 0.4;
        projected.push({ p, px, py, scale, depth: nz2 });
      }

      // Draw neural lines between nearby particles
      ctx.lineWidth = 0.4;
      for (let i = 0; i < PARTICLE_COUNT; i += 2) {
        for (let j = i + 1; j < Math.min(i + 5, PARTICLE_COUNT); j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.px - b.px;
          const dy = a.py - b.py;
          const distSq = dx * dx + dy * dy;
          if (distSq < 1200) {
            const alpha = (1 - distSq / 1200) * 0.15 * a.scale;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const item = projected[i];
        const size = Math.max(0.8, item.p.size * item.scale);
        const alpha = Math.min(1, Math.max(0.1, item.p.opacity * item.scale));
        ctx.beginPath();
        ctx.arc(item.px, item.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;
        ctx.fill();
      }

      // ---- Rings ----
      for (let i = 0; i < rings.length; i++) {
        drawRing(rings[i], t, R * rings[i].radiusMult);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize observer
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      W = entry.contentRect.width || canvas.offsetWidth || 200;
      H = entry.contentRect.height || canvas.offsetHeight || 200;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      cx = W / 2;
      cy = H / 2;
      R = Math.min(W, H) * 0.38;
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Holographic AI orb visualization"
      aria-hidden="true"
    />
  );
}
