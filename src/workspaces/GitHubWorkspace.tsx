"use client";

import React from "react";
import { motion } from "framer-motion";
import GitHubActivity from "@/components/GitHubActivity";

export default function GitHubWorkspace() {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="font-space text-xs uppercase tracking-widest text-glow mb-1">
          GITHUB ANALYTICS DASHBOARD
        </h2>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, var(--accent-primary), transparent)" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <GitHubActivity />
      </motion.div>
    </div>
  );
}
