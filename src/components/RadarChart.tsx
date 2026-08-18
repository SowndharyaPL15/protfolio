"use client";

import React from "react";
import { motion } from "framer-motion";

const AXES = [
  { name: "Programming", value: 0.92 },
  { name: "Web Dev",     value: 0.88 },
  { name: "AI / ML",     value: 0.80 },
  { name: "DevOps",      value: 0.68 },
  { name: "Database",    value: 0.84 },
  { name: "Problem\nSolving", value: 0.90 },
];

const LEVELS = [0.25, 0.5, 0.75, 1.0];

export default function RadarChart() {
  const CX = 140;
  const CY = 110;
  const R  = 65;
  const N  = AXES.length;

  /** (x, y, z)  → SVG point at given fraction of radius */
  const pt = (i: number, frac: number) => {
    const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
    return {
      x: CX + R * frac * Math.cos(angle),
      y: CY + R * frac * Math.sin(angle),
    };
  };

  const hexPoints = (frac: number) =>
    AXES.map((_, i) => {
      const { x, y } = pt(i, frac);
      return `${x},${y}`;
    }).join(" ");

  const dataPoints = AXES.map((a, i) => {
    const { x, y } = pt(i, a.value);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 280 220" className="w-full h-full" aria-label="Skills radar chart" role="img">
        {/* Grid rings */}
        {LEVELS.map((level, li) => (
          <polygon
            key={li}
            points={hexPoints(level)}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="0.8"
          />
        ))}

        {/* Axis lines */}
        {AXES.map((_, i) => {
          const outer = pt(i, 1);
          return (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={outer.x} y2={outer.y}
              stroke="var(--border-subtle)"
              strokeWidth="0.8"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Data fill */}
        <motion.polygon
          points={dataPoints}
          fill="var(--glow-sm)"
          stroke="var(--accent-primary)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: `${CX}px ${CY}px`, filter: "drop-shadow(0 0 6px var(--glow-md))" }}
        />

        {/* Data dots */}
        {AXES.map((axis, i) => {
          const { x, y } = pt(i, axis.value);
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r="3.5"
              fill="var(--accent-primary)"
              stroke="var(--bg-base)"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
              style={{ filter: "drop-shadow(0 0 3px var(--accent-primary))" }}
            >
              <title>{`${axis.name}: ${Math.round(axis.value * 100)}%`}</title>
            </motion.circle>
          );
        })}

        {/* SVG labels – properly offset per quadrant */}
        {AXES.map((axis, i) => {
          const LABEL_R = R + 22;
          const angle   = (Math.PI * 2 * i) / N - Math.PI / 2;
          const lx      = CX + LABEL_R * Math.cos(angle);
          const ly      = CY + LABEL_R * Math.sin(angle);

          // Determine text-anchor by angle quadrant
          const deg   = (angle * 180) / Math.PI;
          const anchor =
            deg < -60 && deg > -120
              ? "middle"
              : deg > 60 && deg < 120
              ? "middle"
              : lx < CX - 5
              ? "end"
              : lx > CX + 5
              ? "start"
              : "middle";

          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="8"
              fontFamily="'Space Mono', monospace"
              fill="var(--text-muted)"
              style={{ userSelect: "none" }}
            >
              {/* Handle multi-line labels */}
              {axis.name.split("\n").map((line, li) => (
                <tspan key={li} x={lx} dy={li === 0 ? 0 : "1.1em"}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
