"use client";

import React from "react";
import { motion } from "framer-motion";

const CERTIFICATIONS = [
  {
    title:  "Full Stack Java Development",
    issuer: "Simplilearn",
    year:   "2025",
    icon:   "🏆",
    badge:  "#f89820",
    link:   "/SIMPLELEARN CERTIFICATION.pdf",
  },
  {
    title:  "2nd Prize – Aerial Object Detection",
    issuer: "Paper Presentation · IoT Theme",
    year:   "2024",
    icon:   "🥈",
    badge:  "#c0c0c0",
    link:   "/PAPER PRESENTATION.pdf",
  },
];

export default function Certifications() {
  return (
    <div
      className="cyber-panel p-6 rounded-xl relative overflow-hidden h-full"
    >
      <div className="absolute top-0 right-0 w-1 h-1" style={{ background: "var(--accent-primary)" }} />

      <div
        className="pb-3 mb-4"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <h3 className="font-space text-xs font-bold uppercase tracking-widest text-glow">
          CERTIFICATIONS &amp; AWARDS
        </h3>
      </div>

      <div className="space-y-3">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {cert.link ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg group transition-all block"
                style={{ border: "1px solid var(--border-subtle)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cert.badge}40`;
                  (e.currentTarget as HTMLElement).style.background   = `${cert.badge}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.background   = "";
                }}
                aria-label={`View ${cert.title} certificate`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${cert.badge}15` }}
                >
                  {cert.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="font-space text-xs font-semibold block truncate transition-colors"
                      style={{ color: "var(--text-main)" }}
                    >
                      {cert.title}
                    </span>
                    <span
                      className="font-space text-[9px] flex-shrink-0"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {cert.year}
                    </span>
                  </div>
                  <span className="font-space text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {cert.issuer}
                  </span>
                  <div className="mt-2">
                    <span
                      className="font-space text-[9px] uppercase tracking-widest"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      VIEW CERTIFICATE →
                    </span>
                  </div>
                </div>
              </a>
            ) : (
              <div
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${cert.badge}15` }}
                >
                  {cert.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="font-space text-xs font-semibold block"
                      style={{ color: "var(--text-main)" }}
                    >
                      {cert.title}
                    </span>
                    <span
                      className="font-space text-[9px] flex-shrink-0"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {cert.year}
                    </span>
                  </div>
                  <span className="font-space text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {cert.issuer}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
