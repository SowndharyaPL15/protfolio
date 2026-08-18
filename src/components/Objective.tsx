"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FULL_TEXT =
  "To contribute effectively to an organization by applying my technical knowledge in AI engineering and full-stack development — maintaining high professional standards, continuously improving my skills, and delivering meaningful, impactful solutions that solve real-world problems.";

export default function Objective() {
  const [displayed, setDisplayed] = useState("");
  const [done,      setDone]      = useState(false);
  const [started,   setStarted]   = useState(false);

  // Start only after mount
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || done) return;
    if (displayed.length >= FULL_TEXT.length) {
      setDone(true);
      return;
    }
    const id = setTimeout(() => {
      setDisplayed(FULL_TEXT.slice(0, displayed.length + 1));
    }, 22);
    return () => clearTimeout(id);
  }, [started, displayed, done]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-panel p-5 rounded-xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-1" style={{ background: "var(--accent-primary)" }} />

      <div className="pb-2 mb-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <h3 className="font-space text-xs font-bold uppercase tracking-widest text-glow">
          CAREER OBJECTIVE
        </h3>
      </div>

      <p
        className="text-xs md:text-sm leading-relaxed"
        style={{ color: "var(--text-muted)", minHeight: "4rem" }}
        aria-live="polite"
        aria-label="Career objective"
      >
        {displayed}
        {!done && (
          <span
            className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
            style={{ background: "var(--accent-primary)", verticalAlign: "middle" }}
            aria-hidden="true"
          />
        )}
      </p>
    </motion.div>
  );
}
