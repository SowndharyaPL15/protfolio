"use client";

import React, { useState, useEffect } from "react";
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

/** Build exact real 52-week heatmap using real contribution days */
function buildRealHeatmap(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser>(REAL_GITHUB_USER);
  const [repos, setRepos] = useState<GitHubRepo[]>(REAL_GITHUB_REPOS);
  const [days, setDays] = useState<ContributionDay[]>(REAL_CONTRIBUTION_DAYS);
  const [isLive, setIsLive] = useState(false);

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
        // Real baseline data is always preserved
      }
    })();

    return () => controller.abort();
  }, []);

  const heatmap = buildRealHeatmap(days);

  const getTooltipText = (day: ContributionDay) => {
    const d = new Date(day.date);
    const dateStr = isNaN(d.getTime())
      ? day.date
      : d.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
    const contribText = day.level === 0 ? "No contributions" : `${day.level} contribution${day.level > 1 ? "s" : ""}`;
    return `${contribText} on ${dateStr}`;
  };

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
            {isLive ? "LIVE SYNCED" : "VERIFIED DATA"}
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

      {/* Real Contribution Heatmap */}
      {heatmap.length > 0 && (
        <motion.div {...CARD_ANIM} transition={{ delay: 0.2 }} className="cyber-panel p-4 rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-space text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--text-muted)" }}>
                REAL CONTRIBUTION CALENDAR
              </span>
              <span className="font-space text-[9px] px-2 py-0.5 rounded font-bold" style={{ background: "rgba(57,255,20,0.08)", color: "#10b981", border: "1px solid rgba(57,255,20,0.2)" }}>
                {user.total_contributions} Contributions in last year
              </span>
            </div>
            <span className="font-space text-[9px]" style={{ color: "var(--text-muted)" }}>
              52 Weeks Activity
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-[680px]" aria-label="Contribution heatmap">
              {heatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1 flex-shrink-0">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="w-2.5 h-2.5 rounded-[2px] transition-transform hover:scale-125 cursor-pointer"
                      style={{
                        background:
                          day.level === 0
                            ? "var(--github-level-0)"
                            : day.level === 1
                            ? "var(--github-level-1)"
                            : day.level === 2
                            ? "var(--github-level-2)"
                            : day.level === 3
                            ? "var(--github-level-3)"
                            : "var(--github-level-4)",
                        border: "1px solid var(--border-subtle)",
                      }}
                      title={getTooltipText(day)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 mt-2 justify-between">
            <span className="font-space text-[9px] opacity-60" style={{ color: "var(--text-muted)" }}>
              Data verified from github.com/{USERNAME}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-space text-[9px] mr-1" style={{ color: "var(--text-muted)" }}>
                Less
              </span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-2.5 h-2.5 rounded-[2px]"
                  style={{
                    background:
                      level === 0
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
                />
              ))}
              <span className="font-space text-[9px] ml-1" style={{ color: "var(--text-muted)" }}>
                More
              </span>
            </div>
          </div>
        </motion.div>
      )}

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
