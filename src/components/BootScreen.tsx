"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "INITIALIZING PORTFOLIO...",         delay: 0 },
  { text: "Loading Core Design System...",     delay: 80 },
  { text: "Loading Selected Work...",          delay: 160 },
  { text: "Loading Skill Intelligence...",     delay: 240 },
  { text: "Connecting GitHub Registry...",     delay: 320 },
  { text: "Loading Research Timelines...",     delay: 400 },
  { text: "SYSTEM READY",                      delay: 480 },
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visible, setVisible] = useState(true);
  const [visibleLines, setVisibleLines] = useState<number[]>([0]);
  const [progress, setProgress] = useState(20);
  const [welcome, setWelcome] = useState(false);

  const handleComplete = useCallback(() => {
    setVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("boot-seen", "1");
    }
    setTimeout(onComplete, 200);
  }, [onComplete]);

  const skip = useCallback(() => {
    setVisible(false);
    if (typeof window !== "undefined") localStorage.setItem("boot-seen", "1");
    setTimeout(onComplete, 100);
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Show each line with faster delay
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => (prev.includes(i) ? prev : [...prev, i]));
          setProgress(Math.min(100, Math.round(((i + 1) / BOOT_LINES.length) * 100)));
        }, line.delay)
      );
    });

    // Welcome flash
    timers.push(setTimeout(() => setWelcome(true), 550));

    // Auto-dismiss fast
    timers.push(setTimeout(handleComplete, 850));

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        skip();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleComplete, skip]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={skip}
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
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
          <div className="relative z-10 w-full max-w-lg px-8 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="relative w-9 h-9 flex items-center justify-center">
                  <div
                    className="absolute inset-0 border rotate-45 rounded-sm animate-pulse-slow"
                    style={{ borderColor: "var(--accent-primary)" }}
                  />
                  <div
                    className="absolute inset-1.5 border -rotate-45 rounded-sm"
                    style={{ borderColor: "var(--accent-secondary)" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--accent-primary)", boxShadow: "0 0 8px var(--accent-primary)" }}
                  />
                </div>
                <span
                  className="font-space text-xl font-bold tracking-[0.25em]"
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
            <div className="space-y-1.5 mb-6 min-h-[140px]">
              {BOOT_LINES.map((line, i) => (
                <div key={i}>
                  {visibleLines.includes(i) && (
                    <div className="flex items-center gap-2 font-space text-xs">
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
                        <span className="ml-auto text-[10px]" style={{ color: "#39ff14" }}>
                          ✓ OK
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div
              className="relative h-0.5 rounded overflow-hidden mb-3"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded transition-all duration-150"
                style={{
                  width: `${progress}%`,
                  background: "var(--gradient-primary)",
                }}
              />
            </div>

            <div className="flex items-center justify-between font-space text-[10px]" style={{ color: "var(--text-muted)" }}>
              <span>{progress}% READY</span>
              <button
                onClick={skip}
                className="transition-colors hover:opacity-100 opacity-75 uppercase tracking-widest focus:outline-none"
                style={{ color: "var(--accent-primary)" }}
                aria-label="Skip boot animation"
              >
                Skip [Space] →
              </button>
            </div>

            {/* WELCOME flash */}
            <AnimatePresence>
              {welcome && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-center mt-6 font-space font-bold text-2xl tracking-[0.5em]"
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
