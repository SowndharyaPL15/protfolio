"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

interface Ring {
  radius: number;
  tilt: number;
  speed: number;
  opacity: number;
  color: string;
}

/**
 * HolographicOrb – pure Canvas 2D holographic AI orb.
 * No external dependencies. Mouse-reactive, animated rings,
 * particle sphere, neural connection lines.
 */
export default function HolographicOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.38;

    // ---- Generate particle sphere (Fibonacci lattice) ----
    const PARTICLE_COUNT = 180;
    const particles: Particle[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y3d = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
      const rad = Math.sqrt(1 - y3d * y3d);
      const theta = goldenAngle * i;
      particles.push({
        x: rad * Math.cos(theta),
        y: y3d,
        z: rad * Math.sin(theta),
        vx: 0, vy: 0, vz: 0,
        size: 1.2 + Math.random() * 1.2,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    // ---- Rings ----
    const getAccentColor = () => {
      const root = getComputedStyle(document.documentElement);
      return root.getPropertyValue("--accent-primary").trim() || "#00f0ff";
    };
    const getSecondaryColor = () => {
      const root = getComputedStyle(document.documentElement);
      return root.getPropertyValue("--accent-secondary").trim() || "#0066ff";
    };

    const rings: Ring[] = [
      { radius: R * 1.18, tilt: 0.5,  speed: 0.4,  opacity: 0.45, color: "" },
      { radius: R * 1.35, tilt: -0.3, speed: -0.25, opacity: 0.3,  color: "" },
      { radius: R * 1.5,  tilt: 1.1,  speed: 0.18, opacity: 0.2,  color: "" },
    ];

    // ---- Mouse handler ----
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // ---- Project 3-D -> 2-D ----
    let rotX = 0;
    let rotY = 0;

    const project = (x: number, y: number, z: number, rx: number, ry: number) => {
      // Rotate Y
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const nx = x * cosY - z * sinY;
      const nz = x * sinY + z * cosY;
      // Rotate X
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const ny2 = y * cosX - nz * sinX;
      const nz2 = y * sinX + nz * cosX;
      return { px: cx + nx * R, py: cy + ny2 * R, depth: nz2 };
    };

    // ---- Ellipse (ring) helper ----
    const drawRing = (ring: Ring, t: number) => {
      const segments = 80;
      const cosT = Math.cos(ring.tilt + t * ring.speed);
      const sinT = Math.sin(ring.tilt + t * ring.speed);

      ctx.beginPath();
      for (let s = 0; s <= segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        const x3 = Math.cos(angle) * ring.radius;
        const y3 = Math.sin(angle) * ring.radius * cosT;
        const z3 = Math.sin(angle) * ring.radius * sinT;
        // Apply global rotation
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        const rx2 = x3 * cosY - z3 * sinY;
        const rz2 = x3 * sinY + z3 * cosY;
        const cosX2 = Math.cos(rotX), sinX2 = Math.sin(rotX);
        const ry2 = y3 * cosX2 - rz2 * sinX2;
        if (s === 0) ctx.moveTo(cx + rx2, cy + ry2);
        else ctx.lineTo(cx + rx2, cy + ry2);
      }
      ctx.strokeStyle = `rgba(${hexToRgb(ring.color)}, ${ring.opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    };

    // ---- Main render loop ----
    let t = 0;
    const animate = () => {
      t += 0.008;

      W = canvas.offsetWidth;
      H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      // Update rotation
      const targetX = mouse.current.y * 0.4;
      const targetY = t + mouse.current.x * 0.4;
      rotX += (targetX - rotX) * 0.04;
      rotY += (targetY - rotY) * 0.04;

      const accent = getAccentColor();
      const secondary = getSecondaryColor();
      rings[0].color = accent;
      rings[1].color = secondary;
      rings[2].color = accent;

      // ---- Glow core ----
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.6);
      grad.addColorStop(0, `rgba(${hexToRgb(accent)}, 0.07)`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // ---- Sort + draw particles ----
      const projected = particles.map((p) => {
        const { px, py, depth } = project(p.x, p.y, p.z, rotX, rotY);
        const scale = (depth + 1.5) / 2.5;
        return { p, px, py, scale, depth };
      });
      projected.sort((a, b) => a.depth - b.depth);

      // Draw neural connections between close particles
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          if (j - i > 8) break;
          const a = projected[i];
          const b = projected[j];
          const dist = Math.hypot(a.px - b.px, a.py - b.py);
          if (dist < 40) {
            const alpha = (1 - dist / 40) * 0.12 * a.scale;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = `rgba(${hexToRgb(accent)}, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      projected.forEach(({ p, px, py, scale }) => {
        const size = p.size * scale;
        const alpha = p.opacity * scale;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, size * 2);
        grd.addColorStop(0, `rgba(${hexToRgb(accent)}, ${alpha})`);
        grd.addColorStop(1, `rgba(${hexToRgb(secondary)}, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // ---- Rings ----
      rings.forEach((ring) => drawRing(ring, t));

      // ---- Pulsing outer glow ----
      const pulseAlpha = 0.04 + Math.sin(t * 2) * 0.02;
      const outerGrad = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.6);
      outerGrad.addColorStop(0, `rgba(${hexToRgb(accent)}, ${pulseAlpha})`);
      outerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize observer
    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
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
