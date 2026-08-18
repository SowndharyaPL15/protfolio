"use client";

import React from "react";
import { motion } from "framer-motion";
import Certifications from "@/components/Certifications";

export default function CertificatesWorkspace() {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="font-space text-xs uppercase tracking-widest text-glow mb-1">
          CERTIFICATIONS & AWARDS
        </h2>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, var(--accent-primary), transparent)" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Certifications />
      </motion.div>
    </div>
  );
}
