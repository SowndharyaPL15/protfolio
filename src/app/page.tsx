"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import TopStatusBar from "@/components/TopStatusBar";
import AITerminal from "@/components/AITerminal";
import AIAssistant from "@/components/AIAssistant";

// Workspaces
import HomeWorkspace from "@/workspaces/HomeWorkspace";
import AboutWorkspace from "@/workspaces/AboutWorkspace";
import SkillsWorkspace from "@/workspaces/SkillsWorkspace";
import ProjectsWorkspace from "@/workspaces/ProjectsWorkspace";
import EducationWorkspace from "@/workspaces/EducationWorkspace";
import ExperienceWorkspace from "@/workspaces/ExperienceWorkspace";
import CertificatesWorkspace from "@/workspaces/CertificatesWorkspace";
import GitHubWorkspace from "@/workspaces/GitHubWorkspace";
import ContactWorkspace from "@/workspaces/ContactWorkspace";

const BootScreen = dynamic(() => import("@/components/BootScreen"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });

/* OS Workspace transition animation: scale + blur + fade (350ms) */
const WORKSPACE_VARIANTS = {
  initial: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.01, filter: "blur(2px)" },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProjectNum, setSelectedProjectNum] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  /* Boot screen check */
  useEffect(() => {
    const seen = typeof window !== "undefined" && localStorage.getItem("boot-seen");
    if (!seen) {
      setShowBoot(true);
    } else {
      setBootDone(true);
    }
  }, []);

  const handleBootDone = useCallback(() => {
    setShowBoot(false);
    setBootDone(true);
  }, []);

  /* Keyboard shortcut: Escape closes mobile drawer */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Boot screen */}
      <AnimatePresence>{showBoot && <BootScreen onComplete={handleBootDone} />}</AnimatePresence>

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette setActiveTab={setActiveTab} />

      {/* Desktop OS Container — 100vw, 100vh locked */}
      <div
        className="flex flex-col h-screen w-screen overflow-hidden select-none"
        style={{ background: "var(--bg-base)", color: "var(--text-main)" }}
        role="application"
        aria-label="Sowndharya P.L AI Operating System"
      >
        {/* PERMANENT TOP STATUS BAR */}
        <TopStatusBar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* MIDDLE SECTION — SIDEBAR + MAIN WORKSPACE */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {/* PERMANENT SIDEBAR */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          {/* DYNAMIC WORKSPACE AREA */}
          <main
            id="main-content"
            className="flex-1 overflow-hidden relative"
            style={{ background: "var(--bg-base)" }}
            aria-live="polite"
            aria-label="Active workspace content"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={WORKSPACE_VARIANTS}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full w-full overflow-hidden"
              >
                {activeTab === "home" && <HomeWorkspace setActiveTab={setActiveTab} setSelectedProjectNum={setSelectedProjectNum} />}
                {activeTab === "about" && <AboutWorkspace />}
                {activeTab === "skills" && <SkillsWorkspace />}
                {activeTab === "projects" && <ProjectsWorkspace selectedProjectNum={selectedProjectNum} setSelectedProjectNum={setSelectedProjectNum} />}
                {activeTab === "education" && <EducationWorkspace />}
                {activeTab === "experience" && <ExperienceWorkspace />}
                {activeTab === "certificates" && <CertificatesWorkspace />}
                {activeTab === "github" && <GitHubWorkspace />}
                {activeTab === "contact" && <ContactWorkspace />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* PERMANENT BOTTOM AI TERMINAL BAR */}
        {bootDone && <AIAssistant />}
      </div>
    </>
  );
}
