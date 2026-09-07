"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatItem {
  label:    string;
  value:    number;
  suffix?:  string;
  icon:     React.ReactNode;
  color?:   string;
}

/** Simple animated counter using requestAnimationFrame */
function AnimatedCount({ target, suffix = "", duration = 1200 }: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const hasStarted = useRef(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startRef.current = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startRef.current;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) rafRef.current = requestAnimationFrame(animate);
          };
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (elRef.current) observer.observe(elRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return (
    <div ref={elRef} className="font-space text-xs font-bold" style={{ color: "var(--accent-primary)" }}>
      {count}{suffix}
    </div>
  );
}

export default function MetricsBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setDate(now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const stats: StatItem[] = [
    {
      label: "Status",
      value: 0,
      icon: (
        <div className="relative flex h-3 w-3 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </div>
      ),
    },
    {
      label: "Projects",
      value: 11,
      icon: (
        <svg className="w-5 h-5" style={{ color: "var(--accent-primary)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      label: "CGPA",
      value: 842,
      suffix: "",
      icon: (
        <svg className="w-5 h-5" style={{ color: "var(--accent-primary)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      label: "Skills",
      value: 19,
      suffix: "+",
      icon: (
        <svg className="w-5 h-5" style={{ color: "var(--accent-primary)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      label: "Internship",
      value: 15,
      suffix: "d",
      icon: (
        <svg className="w-5 h-5" style={{ color: "var(--accent-primary)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4v-4.25m16.5 0a2.18 2.18 0 00.45-1.315V5.374c0-1.087-.25-2.134-2.25-2.374H5.625c-2-.24-2.25 1.287-2.25 2.374v7.011c0 .995.375 1.185.45 1.315m16.5 0h-16.5" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 p-3 flex-shrink-0"
      style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-surface)", backdropFilter: "blur(12px)" }}
      role="status"
      aria-label="Portfolio statistics"
    >
      {/* Stat: Status (special case) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="cyber-panel p-3 rounded-lg flex items-center gap-2.5"
      >
        {stats[0].icon}
        <div>
          <div className="font-space text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Status</div>
          <div className="font-space text-xs font-bold text-glow-green">Ready to Contribute</div>
        </div>
      </motion.div>

      {/* Stats 1-4: animated counters */}
      {stats.slice(1, 5).map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (idx + 1) * 0.06 }}
          className="cyber-panel p-3 rounded-lg flex items-center gap-2.5"
        >
          {stat.icon}
          <div>
            <div className="font-space text-[9px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </div>
            {stat.label === "CGPA" ? (
              <div className="font-space text-xs font-bold" style={{ color: "var(--accent-primary)" }}>
                8.35 / 10
              </div>
            ) : (
              <AnimatedCount target={stat.value} suffix={stat.suffix} />
            )}
          </div>
        </motion.div>
      ))}

      {/* Live clock */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="cyber-panel p-3 rounded-lg flex items-center gap-2.5 cyber-panel-glow"
      >
        <svg className="w-5 h-5 animate-spin-slow flex-shrink-0" style={{ color: "var(--accent-primary)" }}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <div className="font-space text-xs font-bold text-glow" aria-live="polite">
            {time || "00:00:00"}
          </div>
          <div className="font-space text-[9px]" style={{ color: "var(--text-muted)" }}>
            {date || "– – –"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
