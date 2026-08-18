"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SidebarProps {
  activeTab:    string;
  setActiveTab: (tab: string) => void;
  mobileOpen:   boolean;
  setMobileOpen:(open: boolean) => void;
}

const NAV_ITEMS = [
  {
    id: "home",
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About Me",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },

  {
    id: "education",
    label: "Education",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4v-4.25m16.5 0a2.18 2.18 0 00.45-1.315V5.374c0-1.087-.25-2.134-2.25-2.374H5.625c-2-.24-2.25 1.287-2.25 2.374v7.011c0 .995.375 1.185.45 1.315m16.5 0h-16.5" />
      </svg>
    ),
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }: SidebarProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const navigate = (tab: string) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  // Keyboard: close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen, setMobileOpen]);

  const sidebarContent = (
    <aside
      id="main-sidebar"
      className="h-full border-r flex flex-col z-20"
      style={{
        width: "256px",
        background: "var(--bg-surface)",
        backdropFilter: "blur(16px)",
        borderColor: "var(--border-subtle)",
      }}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div
        className="p-5 flex items-center justify-between flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
            <div
              className="absolute inset-0 border rotate-45 rounded-sm animate-pulse-slow"
              style={{ borderColor: "var(--accent-primary)" }}
            />
            <div
              className="absolute inset-1.5 border -rotate-45 rounded-sm"
              style={{ borderColor: "var(--accent-secondary)" }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--accent-primary)", boxShadow: "0 0 6px var(--accent-primary)" }}
            />
          </div>
          <span
            className="font-space font-bold text-base tracking-widest text-glow"
            style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)" }}
          >
            SOWNDHARYA P.L.
          </span>
        </div>

        {/* Mobile close */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden w-7 h-7 rounded flex items-center justify-center transition-opacity opacity-50 hover:opacity-100"
          style={{ color: "var(--text-muted)" }}
          aria-label="Close navigation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <nav className="px-3 py-4 space-y-1" aria-label="Portfolio sections">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => navigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative"
              style={{
                background:    isActive ? "var(--glow-sm)" : "transparent",
                color:         isActive ? "var(--accent-primary)" : "var(--text-muted)",
                borderLeft:    isActive ? `2px solid var(--accent-primary)` : "2px solid transparent",
                boxShadow:     isActive ? `inset 0 0 10px var(--glow-xs)` : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "var(--glow-xs)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-main)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }
              }}
            >
              {item.icon}
              <span className="font-space text-xs tracking-wider">{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1 h-4 rounded-full"
                  style={{ background: "var(--accent-primary)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 flex flex-col justify-end p-4 gap-4 overflow-y-auto">
        {/* AI PORTFOLIO ASSISTANT */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <span className="font-space text-[10px] tracking-widest text-[var(--accent-primary)] font-bold mb-1 uppercase">
            AI Assistant
          </span>
          <div className="relative w-20 h-20 rounded-full border border-[var(--accent-secondary)] flex items-center justify-center bg-[var(--glow-sm)]" style={{ boxShadow: "0 0 15px var(--glow-md)" }}>
            <svg className="w-10 h-10 text-[var(--accent-primary)] animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <p className="text-[10px] text-center text-[var(--text-muted)] mt-1 font-space">
            How can I help you today?
          </p>
          <button className="w-full mt-2 py-2 rounded text-xs font-bold font-space border transition-all"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
                  style={{ borderColor: "var(--border-subtle)", color: "var(--text-main)", background: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--glow-sm)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}>
            Chat Now
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-between px-2 py-4 border-t border-b border-[var(--border-subtle)]">
          <a href="https://github.com/SowndharyaPL15" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors" title="GitHub">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/sowndharyapl/" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors" title="LinkedIn">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </a>
          <a href="https://leetcode.com/u/SOWNDHARYAPL/" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[#FFA116] transition-colors" title="LeetCode">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
          </a>
          <a href="mailto:plsowndharya@gmail.com" className="text-[var(--text-muted)] hover:text-white transition-colors" title="Email">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="font-space text-[8px] text-center" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
          © 2026 Sowndharya P.L.<br />All rights reserved.
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex h-full flex-shrink-0">{sidebarContent}</div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            ref={overlayRef}
            className="sidebar-overlay lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed top-0 left-0 h-full z-20 lg:hidden"
          >
            {sidebarContent}
          </motion.div>
        </>
      )}
    </>
  );
}
