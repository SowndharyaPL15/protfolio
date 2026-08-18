"use client";

import React from "react";
import { motion } from "framer-motion";

const POINTS = [
  "Built responsive user interfaces using HTML, CSS, JavaScript, and Bootstrap.",
  "Developed backend application logic using PHP.",
  "Implemented CRUD operations for dynamic, real-time data management.",
  "Worked with relational databases to design structured data storage solutions.",
  "Debugged and rigorously tested applications to ensure software reliability.",
];

export default function Internship() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-panel p-6 rounded-xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-1" style={{ background: "var(--accent-primary)" }} />

      <div className="space-y-4">
        {/* Header */}
        <div
          className="flex items-center justify-between pb-2"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <h3 className="font-space text-xs font-bold uppercase tracking-widest text-glow">
            PROFESSIONAL EXPERIENCE
          </h3>
          <span
            className="font-space text-[9px] font-semibold px-2 py-0.5 rounded uppercase"
            style={{
              color:      "var(--accent-primary)",
              background: "var(--glow-xs)",
              border:     "1px solid var(--border-subtle)",
            }}
          >
            15 Days Intern
          </span>
        </div>

        {/* Role & Company */}
        <div>
          <a
            href="/INTERNSHIP.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-bold font-space transition-colors"
            style={{ color: "var(--text-main)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-main)"; }}
          >
            Software Development Intern
          </a>
          <p className="font-space text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            Mist Software Solutions · Coimbatore, India
          </p>
        </div>

        {/* All 5 bullets */}
        <ul className="space-y-2">
          {POINTS.map((pt, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.07 }}
              className="flex gap-2 items-start text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: "var(--accent-primary)" }}
              />
              {pt}
            </motion.li>
          ))}
        </ul>

        {/* Certificate link */}
        <div className="pt-3 flex justify-end" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <a
            href="/INTERNSHIP.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-space text-[10px] transition-colors"
            style={{ color: "var(--accent-primary)" }}
            aria-label="View internship certificate"
          >
            INTERNSHIP CERTIFICATE
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
