"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "INITIALIZING PORTFOLIO...",         delay: 0 },
  { text: "Loading Core Design System...",     delay: 300 },
  { text: "Loading Selected Work...",          delay: 550 },
  { text: "Loading Skill Intelligence...",     delay: 750 },
  { text: "Connecting GitHub Registry...",     delay: 950 },
  { text: "Loading Research Timelines...",     delay: 1150 },
  { text: "SYSTEM READY",                      delay: 1350 },
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visible,     setVisible]     = useState(true);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress,    setProgress]    = useState(0);
  const [welcome,     setWelcome]     = useState(false);

  const handleComplete = useCallback(() => {
    setVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("boot-seen", "1");
    }
    setTimeout(onComplete, 500);
  }, [onComplete]);

  useEffect(() => {
    // Show each line with its delay
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
        }, line.delay)
      );
    });

    // Progress bar – 0→100 over 1800ms
    const start = performance.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Welcome flash
    timers.push(setTimeout(() => setWelcome(true), 1600));

    // Auto-dismiss after 2.5 s
    timers.push(setTimeout(handleComplete, 2500));

    return () => timers.forEach(clearTimeout);
  }, [handleComplete]);

  const skip = () => {
    setVisible(false);
    if (typeof window !== "undefined") localStorage.setItem("boot-seen", "1");
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "var(--bg-base)" }}
          aria-label="Loading portfolio"
          role="status"
        >
          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, var(--glow-xs) 0%, transparent 70%)" }}
          />

          {/* Content */}
          <div className="relative z-10 w-full max-w-lg px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div
                    className="absolute inset-0 border rotate-45 rounded-sm animate-pulse-slow"
                    style={{ borderColor: "var(--accent-primary)" }}
                  />
                  <div
                    className="absolute inset-1.5 border -rotate-45 rounded-sm"
                    style={{ borderColor: "var(--accent-secondary)" }}
                  />
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "var(--accent-primary)", boxShadow: "0 0 8px var(--accent-primary)" }}
                  />
                </div>
                <span
                  className="font-space text-2xl font-bold tracking-[0.25em]"
                  style={{ color: "var(--accent-primary)" }}
                >
                  SOWNDHARYA P.L.
                </span>
              </div>
              <p className="font-space text-[10px] tracking-[0.4em]" style={{ color: "var(--text-muted)" }}>
                AI-ENGINEER PORTFOLIO v2.0
              </p>
            </motion.div>

            {/* Boot lines */}
            <div className="space-y-1.5 mb-8 min-h-[140px]">
              {BOOT_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleLines.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 font-space text-xs"
                    >
                      <span style={{ color: "var(--accent-primary)" }}>›</span>
                      <span
                        style={{
                          color:
                            i === BOOT_LINES.length - 1
                              ? "var(--accent-primary)"
                              : visibleLines[visibleLines.length - 1] === i
                              ? "var(--text-main)"
                              : "var(--text-muted)",
                        }}
                      >
                        {line.text}
                      </span>
                      {i < visibleLines.length - 1 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="ml-auto text-[10px]"
                          style={{ color: "#39ff14" }}
                        >
                          ✓ OK
                        </motion.span>
                      )}
                      {i === visibleLines[visibleLines.length - 1] && i < BOOT_LINES.length - 1 && (
                        <span
                          className="ml-auto font-space text-[10px] animate-pulse-slow"
                          style={{ color: "var(--accent-primary)" }}
                        >
                          ...
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Progress bar */}
            <div
              className="relative h-0.5 rounded overflow-hidden mb-3"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded"
                style={{
                  width: `${progress}%`,
                  background: "var(--gradient-primary)",
                  transition: "width 0.05s linear",
                }}
              />
              {/* Shimmer on bar */}
              <div
                className="absolute inset-y-0 w-1/3 rounded animate-shimmer"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
              />
            </div>

            <div className="flex items-center justify-between font-space text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>{progress}% LOADED</span>
              <button
                onClick={skip}
                className="transition-colors hover:opacity-100 opacity-60 uppercase tracking-widest focus:outline-none"
                style={{ color: "var(--accent-primary)" }}
                aria-label="Skip boot animation"
              >
                Skip →
              </button>
            </div>

            {/* WELCOME flash */}
            <AnimatePresence>
              {welcome && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center mt-8 font-space font-bold text-2xl tracking-[0.5em]"
                  style={{ color: "var(--accent-primary)", textShadow: "0 0 20px var(--glow-md)" }}
                >
                  WELCOME
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
