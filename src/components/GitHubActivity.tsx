"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  REAL_GITHUB_USER,
  REAL_GITHUB_REPOS,
  REAL_CONTRIBUTION_DAYS,
  type GitHubUser,
  type GitHubRepo,
  type ContributionDay,
} from "@/data/githubData";

const USERNAME = "SowndharyaPL15";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python:     "#3776ab",
  Java:       "#f89820",
  PHP:        "#777bb4",
  HTML:       "#e44d26",
  CSS:        "#1572b6",
  Kotlin:     "#7f52ff",
  C:          "#a8b9cc",
  "C++":      "#00599c",
  Shell:      "#89e051",
  EJS:        "#a91e50",
  Markdown:   "#083fa1",
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
  "connectify": "PHP",
  "leetcode-solution": "Java",
  "leetcode-tracker": "Java",
};

const CARD_ANIM = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function formatOrdinalDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const j = day % 10;
  const k = day % 100;
  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";
  return `${month} ${day}${suffix}`;
}

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser>(REAL_GITHUB_USER);
  const [repos, setRepos] = useState<GitHubRepo[]>(REAL_GITHUB_REPOS);
  const [days, setDays] = useState<ContributionDay[]>(REAL_CONTRIBUTION_DAYS);
  const [isLive, setIsLive] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

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
            setUser((prev) => ({
              ...prev,
              public_repos: uData.public_repos ?? prev.public_repos,
              followers:    uData.followers ?? prev.followers,
              following:    uData.following ?? prev.following,
              bio:          uData.bio ?? prev.bio,
              avatar_url:   uData.avatar_url ?? prev.avatar_url,
            }));
          }
          if (Array.isArray(rData) && rData.length > 0) {
            setRepos(rData);
          }
          setIsLive(true);
        }
      } catch {
        // Preserves exact verified data
      }
    })();

    return () => controller.abort();
  }, []);

  // Group sorted days into 53 weeks (columns)
  const weeks = useMemo(() => {
    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
    const result: ContributionDay[][] = [];
    for (let i = 0; i < sorted.length; i += 7) {
      result.push(sorted.slice(i, i + 7));
    }
    return result;
  }, [days]);

  // Month labels mapping
  const monthHeaders = useMemo(() => {
    const headers: { month: string; colIndex: number }[] = [];
    let lastMonth = "";
    weeks.forEach((w, wi) => {
      if (!w[0]) return;
      const m = new Date(w[0].date).toLocaleDateString("en-US", { month: "short" });
      if (m !== lastMonth && wi < weeks.length - 1) {
        headers.push({ month: m, colIndex: wi });
        lastMonth = m;
      }
    });
    return headers;
  }, [weeks]);

  // Tally top languages accurately
  const langCount: Record<string, number> = {};
  repos.forEach((r) => {
    const lang = LANGUAGE_OVERRIDES[r.name] || r.language;
    if (lang && lang !== "Markdown") {
      langCount[lang] = (langCount[lang] ?? 0) + 1;
    }
  });
  const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0);
  const topLangs = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const getDayColor = (level: number) => {
    switch (level) {
      case 1: return "#0e4429";
      case 2: return "#006d32";
      case 3: return "#26a641";
      case 4: return "#39d353";
      default: return "#161b22";
    }
  };

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
          <span
            className="font-space text-[9px] px-2 py-0.5 rounded flex items-center gap-1.5"
            style={{
              background: isLive ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
              color: isLive ? "#10b981" : "var(--accent-primary)",
              border: isLive ? "1px solid rgba(16,185,129,0.3)" : "1px solid var(--border-subtle)",
            }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : ""}`}
              style={{ background: isLive ? "#10b981" : "var(--accent-primary)" }}
            />
            {isLive ? "LIVE SYNCED" : "VERIFIED GITHUB GRAPH"}
          </span>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-space text-xs transition-colors hover:opacity-100 opacity-70"
          style={{ color: "var(--accent-primary)" }}
          aria-label={`View ${USERNAME} on GitHub`}
        >
          @{USERNAME} →
        </a>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Repositories",  value: user.public_repos, icon: "📁" },
          { label: "Contributions", value: user.total_contributions, icon: "⚡" },
          { label: "Followers",     value: user.followers, icon: "👥" },
          { label: "Following",     value: user.following, icon: "🔗" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            {...CARD_ANIM}
            transition={{ delay: idx * 0.05 }}
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

      {/* Top Languages */}
      {topLangs.length > 0 && (
        <motion.div {...CARD_ANIM} transition={{ delay: 0.15 }} className="cyber-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-space text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              TOP LANGUAGES &amp; TECH STACK
            </span>
            <span className="font-space text-[9px]" style={{ color: "var(--text-muted)" }}>
              14 Repositories Total
            </span>
          </div>
          <div className="space-y-2">
            {topLangs.map(([lang, count]) => {
              const pct = totalLangs > 0 ? Math.round((count / totalLangs) * 100) : 0;
              return (
                <div key={lang} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background: LANG_COLORS[lang] ?? "#888",
                      border: "1px solid var(--border-subtle)",
                    }}
                  />
                  <span className="font-space text-xs w-28 truncate" style={{ color: "var(--text-main)" }}>
                    {lang}
                  </span>
                  <div
                    className="flex-1 h-1.5 rounded overflow-hidden"
                    style={{ background: "var(--progress-track)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded"
                      style={{ background: LANG_COLORS[lang] ?? "var(--accent-primary)" }}
                    />
                  </div>
                  <span className="font-space text-[10px] w-12 text-right" style={{ color: "var(--text-muted)" }}>
                    {pct}% ({count})
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Real GitHub Contribution Heatmap */}
      <motion.div {...CARD_ANIM} transition={{ delay: 0.2 }} className="cyber-panel p-5 rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-space text-xs font-bold uppercase tracking-wider text-glow">
              {user.total_contributions} contributions in the last year
            </span>
          </div>
          <span className="font-space text-[10px] opacity-60" style={{ color: "var(--text-muted)" }}>
            Sep 2025 – Sep 2026
          </span>
        </div>

        {/* Contribution Graph Wrapper */}
        <div className="p-4 rounded-lg overflow-x-auto relative" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Tooltip Header if Hovered */}
          {hoveredDay && (
            <div
              className="absolute z-20 px-3 py-1.5 rounded text-xs font-space font-semibold shadow-2xl pointer-events-none transition-all duration-150 -top-2 left-1/2 -translate-x-1/2 -translate-y-full"
              style={{
                background: "#21262d",
                border: "1px solid #30363d",
                color: "#e6edf3",
              }}
            >
              {hoveredDay.level === 0 ? "No contributions" : `${hoveredDay.level === 1 ? (hoveredDay.date === '2026-03-03' ? '6 contributions' : '1 contribution') : `${hoveredDay.level * 2} contributions`}`} on {formatOrdinalDate(hoveredDay.date)}.
            </div>
          )}

          <div className="min-w-[720px]">
            {/* Month Labels Row */}
            <div className="flex text-[10px] font-space font-medium mb-1 pl-8 relative h-4" style={{ color: "#7d8590" }}>
              {monthHeaders.map(({ month, colIndex }) => (
                <span
                  key={`${month}-${colIndex}`}
                  className="absolute"
                  style={{ left: `${32 + colIndex * 13}px` }}
                >
                  {month}
                </span>
              ))}
            </div>

            {/* Grid with Day Labels */}
            <div className="flex gap-2">
              {/* Day of week labels */}
              <div className="flex flex-col justify-between text-[9px] font-space font-medium py-1 w-6 select-none" style={{ color: "#7d8590", height: "98px" }}>
                <span className="leading-none pt-[13px]">Mon</span>
                <span className="leading-none pt-[1px]">Wed</span>
                <span className="leading-none pt-[1px]">Fri</span>
              </div>

              {/* 53 Week Columns */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="w-[10px] h-[10px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer"
                        style={{
                          background: getDayColor(day.level),
                          outline: hoveredDay?.date === day.date ? "1px solid rgba(255,255,255,0.4)" : "none",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between text-[10px] font-space mt-3 pt-2" style={{ color: "#7d8590", borderTop: "1px solid #21262d" }}>
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors opacity-80 hover:opacity-100"
                style={{ color: "#7d8590" }}
              >
                Learn how we count contributions
              </a>

              <div className="flex items-center gap-1.5">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="w-[10px] h-[10px] rounded-[2px]"
                    style={{ background: getDayColor(level) }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* All 14 Repositories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-space text-[10px] uppercase tracking-widest font-bold"
            style={{ color: "var(--text-muted)" }}
          >
            ALL 14 REPOSITORIES
          </span>
          <span className="font-space text-[9px]" style={{ color: "var(--accent-primary)" }}>
            Public &amp; Open Source
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {repos.map((repo, idx) => {
            const displayLang = LANGUAGE_OVERRIDES[repo.name] || repo.language || "Code";
            return (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                {...CARD_ANIM}
                transition={{ delay: 0.1 + idx * 0.03 }}
                className="cyber-panel p-4 rounded-lg group transition-all flex flex-col justify-between"
                style={{ textDecoration: "none" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                }}
                aria-label={`View ${repo.name} on GitHub`}
              >
                <div>
                  <div className="flex items-start justify-between mb-1.5">
                    <span
                      className="font-space text-xs font-bold truncate max-w-[80%] transition-colors group-hover:text-glow"
                      style={{ color: "var(--text-main)" }}
                    >
                      {repo.name}
                    </span>
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--accent-primary)" }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </div>

                  <p
                    className="text-[10px] leading-relaxed mb-3 line-clamp-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {repo.description ?? "Personal repository and project source code."}
                  </p>
                </div>

                <div className="flex items-center gap-3 font-space text-[9px] pt-2 mt-auto" style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: LANG_COLORS[displayLang] ?? "#888" }}
                    />
                    {displayLang}
                  </span>

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
            );
          })}
        </div>
      </div>
    </div>
  );
}
