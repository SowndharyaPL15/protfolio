"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectDetailModalProps {
  project: {
    num: string;
    title: string;
    desc: string;
    problem?: string;
    architecture?: string;
    workflow?: string[];
    features: string[];
    tags: string[];
    github: string | null;
    demo?: string | null;
    images?: string[];
    badge?: string;
    challenges?: string;
    future?: string;
    personalContribution?: string;
    results?: string;
  } | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl max-h-[90vh] cyber-panel rounded-2xl p-6 overflow-y-auto flex flex-col relative shadow-[0_0_30px_rgba(0,199,183,0.3)]"
          style={{ background: "var(--bg-base)", border: "1px solid var(--border-accent)" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-main hover:border-[var(--accent-primary)] hover:bg-[rgba(0,199,183,0.1)] transition-all"
            aria-label="Close project modal"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-4 pr-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-space text-[10px] px-2 py-0.5 rounded bg-[var(--glow-sm)] text-[var(--accent-primary)] font-bold">
                {project.num}
              </span>
              {project.badge && (
                <span className="font-space text-[10px] px-2 py-0.5 rounded bg-[rgba(255,183,3,0.15)] text-[#ffb703] border border-[#ffb703]/30 font-bold">
                  {project.badge}
                </span>
              )}
            </div>
            <h1 className="font-dm-serif text-2xl md:text-3xl font-bold text-main">
              {project.title}
            </h1>
            <p className="font-space text-xs text-[var(--text-muted)] mt-1">
              {project.desc}
            </p>
          </div>

          {/* Main Screenshot Preview */}
          {project.images && project.images.length > 0 && (
            <div className="w-full h-56 md:h-72 rounded-xl overflow-hidden mb-6 border border-[var(--border-subtle)] relative" style={{ background: "var(--bg-surface)" }}>
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Grid Content: Problem & Solution + Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Problem & Solution */}
            {project.problem && (
              <div className="cyber-panel p-4 rounded-xl space-y-2">
                <div className="font-space text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                  🎯 Problem &amp; Solution
                </div>
                <p className="font-space text-xs text-[var(--text-muted)] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Architecture */}
            {project.architecture && (
              <div className="cyber-panel p-4 rounded-xl space-y-2">
                <div className="font-space text-xs uppercase tracking-widest text-[var(--accent-secondary)] font-bold">
                  ⚙️ System Architecture Diagram
                </div>
                <div className="font-space text-[11px] p-3 rounded border border-[var(--border-subtle)] text-[var(--accent-primary)] font-bold leading-relaxed" style={{ background: "var(--bg-surface)" }}>
                  {project.architecture}
                </div>
              </div>
            )}
          </div>

          {/* What I Personally Built & Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {project.personalContribution && (
              <div className="cyber-panel p-4 rounded-xl space-y-2" style={{ borderLeft: "3px solid #39ff14" }}>
                <div className="font-space text-xs uppercase tracking-widest text-[#39ff14] font-bold">
                  🛠️ What I Personally Built
                </div>
                <p className="font-space text-xs text-[var(--text-muted)] leading-relaxed">
                  {project.personalContribution}
                </p>
              </div>
            )}

            {project.results && (
              <div className="cyber-panel p-4 rounded-xl space-y-2" style={{ borderLeft: "3px solid #ffb703" }}>
                <div className="font-space text-xs uppercase tracking-widest text-[#ffb703] font-bold">
                  📈 Measurable Results &amp; Outcomes
                </div>
                <p className="font-space text-xs text-[var(--text-muted)] leading-relaxed">
                  {project.results}
                </p>
              </div>
            )}
          </div>

          {/* Features & Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="cyber-panel p-4 rounded-xl space-y-2">
              <div className="font-space text-xs uppercase tracking-widest text-main font-bold mb-2">
                🚀 Key Features
              </div>
              <ul className="space-y-1.5 font-space text-xs text-[var(--text-muted)]">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[var(--accent-primary)]">✔</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            {project.workflow && (
              <div className="cyber-panel p-4 rounded-xl space-y-2">
                <div className="font-space text-xs uppercase tracking-widest text-main font-bold mb-2">
                  🔄 Execution Workflow
                </div>
                <ol className="space-y-1.5 font-space text-xs text-[var(--text-muted)] list-decimal list-inside">
                  {project.workflow.map((step, idx) => (
                    <li key={idx} className="leading-snug">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Challenges & Roadmap */}
          {(project.challenges || project.future) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {project.challenges && (
                <div className="cyber-panel p-4 rounded-xl space-y-1">
                  <div className="font-space text-[10px] uppercase tracking-widest text-[#ff6b8a] font-bold">
                    ⚡ Key Technical Challenge
                  </div>
                  <p className="font-space text-xs text-[var(--text-muted)] leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}
              {project.future && (
                <div className="cyber-panel p-4 rounded-xl space-y-1">
                  <div className="font-space text-[10px] uppercase tracking-widest text-[#00ff88] font-bold">
                    🔮 Future Roadmap
                  </div>
                  <p className="font-space text-xs text-[var(--text-muted)] leading-relaxed">
                    {project.future}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mb-6">
            <div className="font-space text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 font-bold">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="font-space text-xs px-2.5 py-1 rounded-full border border-[var(--border-accent)] bg-[var(--glow-xs)] text-[var(--accent-primary)] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="font-space text-xs px-4 py-2 rounded-lg bg-[var(--accent-secondary)] text-black font-bold hover:brightness-110 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="font-space text-xs px-4 py-2 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:bg-[var(--glow-xs)] text-main font-bold transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                View Repository
              </a>
            )}
            <button
              onClick={onClose}
              className="font-space text-xs px-5 py-2 rounded-lg bg-[var(--accent-primary)] text-black font-bold hover:brightness-110 transition-all"
            >
              Close Workspace
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
