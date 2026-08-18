"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { label: "Accuracy", value: "94.8%", raw: 94.8, color: "#00f0ff", icon: "🎯" },
  { label: "Precision", value: "93.5%", raw: 93.5, color: "#0066ff", icon: "📐" },
  { label: "Recall", value: "95.2%", raw: 95.2, color: "#39ff14", icon: "🔍" },
  { label: "F1 Score", value: "94.3%", raw: 94.3, color: "#a78bfa", icon: "📊" },
];

/* Animated count-up hook */
function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(parseFloat((progress * target).toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function MetricCard({ m, idx }: { m: typeof METRICS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(m.raw, 1400, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + idx * 0.05 }}
      className="cyber-panel rounded-xl p-4 text-center relative overflow-hidden group hover:shadow-[0_0_20px_rgba(0,199,183,0.2)] transition-all duration-300"
    >
      {/* Top glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
      />
      <div className="text-xl mb-1">{m.icon}</div>
      <div className="font-space text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
        {m.label}
      </div>
      <div className="font-space text-2xl font-bold" style={{ color: m.color }}>
        {visible ? `${count.toFixed(1)}%` : "0.0%"}
      </div>

      {/* Mini bar */}
      <div className="mt-2 h-1 w-full rounded overflow-hidden bg-white/10">
        <motion.div
          className="h-full rounded"
          initial={{ width: 0 }}
          animate={{ width: visible ? `${m.raw}%` : 0 }}
          transition={{ duration: 1.4, delay: 0.3 + idx * 0.1 }}
          style={{ background: m.color }}
        />
      </div>
    </motion.div>
  );
}

export default function ResearchWorkspace() {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="font-space text-[10px] uppercase tracking-widest text-glow mb-1 font-bold">
              AI RESEARCH LABORATORY
            </div>
            <h1 className="font-dm-serif text-2xl md:text-3xl font-bold" style={{ color: "var(--text-main)" }}>
              Aerial Object Detection — IoT Research
            </h1>
            <p className="font-space text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Real-Time Ultrasonic Sensor Array System · Technical Symposium (Sri Ramakrishna College)
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className="font-space text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5"
              style={{ background: "rgba(255,183,3,0.12)", border: "1px solid rgba(255,183,3,0.4)", color: "#ffb703" }}
            >
              🏆 2nd Prize Award
            </span>
            <span
              className="font-space text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5"
              style={{ background: "var(--glow-xs)", border: "1px solid var(--border-accent)", color: "var(--accent-primary)" }}
            >
              📄 Research Paper
            </span>
          </div>
        </div>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, var(--accent-primary), transparent)" }} />
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {METRICS.map((m, i) => (
          <MetricCard key={m.label} m={m} idx={i} />
        ))}
      </div>

      {/* Abstract + System Specs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-7 cyber-panel rounded-xl p-5 space-y-3"
        >
          <div className="font-space text-xs uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
            🔬 Research Abstract
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            This research presents a real-time IoT-based aerial object detection system designed for localized
            low-altitude airspace monitoring. By utilizing an ultrasonic sensor array coupled with an Arduino
            microcontroller running custom signal conditioning algorithms, the system detects approaching aerial
            hazards, calculates distance metrics, and triggers instantaneous multi-stage alarm relays.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The system achieves sub-15ms detection latency with a 94.8% accuracy rate across 500 controlled trials,
            outperforming baseline single-sensor approaches by 28%.
          </p>
          <div className="pt-2 font-space text-xs font-bold" style={{ color: "var(--accent-primary)" }}>
            ✅ Presented at Sri Ramakrishna College Technical Symposium — Awarded 2nd Place (Dept. of ECE)
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="md:col-span-5 cyber-panel rounded-xl p-5 space-y-3"
        >
          <div className="font-space text-xs uppercase tracking-widest font-bold" style={{ color: "var(--accent-secondary)" }}>
            ⚙️ Hardware & Dataset Specs
          </div>
          <div className="space-y-2.5 font-space text-xs">
            {[
              { k: "Microcontroller", v: "Arduino ATmega328P", c: "#00f0ff" },
              { k: "Sensor Model", v: "HC-SR04 Ultrasonic Array (×4)", c: "#39ff14" },
              { k: "Language", v: "Embedded C / C++", c: "#f89820" },
              { k: "Detection Range", v: "2cm – 400cm Horizontal Sweep", c: "#a78bfa" },
              { k: "Response Latency", v: "< 15ms End-to-End", c: "#00f0ff" },
              { k: "Trial Dataset Size", v: "N = 500 Trials", c: "#ffb703" },
              { k: "Environment", v: "Open-Air Outdoor Setup", c: "#ff6b8a" },
            ].map((s) => (
              <div key={s.k} className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: "var(--border-subtle)" }}>
                <span style={{ color: "var(--text-muted)" }}>{s.k}</span>
                <span className="font-bold text-right" style={{ color: s.c }}>{s.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="cyber-panel rounded-xl p-5 space-y-4"
      >
        <div className="font-space text-xs uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
          🏗️ System Architecture Pipeline
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-space text-xs font-bold">
          {[
            { label: "HC-SR04 Sensor Array", color: "#00f0ff" },
            { label: "→", color: "var(--text-muted)" },
            { label: "Arduino ATmega328P", color: "#39ff14" },
            { label: "→", color: "var(--text-muted)" },
            { label: "Signal Conditioning", color: "#f89820" },
            { label: "→", color: "var(--text-muted)" },
            { label: "Threshold Evaluation", color: "#a78bfa" },
            { label: "→", color: "var(--text-muted)" },
            { label: "Audio/Visual Alarm Relay", color: "#ff6b8a" },
            { label: "→", color: "var(--text-muted)" },
            { label: "Serial Telemetry Log", color: "#ffb703" },
          ].map((step, idx) => (
            <span
              key={idx}
              className={step.label === "→" ? "" : "px-2.5 py-1.5 rounded-lg border"}
              style={{
                color: step.color,
                ...(step.label !== "→" ? {
                  background: `${step.color}10`,
                  borderColor: `${step.color}40`,
                } : {}),
              }}
            >
              {step.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Confusion Matrix + Signal Curves */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="cyber-panel rounded-xl p-5 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="font-space text-xs uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
            📊 Confusion Matrix & Diagnostic Telemetry
          </div>
          <span className="font-space text-[10px]" style={{ color: "var(--text-muted)" }}>N = 500 TRIALS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Confusion Matrix */}
          <div className="p-4 rounded-xl bg-black/40 border space-y-3" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="font-space text-[10px] text-center uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Confusion Matrix
            </div>
            <div className="grid grid-cols-2 gap-2 font-space text-xs text-center font-bold">
              <div className="p-3 rounded-lg" style={{ background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.3)", color: "#00f0ff" }}>
                TP: 237
                <div className="text-[9px] font-normal opacity-70 mt-0.5">True Positive</div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "rgba(255,107,138,0.08)", border: "1px solid rgba(255,107,138,0.25)", color: "#ff6b8a", opacity: 0.7 }}>
                FP: 16
                <div className="text-[9px] font-normal opacity-70 mt-0.5">False Positive</div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "rgba(255,183,3,0.08)", border: "1px solid rgba(255,183,3,0.25)", color: "#ffb703", opacity: 0.7 }}>
                FN: 10
                <div className="text-[9px] font-normal opacity-70 mt-0.5">False Negative</div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.3)", color: "#39ff14" }}>
                TN: 237
                <div className="text-[9px] font-normal opacity-70 mt-0.5">True Negative</div>
              </div>
            </div>
            <div className="text-center font-space text-[10px]" style={{ color: "var(--text-muted)" }}>
              Overall Accuracy: <span style={{ color: "#00f0ff" }}>94.8%</span>
            </div>
          </div>

          {/* Signal Precision Curves */}
          <div className="p-4 rounded-xl bg-black/40 border flex flex-col justify-center space-y-4" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="font-space text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
              Proximity Precision by Range Zone
            </div>
            {[
              { label: "Near Field (< 100cm)", val: 98.2, color: "#00f0ff" },
              { label: "Mid Field (100–200cm)", val: 94.6, color: "#39ff14" },
              { label: "Far Field (200–400cm)", val: 91.4, color: "#a78bfa" },
            ].map((curve) => (
              <div key={curve.label}>
                <div className="flex justify-between font-space text-[10px] mb-1">
                  <span style={{ color: "var(--text-muted)" }}>{curve.label}</span>
                  <span style={{ color: curve.color }} className="font-bold">{curve.val}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded overflow-hidden">
                  <motion.div
                    className="h-full rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${curve.val}%` }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    style={{ background: curve.color }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-2 border-t font-space text-[10px]" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
              ROC AUC Score: <span style={{ color: "#00f0ff" }} className="font-bold">0.973</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Future Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="cyber-panel rounded-xl p-5 space-y-3"
      >
        <div className="font-space text-xs uppercase tracking-widest font-bold" style={{ color: "#00ff88" }}>
          🔮 Future Roadmap
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Multi-Spectral Fusion", desc: "Combine ultrasonic with Doppler radar and optical IR cameras for multi-spectral detection redundancy.", color: "#00f0ff" },
            { title: "AI Classification Layer", desc: "Train a lightweight CNN on aerial signature patterns to distinguish birds, drones, and aircraft automatically.", color: "#a78bfa" },
            { title: "Edge Deployment", desc: "Port algorithm to Raspberry Pi 4 for standalone deployment with WiFi mesh alert broadcasting.", color: "#39ff14" },
          ].map((item) => (
            <div
              key={item.title}
              className="p-3 rounded-xl border"
              style={{ background: `${item.color}06`, borderColor: `${item.color}30` }}
            >
              <div className="font-space text-xs font-bold mb-1" style={{ color: item.color }}>
                {item.title}
              </div>
              <p className="font-space text-[10px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
