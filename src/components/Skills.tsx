"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RadarChart from "./RadarChart";

/* ================================================================
   SKILL CATEGORIES — 8 groups, grouped for recruiter impact
   ================================================================ */
const SKILL_CATEGORIES = [
  {
    label: "Programming",
    emoji: "⚡",
    color: "#f89820",
    skills: [
      { name: "Java", level: "Advanced", years: "3+" },
      { name: "Python", level: "Advanced", years: "3+" },
      { name: "JavaScript", level: "Advanced", years: "3+" },
      { name: "C", level: "Intermediate", years: "2+" },
      { name: "PHP", level: "Intermediate", years: "2+" },
    ],
  },
  {
    label: "AI / Machine Learning",
    emoji: "🧠",
    color: "#ee4c2c",
    skills: [
      { name: "OpenCV", level: "Advanced", years: "2+" },
      { name: "CNN Architecture", level: "Advanced", years: "2+" },
      { name: "Image Processing", level: "Advanced", years: "2+" },
      { name: "Deep Learning", level: "Intermediate", years: "1+" },
      { name: "Grad-CAM / XAI", level: "Intermediate", years: "1+" },
    ],
  },
  {
    label: "Web Development",
    emoji: "🌐",
    color: "#3776ab",
    skills: [
      { name: "HTML / CSS", level: "Expert", years: "4+" },
      { name: "Laravel", level: "Advanced", years: "2+" },
      { name: "Node.js / Express", level: "Intermediate", years: "2+" },
      { name: "Bootstrap", level: "Advanced", years: "3+" },
      { name: "React (Next.js)", level: "Intermediate", years: "1+" },
    ],
  },
  {
    label: "Databases",
    emoji: "🗄️",
    color: "#4479a1",
    skills: [
      { name: "MySQL", level: "Advanced", years: "3+" },
      { name: "PostgreSQL", level: "Intermediate", years: "2+" },
      { name: "SQL Queries & Views", level: "Advanced", years: "3+" },
      { name: "SQLite", level: "Intermediate", years: "1+" },
    ],
  },
  {
    label: "DevOps & Cloud",
    emoji: "☁️",
    color: "#2496ed",
    skills: [
      { name: "Docker", level: "Intermediate", years: "1+" },
      { name: "Kubernetes", level: "Beginner", years: "< 1" },
      { name: "Linux CLI", level: "Intermediate", years: "2+" },
      { name: "CI/CD Concepts", level: "Beginner", years: "< 1" },
    ],
  },
  {
    label: "Tools & IDEs",
    emoji: "🔧",
    color: "#f05033",
    skills: [
      { name: "Git & GitHub", level: "Advanced", years: "3+" },
      { name: "VS Code", level: "Expert", years: "4+" },
      { name: "Android Studio", level: "Intermediate", years: "1+" },
      { name: "Postman", level: "Advanced", years: "2+" },
      { name: "IntelliJ IDEA", level: "Intermediate", years: "2+" },
    ],
  },
  {
    label: "Soft Skills",
    emoji: "🤝",
    color: "#a78bfa",
    skills: [
      { name: "Problem Solving", level: "Expert", years: "" },
      { name: "Team Collaboration", level: "Advanced", years: "" },
      { name: "Technical Communication", level: "Advanced", years: "" },
      { name: "Research & Presentation", level: "Advanced", years: "" },
    ],
  },
];

const HIGHLIGHT_SKILLS = [
  { name: "Java",       value: 90 },
  { name: "Python",     value: 85 },
  { name: "JavaScript", value: 82 },
  { name: "HTML / CSS", value: 92 },
  { name: "PHP",        value: 78 },
  { name: "MySQL",      value: 88 },
];

const LEVEL_COLORS: Record<string, string> = {
  Expert: "#00ff88",
  Advanced: "#00f0ff",
  Intermediate: "#ffb703",
  Beginner: "#ff6b8a",
};

/* ================================================================
   ANIMATED SKILL BAR
   ================================================================ */
