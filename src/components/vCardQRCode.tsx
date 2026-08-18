"use client";

import React from "react";

export default function vCardQRCode() {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--border-subtle)] text-center" style={{ background: "var(--bg-surface)" }}>
      <div className="w-32 h-32 p-2 bg-white rounded-lg shadow-[0_0_15px_rgba(0,199,183,0.3)] mb-2 flex items-center justify-center">
        {/* Crisp Vector QR Code Representation */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
          {/* Outer Finder Patterns */}
          <rect x="5" y="5" width="25" height="25" fill="black"/>
          <rect x="9" y="9" width="17" height="17" fill="white"/>
          <rect x="13" y="13" width="9" height="9" fill="black"/>

          <rect x="70" y="5" width="25" height="25" fill="black"/>
          <rect x="74" y="9" width="17" height="17" fill="white"/>
          <rect x="78" y="13" width="9" height="9" fill="black"/>

          <rect x="5" y="70" width="25" height="25" fill="black"/>
          <rect x="9" y="74" width="17" height="17" fill="white"/>
          <rect x="13" y="78" width="9" height="9" fill="black"/>

          {/* Random Data Pattern Dots */}
          <rect x="35" y="10" width="8" height="8"/>
          <rect x="48" y="5" width="8" height="8"/>
          <rect x="58" y="15" width="8" height="8"/>

          <rect x="10" y="35" width="8" height="8"/>
          <rect x="23" y="45" width="8" height="8"/>

          <rect x="40" y="35" width="20" height="20" rx="3" fill="#00c7b7"/>
          <circle cx="50" cy="45" r="5" fill="black"/>

          <rect x="70" y="35" width="8" height="8"/>
          <rect x="85" y="45" width="8" height="8"/>

          <rect x="38" y="70" width="8" height="8"/>
          <rect x="52" y="80" width="8" height="8"/>
          <rect x="70" y="75" width="20" height="15"/>
        </svg>
      </div>
      <div className="font-space text-[10px] font-bold text-[var(--accent-primary)] uppercase tracking-wider">
        SCAN vCARD / CONTACT
      </div>
      <div className="font-space text-[9px] text-[var(--text-muted)] mt-0.5">
        Save Sowndharya P.L to Mobile Contacts
      </div>
    </div>
  );
}
