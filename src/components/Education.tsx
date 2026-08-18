"use client";

import React from "react";
import { motion } from "framer-motion";

const EDUCATION = [
  {
    year:        "2023 – 2027",
    degree:      "B.E. Computer Science & Engineering\n(Honours in Blockchain Technology)",
    institution: "Dr. N.G.P Institute of Technology",
    details:     "CGPA: 8.35 (SEM-6)",
    pdf:         "/BE CSE.pdf",
    icon:        "🎓",
  },
  {
    year:        "2021 – 2023",
    degree:      "Higher Secondary Education (HSE)",
    institution: "Sakthi Vigneswara School",
    details:     "Percentage: 84%",
    pdf:         "/HSE.pdf",
    icon:        "📚",
  },
  {
    year:        "2021",
    degree:      "SSLC",
    institution: "Sri Sai Matriculation School",
    details:     "Passed",
    pdf:         "/SSLC.pdf",
    icon:        "📝",
  },
];

export default function Education() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex items-center justify-between pb-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <h2 className="font-space text-sm font-bold uppercase tracking-widest text-glow">
          ACADEMIC TIMELINE
        </h2>
        <span className="font-space text-xs" style={{ color: "var(--text-muted)" }}>
          3 RECORDS FOUND
        </span>
      </div>

      {/* Timeline */}
      <div
        className="relative ml-4 pl-6 space-y-6"
        style={{ borderLeft: "1px solid var(--border-subtle)" }}
      >
        {EDUCATION.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative group"
          >
            {/* Timeline node */}
            <div
              className="absolute -left-[30px] top-4 w-4 h-4 rounded-full flex items-center justify-center transition-all"
              style={{
                background:   "var(--bg-card-solid, #051433)",
                border:       "2px solid var(--border-accent)",
                boxShadow:    "0 0 10px var(--glow-sm)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent-primary)" }}
              />
            </div>

            <div
              className="cyber-panel p-5 rounded-xl transition-all"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; }}
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{edu.icon}</span>
                  <span className="font-space text-xs tracking-wider" style={{ color: "var(--accent-primary)" }}>
                    {edu.year}
                  </span>
                </div>
                <span className="font-space text-[10px]" style={{ color: "var(--text-muted)" }}>
                  {edu.details}
                </span>
              </div>

              {/* Degree */}
              <h3 className="text-sm font-bold font-space mb-1 leading-snug" style={{ color: "var(--text-main)" }}>
                <a
                  href={edu.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:underline"
                  style={{ color: "inherit" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent-primary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}
                  aria-label={`View ${edu.degree} certificate`}
                >
                  {edu.degree}
                </a>
              </h3>

              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{edu.institution}</p>

              {/* Verify link */}
              <div className="mt-4 pt-3 flex justify-end" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <a
                  href={edu.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-space text-[10px] transition-colors"
                  style={{ color: "var(--accent-primary)", opacity: 0.7 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                  aria-label={`Verify ${edu.degree} credentials`}
                >
                  VERIFY CREDENTIALS
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
