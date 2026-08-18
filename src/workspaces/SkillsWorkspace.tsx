"use client";

import React from "react";
import { motion } from "framer-motion";
import Skills from "@/components/Skills";

export default function SkillsWorkspace() {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-5"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-space text-[10px] uppercase tracking-widest text-glow mb-0.5 font-bold">
              SKILL INTELLIGENCE MATRIX
            </h2>
            <h1 className="font-dm-serif text-2xl md:text-3xl font-bold" style={{ color: "var(--text-main)" }}>
              Skills Dashboard
            </h1>
          </div>
          <div
            className="font-space text-xs px-3 py-1.5 rounded-lg flex items-center gap-2"
            style={{ background: "var(--glow-xs)", border: "1px solid var(--border-accent)", color: "var(--accent-primary)" }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span>21+ Technologies</span>
          </div>
        </div>
        <div className="h-px w-full mt-3" style={{ background: "linear-gradient(90deg, var(--accent-primary), transparent)" }} />
      </motion.div>

      {/* Render full Skills component */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Skills />
      </motion.div>
    </div>
  );
}