function SkillBar({ name, value }: { name: string; value: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setAnimated(true); },
      { threshold: 0.5 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="space-y-1">
      <div className="flex items-center justify-between font-space text-xs">
        <span style={{ color: "var(--text-main)" }}>{name}</span>
        <span style={{ color: "var(--accent-primary)" }}>{value}%</span>
      </div>
      <div
        className="h-1.5 rounded overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-subtle)" }}
      >
        <motion.div
          className="h-full rounded"
          initial={{ width: 0 }}
          animate={{ width: animated ? `${value}%` : 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ background: "var(--gradient-primary)", position: "relative", overflow: "hidden" }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-y-0 w-1/2 animate-shimmer"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   SKILL BADGE — single skill with level tooltip
   ================================================================ */
function SkillBadge({ skill, catColor }: { skill: { name: string; level: string; years: string }; catColor: string }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-1.5 font-space text-xs px-2.5 py-1.5 rounded-lg cursor-default transition-all duration-200 border"
        style={{
          background: hover ? `${catColor}15` : "rgba(255,255,255,0.04)",
          borderColor: hover ? `${catColor}60` : "var(--border-subtle)",
          color: hover ? catColor : "var(--text-main)",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: LEVEL_COLORS[skill.level] || "#aaa" }}
        />
        {skill.name}
      </div>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap font-space text-[9px] px-2 py-1 rounded-md pointer-events-none"
            style={{
              background: "#000",
              border: `1px solid ${LEVEL_COLORS[skill.level] || "#444"}`,
              color: LEVEL_COLORS[skill.level] || "#aaa",
              boxShadow: `0 0 8px ${LEVEL_COLORS[skill.level]}40`,
            }}
          >
            {skill.level}{skill.years ? ` · ${skill.years} yrs` : ""}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   SKILLS OVERVIEW (used on Home tab)
   ================================================================ */
export function SkillsOverview() {
  return (
    <div
      className="cyber-panel p-4 rounded-xl flex flex-col justify-between h-full"
      style={{ minHeight: "300px" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between pb-2 mb-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <h3 className="font-space text-xs font-bold uppercase tracking-widest text-glow">
          SKILLS OVERVIEW
        </h3>
        <span
          className="font-space text-[9px] px-2 py-0.5 rounded"
          style={{
            color: "var(--accent-primary)",
            border: "1px solid var(--border-subtle)",
            background: "var(--glow-xs)",
          }}
        >
          21+ Technologies
        </span>
      </div>

      <div className="flex flex-row items-center gap-4 flex-grow min-h-0">
        {/* Progress bars */}
        <div className="flex-1 space-y-3 pr-2 min-w-0">
          {HIGHLIGHT_SKILLS.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} value={skill.value} />
          ))}
        </div>

        {/* Radar chart */}
        <div className="w-[200px] h-[200px] flex-shrink-0 flex items-center justify-center">
          <RadarChart />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FULL SKILLS PAGE
   ================================================================ */
type FilterType = "All" | string;

export default function Skills() {
  const [filter, setFilter] = useState<FilterType>("All");
  const filterOptions = ["All", ...SKILL_CATEGORIES.map((c) => c.label)];

  const visibleCategories =
    filter === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.label === filter);

  const totalSkills = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <div className="space-y-6">
      {/* Header strip */}
      <div className="cyber-panel rounded-xl p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="font-space text-[10px] uppercase tracking-widest text-glow mb-1 font-bold">
              SKILL INTELLIGENCE MATRIX
            </div>
            <h2 className="font-dm-serif text-2xl font-bold" style={{ color: "var(--text-main)" }}>
              Technical Capabilities
            </h2>
            <p className="font-space text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {totalSkills}+ individual skills across {SKILL_CATEGORIES.length} domains · Hover any skill for proficiency level
            </p>
          </div>
          {/* Level legend */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(LEVEL_COLORS).map(([lvl, col]) => (
              <div key={lvl} className="flex items-center gap-1.5 font-space text-[9px]" style={{ color: "var(--text-muted)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: col }} />
                {lvl}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview card with progress bars + radar */}
      <SkillsOverview />

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            aria-pressed={filter === opt}
            className="font-space text-[10px] px-3 py-1.5 rounded-lg transition-all duration-200 font-bold"
            style={{
              color: filter === opt ? "var(--bg-base)" : "var(--text-muted)",
              background: filter === opt ? "var(--accent-primary)" : "var(--glow-xs)",
              border: `1px solid ${filter === opt ? "var(--accent-primary)" : "var(--border-subtle)"}`,
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((cat, idx) => (
            <motion.div
              key={cat.label}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="cyber-panel p-5 rounded-xl relative overflow-hidden group"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}50`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ background: cat.color }}
              />

              {/* Header */}
              <div className="flex items-center gap-2 mb-4 pl-2">
                <span className="text-lg">{cat.emoji}</span>
                <div>
                  <div className="font-space text-[10px] uppercase tracking-widest font-bold" style={{ color: cat.color }}>
                    {cat.label}
                  </div>
                  <div className="font-space text-[9px]" style={{ color: "var(--text-muted)" }}>
                    {cat.skills.length} skills
                  </div>
                </div>
              </div>

              {/* Skills badges grid */}
              <div className="flex flex-wrap gap-1.5 pl-2">
                {cat.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} catColor={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
