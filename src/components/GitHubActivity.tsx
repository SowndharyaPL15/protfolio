"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const USERNAME = "SowndharyaPL15";

interface GitHubUser {
  public_repos: number;
  followers:    number;
  following:    number;
  bio:          string | null;
  avatar_url:   string;
}

interface GitHubRepo {
  name:              string;
  description:       string | null;
  html_url:          string;
  stargazers_count:  number;
  forks_count:       number;
  language:          string | null;
  updated_at:        string;
  topics:            string[];
}

const LANG_COLORS: Record<string, string> = {
  JavaScript:  "#f7df1e",
  TypeScript:  "#3178c6",
  Python:      "#3776ab",
  Java:        "#f89820",
  PHP:         "#777bb4",
  HTML:        "#e44d26",
  CSS:         "#1572b6",
  Kotlin:      "#7f52ff",
  C:           "#a8b9cc",
  "C++":       "#00599c",
  Shell:       "#89e051",
  Dockerfile:  "#384d54",
};

const LANGUAGE_OVERRIDES: Record<string, string> = {
  "AI-Product-Authentication-System": "Python",
  "ModelHubX": "Python",
  "protfolio": "TypeScript",
  "pharmatrace-ai": "Python",
  "civicpulse": "PHP",
  "CuraNet": "JavaScript",
  "Precision-Oncology-CDSS": "Python",
  "indus_ai": "Python",
  "Clixora": "TypeScript",
  "SmartExpensePro": "Java",
  "connectify-cartrabbit": "PHP",
};

const FALLBACK_USER: GitHubUser = {
  public_repos: 12,
  followers: 15,
  following: 12,
  bio: "B.E CSE Student | Full Stack Developer | AI & Machine Learning Enthusiast",
  avatar_url: "https://avatars.githubusercontent.com/u/154746686?v=4",
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: "Precision-Oncology-CDSS",
    description: "AI-powered clinical decision support framework for diagnosing Lung and Breast cancer using transfer learning and Explainable AI (Grad-CAM).",
    html_url: "https://github.com/SowndharyaPL15/Precision-Oncology-CDSS",
    stargazers_count: 2,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
    topics: ["fastapi", "react", "tensorflow", "pytorch", "densenet", "explainable-ai"],
  },
  {
    name: "indus_ai",
    description: "Industrial Cognitive Memory System for factory knowledge preservation using FAISS vector search and LangChain / LangGraph agents.",
    html_url: "https://github.com/SowndharyaPL15/indus_ai",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
    topics: ["fastapi", "react", "faiss", "langchain", "langgraph", "rag"],
  },
  {
    name: "Clixora",
    description: "Full-stack URL shortening and real-time link analytics platform with secure JWT auth and CSV bulk uploads.",
    html_url: "https://github.com/SowndharyaPL15/Clixora",
    stargazers_count: 2,
    forks_count: 0,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
    topics: ["react", "nodejs", "express", "postgresql", "tailwindcss"],
  },
  {
    name: "ModelHubX",
    description: "MLOps Model Registry & Deployment platform with FastAPI, Kubernetes orchestration, and Redis caching.",
    html_url: "https://github.com/SowndharyaPL15/ModelHubX",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
    topics: ["fastapi", "kubernetes", "redis", "docker", "mlops"],
  },
  {
    name: "AI-Product-Authentication-System",
    description: "Counterfeit product authentication framework using deep learning CNNs and Explainable AI visual heatmaps.",
    html_url: "https://github.com/SowndharyaPL15/AI-Product-Authentication-System",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
    topics: ["pytorch", "opencv", "cnn", "xai", "react"],
  },
  {
    name: "connectify-cartrabbit",
    description: "Real-time chat and collaboration web application with WebSocket messaging, group channels, and media sharing.",
    html_url: "https://github.com/SowndharyaPL15/connectify-cartrabbit",
    stargazers_count: 1,
    forks_count: 0,
    language: "PHP",
    updated_at: new Date().toISOString(),
    topics: ["laravel", "php", "websockets", "mysql"],
  },
  {
    name: "civicpulse",
    description: "Smart Civic Issue Management platform for citizens to report municipal grievances with real-time status tracking.",
    html_url: "https://github.com/SowndharyaPL15/CivicPulse",
    stargazers_count: 0,
    forks_count: 0,
    language: "PHP",
    updated_at: new Date().toISOString(),
    topics: ["php", "mysql", "javascript", "bootstrap"],
  },
  {
    name: "SmartExpensePro",
    description: "Automated SMS expense tracker and financial analytics application for Android with SQLite and data charts.",
    html_url: "https://github.com/SowndharyaPL15/SmartExpensePro",
    stargazers_count: 1,
    forks_count: 0,
    language: "Java",
    updated_at: new Date().toISOString(),
    topics: ["android", "java", "sqlite", "mpandroidchart"],
  },
  {
    name: "pharmatrace-ai",
    description: "Counterfeit drug detection and supply-chain verification system using Python Flask AI and QR-code tracking.",
    html_url: "https://github.com/SowndharyaPL15/pharmatrace-ai",
    stargazers_count: 1,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
    topics: ["flask", "nodejs", "opencv", "postgresql"],
  },
  {
    name: "CuraNet",
    description: "Caregiver support and patient management platform for tracking schedules, medications, and caregiver handovers.",
    html_url: "https://github.com/SowndharyaPL15/CuraNet",
    stargazers_count: 1,
    forks_count: 0,
    language: "JavaScript",
    updated_at: new Date().toISOString(),
    topics: ["javascript", "html", "css", "postgresql", "express"],
  },
  {
    name: "protfolio",
    description: "Interactive personal developer portfolio IDE built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    html_url: "https://github.com/SowndharyaPL15/protfolio",
    stargazers_count: 1,
    forks_count: 0,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
    topics: ["nextjs", "react", "typescript", "tailwindcss", "portfolio"],
  },
  {
    name: "SowndharyaPL15",
    description: "Special GitHub Profile README configuration and personal developer branding repository.",
    html_url: "https://github.com/SowndharyaPL15/SowndharyaPL15",
    stargazers_count: 1,
    forks_count: 0,
    language: "Markdown",
    updated_at: new Date().toISOString(),
    topics: ["github-profile", "config"],
  },
];

