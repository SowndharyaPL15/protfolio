"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface ProjectData {
  num:       string;
  title:     string;
  desc:      string;
  features:  string[];
  tags:      string[];
  github:    string | null;
  demo?:     string | null;
  images?:   string[];        // paths under /public/projects/
  badge?:    string;          // e.g. "IoT Research", "AI/ML"
}

interface ProjectCardProps {
  project:   ProjectData;
  index?:    number;
}

const TAG_COLORS: Record<string, string> = {
  "Python":     "#3776ab",
  "Java":       "#f89820",
  "JavaScript": "#f7df1e",
  "TypeScript": "#3178c6",
  "PHP":        "#777bb4",
  "HTML":       "#e44d26",
  "CSS":        "#1572b6",
  "Laravel":    "#ff2d20",
  "Docker":     "#2496ed",
  "Kubernetes": "#326ce5",
  "PyTorch":    "#ee4c2c",
  "OpenCV":     "#5c3ee8",
  "Arduino":    "#00979d",
  "Android":    "#3ddc84",
  "MySQL":      "#4479a1",
  "PostgreSQL": "#336791",
  "Redis":      "#dc382d",
  "Node.js":    "#339933",
  "FastAPI":    "#009688",
  "React":      "#61dafb",
  "TensorFlow": "#ff6f00",
  "DenseNet":   "#0284c7",
  "Grad-CAM":   "#10b981",
  "FAISS":      "#8b5cf6",
  "LangChain":  "#10b981",
  "LangGraph":  "#f59e0b",
  "Express":    "#68a063",
  "Express.js": "#68a063",
  "Tailwind CSS": "#38bdf8",
  "Recharts":   "#8884d8",
};

/** A screenshot placeholder shown when no image file is available */
function ScreenshotPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 rounded-lg"
      aria-label={`Screenshot placeholder for ${title}`}
      style={{
        background: "linear-gradient(135deg, var(--bg-card), var(--bg-surface))",
        border: "1px dashed var(--border-subtle)",
        minHeight: "140px",
      }}
    >
      <svg className="w-8 h-8 opacity-30" style={{ color: "var(--accent-primary)" }}
        fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
      <p className="font-space text-[9px] uppercase tracking-widest opacity-30" style={{ color: "var(--text-muted)" }}>
        Screenshot Coming Soon
      </p>
    </div>
  );
}

/** Image carousel for a project (if multiple images) */
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  if (imgError[current] || images.length === 0) {
    return <ScreenshotPlaceholder title={title} />;
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden project-image-wrap group/img" style={{ minHeight: "140px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[current]}
        alt={`${title} screenshot ${current + 1}`}
        className="w-full h-36 object-cover"
        onError={() => setImgError((prev) => ({ ...prev, [current]: true }))}
        loading="lazy"
      />

      {/* Glassmorphism overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, var(--bg-base) 100%)",
        }}
      />

      {/* Carousel controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
            style={{ background: "rgba(0,0,0,0.6)", color: "var(--accent-primary)" }}
            aria-label="Previous image"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
            style={{ background: "rgba(0,0,0,0.6)", color: "var(--accent-primary)" }}
            aria-label="Next image"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  background: i === current ? "var(--accent-primary)" : "rgba(255,255,255,0.3)",
                  transform: i === current ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const hasImages = (project.images ?? []).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.1), ease: "easeOut" }}
      className="h-full"
    >
      <div
        className="cyber-panel rounded-xl overflow-hidden relative group h-full flex flex-col transition-all duration-200 hover:border-[var(--border-accent)] hover:shadow-[0_0_20px_var(--glow-sm)] hover:-translate-y-0.5"
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-1 h-1"
          style={{ background: "var(--accent-primary)" }}
        />

        {/* Image / placeholder */}
        <div className="p-3 pb-0">
          {hasImages ? (
            <ImageCarousel images={project.images!} title={project.title} />
          ) : (
            <ScreenshotPlaceholder title={project.title} />
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Number + badge */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="font-space text-[10px] tracking-wider"
              style={{ color: "var(--accent-primary)" }}
            >
              {project.num}
            </span>
            {project.badge && (
              <span
                className="font-space text-[9px] font-semibold px-2 py-0.5 rounded uppercase"
                style={{
                  color: "var(--accent-tertiary)",
                  background: "rgba(57,255,20,0.06)",
                  border: "1px solid rgba(57,255,20,0.2)",
                }}
              >
                {project.badge}
              </span>
            )}
            {project.github && !project.badge && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-40 hover:opacity-90 transition-opacity"
                style={{ color: "var(--accent-primary)" }}
                aria-label={`View ${project.title} on GitHub`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-sm font-bold mb-1.5 font-space leading-snug transition-colors line-clamp-2 h-[2.5rem] overflow-hidden"
            style={{ color: "var(--text-main)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-xs leading-relaxed mb-3 line-clamp-2 h-[2.25rem] overflow-hidden"
            style={{ color: "var(--text-muted)" }}
          >
            {project.desc}
          </p>

          {/* Features */}
          <ul className="space-y-1 mb-3 h-[3.75rem] overflow-hidden">
            {project.features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent-primary)" }}
                />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div
            className="flex flex-wrap gap-1.5 pt-3 mt-auto h-[3.25rem] overflow-hidden"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="font-space text-[9px] px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  color: TAG_COLORS[tag] ?? "var(--text-muted)",
                  background: TAG_COLORS[tag]
                    ? `${TAG_COLORS[tag]}15`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${TAG_COLORS[tag] ? `${TAG_COLORS[tag]}30` : "var(--border-subtle)"}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[10px] font-space font-semibold tracking-wider transition-all hover:scale-[1.02]"
                style={{ color: "var(--accent-primary)" }}
                aria-label={`View ${project.title} on GitHub`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
            ) : (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[10px] font-space font-semibold tracking-wider opacity-40 cursor-not-allowed"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
                aria-label="GitHub repository unavailable for this project"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub (N/A)
              </button>
            )}

            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[10px] font-space font-semibold tracking-wider transition-all hover:scale-[1.02]"
                style={{ color: "var(--accent-secondary)" }}
                aria-label={`View live demo for ${project.title}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Live Demo
              </a>
            ) : (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[10px] font-space font-semibold tracking-wider opacity-40 cursor-not-allowed"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
                aria-label="Live demo unavailable for this project"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Demo (N/A)
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
