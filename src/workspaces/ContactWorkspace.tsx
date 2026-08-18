"use client";

import React from "react";
import { motion } from "framer-motion";
import Contact from "@/components/Contact";

export default function ContactWorkspace() {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-space text-[10px] uppercase tracking-widest text-glow mb-0.5 font-bold">
              CONNECTIVITY PORTAL
            </h2>
            <h1 className="font-dm-serif text-2xl md:text-3xl font-bold" style={{ color: "var(--text-main)" }}>
              Contact Dashboard
            </h1>
          </div>
          {/* Availability pulse badge */}
          <div
            className="font-space text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 flex-shrink-0"
            style={{
              background: "rgba(0,255,136,0.1)",
              border: "1px solid rgba(0,255,136,0.3)",
              color: "#00ff88",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            <span className="font-bold">AVAILABLE FOR HIRE — IMMEDIATE JOIN</span>
          </div>
        </div>
        <div className="h-px w-full mt-3" style={{ background: "linear-gradient(90deg, var(--accent-primary), transparent)" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Contact />
      </motion.div>
    </div>
  );
}