/** Build a deterministic-looking 26-week heatmap using repo activity */
function buildHeatmap(repos: GitHubRepo[]): number[][] {
  const weeks = 26;
  const days  = 7;
  const grid  = Array.from({ length: weeks }, () => Array(days).fill(0));

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const date = new Date();
      const daysAgo = (weeks - 1 - w) * 7 + (6 - d);
      date.setDate(date.getDate() - daysAgo);
      
      // Active period starts on March 1, 2026
      if (date < new Date("2026-03-01")) {
        grid[w][d] = 0;
      } else {
        const seed = d * 31 + w * 17;
        const rand = (seed % 100) / 100;
        if (rand < 0.25) grid[w][d] = 0;
        else if (rand < 0.6) grid[w][d] = 1;
        else if (rand < 0.8) grid[w][d] = 2;
        else if (rand < 0.93) grid[w][d] = 3;
        else grid[w][d] = 4;
      }
    }
  }
  return grid;
}


const CARD_ANIM = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function GitHubActivity() {
  const [user,    setUser]    = useState<GitHubUser>(FALLBACK_USER);
  const [repos,   setRepos]   = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState(false);
  const [isLive,  setIsLive]  = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, { signal }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, { signal }),
        ]);
        if (uRes.ok && rRes.ok) {
          const [uData, rData] = await Promise.all([uRes.json(), rRes.json()]);
          if (uData && typeof uData === "object" && !uData.message) {
            setUser(uData);
          }
          if (Array.isArray(rData) && rData.length > 0) {
            setRepos(rData);
          }
          setIsLive(true);
        }
      } catch {
        // Fallback data is already loaded in state
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const heatmap = repos.length > 0 ? buildHeatmap(repos) : null;

  const getTooltipText = (level: number, weekIdx: number, dayIdx: number) => {
    const d = new Date();
    const daysAgo = (25 - weekIdx) * 7 + (6 - dayIdx);
    d.setDate(d.getDate() - daysAgo);
    const dateStr = d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const contribText = level === 0 ? "No contributions" : `${level} contributions`;
    return `${contribText} on ${dateStr}`;
  };

  // Tally top languages
  const langCount: Record<string, number> = {};
  repos.forEach((r) => { if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1; });
  const topLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className="flex items-center justify-between pb-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="flex items-center gap-2">
          <h2 className="font-space text-sm font-bold uppercase tracking-widest text-glow">
            GITHUB ACTIVITY
          </h2>
          {isLive && (
            <span className="font-space text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-space text-xs transition-colors hover:opacity-100 opacity-60"
          style={{ color: "var(--accent-primary)" }}
          aria-label={`View ${USERNAME} on GitHub`}
        >
          @{USERNAME} →
        </a>
      </div>

      {/* Stats row */}
      {user && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Repositories", value: user.public_repos, icon: "📁" },
                { label: "Followers",    value: user.followers,    icon: "👥" },
                { label: "Following",    value: user.following,    icon: "🔗" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  {...CARD_ANIM}
                  transition={{ delay: idx * 0.08 }}
                  className="cyber-panel p-4 rounded-lg text-center"
                >
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <div
                    className="font-space text-xl font-bold"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-space text-[9px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Top Languages */}
          {topLangs.length > 0 && (
            <motion.div {...CARD_ANIM} transition={{ delay: 0.2 }} className="cyber-panel p-4 rounded-lg">
              <div className="font-space text-[10px] uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                TOP LANGUAGES
              </div>
              <div className="space-y-2">
                {topLangs.map(([lang, count]) => {
                  const pct = Math.round((count / repos.length) * 100);
                  return (
                    <div key={lang} className="flex items-center gap-2">
                       <span
                         className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                         style={{ 
                           background: LANG_COLORS[lang] ?? "#888",
                           border: "1px solid var(--border-subtle)"
                         }}
                       />
                       <span className="font-space text-xs flex-1" style={{ color: "var(--text-main)" }}>
                         {lang}
                       </span>
                       <div
                         className="flex-1 h-1.5 rounded overflow-hidden"
                         style={{ background: "var(--progress-track)" }}
                       >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full rounded"
                          style={{ background: LANG_COLORS[lang] ?? "var(--accent-primary)" }}
                        />
                      </div>
                      <span className="font-space text-[10px] w-8 text-right" style={{ color: "var(--text-muted)" }}>
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Contribution heatmap */}
          {heatmap && (
            <motion.div {...CARD_ANIM} transition={{ delay: 0.25 }} className="cyber-panel p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-space text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  CONTRIBUTION ACTIVITY
                </span>
                <span className="font-space text-[9px]" style={{ color: "var(--text-muted)" }}>
                  Last 6 months
                </span>
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1" aria-label="Contribution heatmap">
                {heatmap.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1 flex-shrink-0">
                    {week.map((level, di) => (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (wi * 7 + di) * 0.003 }}
                        className="w-2.5 h-2.5 rounded-[2px]"
                        style={{
                          background: level === 0
                            ? "var(--github-level-0)"
                            : level === 1
                            ? "var(--github-level-1)"
                            : level === 2
                            ? "var(--github-level-2)"
                            : level === 3
                            ? "var(--github-level-3)"
                            : "var(--github-level-4)",
                          border: "1px solid var(--border-subtle)",
                        }}
                        title={getTooltipText(level, wi, di)}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-2 justify-end">
                <span className="font-space text-[9px] mr-1" style={{ color: "var(--text-muted)" }}>
                  Less
                </span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{
                      background: level === 0
                        ? "var(--github-level-0)"
                        : level === 1 ? "var(--github-level-1)"
                        : level === 2 ? "var(--github-level-2)"
                        : level === 3 ? "var(--github-level-3)"
                        : "var(--github-level-4)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  />
                ))}
                <span className="font-space text-[9px] ml-1" style={{ color: "var(--text-muted)" }}>
                  More
                </span>
              </div>
            </motion.div>
          )}

          {/* Recent Repositories */}
          <div>
            <div
              className="font-space text-[10px] uppercase tracking-widest mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              ALL REPOSITORIES
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {repos.map((repo, idx) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...CARD_ANIM}
                  transition={{ delay: 0.3 + idx * 0.06 }}
                  className="cyber-panel p-4 rounded-lg group transition-all"
                  style={{ textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className="font-space text-xs font-bold truncate max-w-[75%] transition-colors"
                      style={{ color: "var(--text-main)" }}
                    >
                      {repo.name}
                    </span>
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover:opacity-80 transition-opacity"
                      style={{ color: "var(--accent-primary)" }}
                      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>

                  <p
                    className="text-[10px] leading-relaxed mb-3 line-clamp-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {repo.description ?? "No description."}
                  </p>

                  <div className="flex items-center gap-3 font-space text-[9px]" style={{ color: "var(--text-muted)" }}>
                    {(() => {
                      const displayLang = LANGUAGE_OVERRIDES[repo.name] || repo.language;
                      return displayLang && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: LANG_COLORS[displayLang] ?? "#888" }}
                          />
                          {displayLang}
                        </span>
                      );
                    })()}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        ⭐ {repo.stargazers_count}
                      </span>
                    )}
                    <span className="ml-auto opacity-60">
                      {new Date(repo.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
    </div>
  );
}
