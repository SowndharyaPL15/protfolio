"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PatientCase {
  id: string;
  name: string;
  age: number;
  gender: string;
  patientUuid: string;
  reportId: string;
  analysisDate: string;
  smokingHistory: string;
  familyHistory: string;
  prevCancerHistory: string;
  brcaStatus: string;
  clinicalSymptoms: string;
  specimenType: string;
  primaryDiagnosis: string;
  isMalignant: boolean;
  confidenceScore: number;
  stageIndication: string;
  breakdown: {
    label: string;
    code: string;
    percentage: number;
    color: string;
  }[];
  biomarkers: {
    marker: string;
    result: string;
    status: "positive" | "negative" | "intermediate" | "pending";
    clinicalImpact: string;
  }[];
  recommendations: string[];
  gradCamDetails: {
    model: string;
    cellularFeatures: string;
    heatmapFocus: string;
  };
}

const SAMPLE_CASES: PatientCase[] = [
  {
    id: "case-sri",
    name: "sri",
    age: 45,
    gender: "Female",
    patientUuid: "cd2e083a-1d52-423c-af28-ac3d2829dfe6",
    reportId: "ba932c90-78cf-4fe2-8474-57095895d3a4",
    analysisDate: "10/9/2026, 9:39:06 pm",
    smokingHistory: "Never",
    familyHistory: "No",
    prevCancerHistory: "No",
    brcaStatus: "Unknown",
    clinicalSymptoms: "None reported (Incidental pulmonary solitary nodule)",
    specimenType: "CT-Guided Core Needle Biopsy (Left Lower Lobe)",
    primaryDiagnosis: "Squamous Cell Carcinoma (Malignant)",
    isMalignant: true,
    confidenceScore: 92.3,
    stageIndication: "Stage IIA (cT2a N0 M0)",
    breakdown: [
      { label: "Lung Squamous Cell Carcinoma (SCC)", code: "SCC", percentage: 92.3, color: "#f59e0b" },
      { label: "Lung Adenocarcinoma (ACA)", code: "ACA", percentage: 4.7, color: "#ef4444" },
      { label: "Benign (Normal Parenchyma)", code: "BENIGN", percentage: 3.0, color: "#10b981" },
    ],
    biomarkers: [
      { marker: "p40 / p63 Immunohistochemistry", result: "Strong Diffuse Nuclear Positive (>95%)", status: "positive", clinicalImpact: "Confirms Squamous Cell Lineage" },
      { marker: "TTF-1 (Thyroid Transcription Factor)", result: "Negative", status: "negative", clinicalImpact: "Rules out primary adenocarcinoma" },
      { marker: "PD-L1 Expression (TPS)", result: "45% (High Positive Expression)", status: "positive", clinicalImpact: "Candidate for 1st-Line Immunotherapy (Pembrolizumab)" },
      { marker: "EGFR Mutation (Exons 18-21)", result: "Wild Type (No Mutation Detected)", status: "negative", clinicalImpact: "Tyrosine Kinase Inhibitors Not Indicated" },
    ],
    recommendations: [
      "Immediate urgent referral to Multidisciplinary Thoracic Oncology Tumor Board (MTB).",
      "Order whole-body 18F-FDG PET-CT scan to rule out distant micro-metastases.",
      "Conduct pulmonary function tests (PFTs) to evaluate surgical resectability candidate status.",
      "Consider neoadjuvant chemo-immunotherapy regimen based on PD-L1 TPS (45%)."
    ],
    gradCamDetails: {
      model: "DenseNet-121 + Grad-CAM XAI Explainability Attention Engine",
      cellularFeatures: "Atypical squamous epithelial sheets with prominent intercellular bridges, marked nuclear pleomorphism, and keratinization whorls.",
      heatmapFocus: "High activation intensity over central dense malignant keratinized clusters (Coordinates: X:210, Y:135)."
    }
  },
  {
    id: "case-meera",
    name: "Meera K.",
    age: 52,
    gender: "Female",
    patientUuid: "8f7190ba-3321-4ba2-9901-ecb7811902aa",
    reportId: "a1402fe9-1920-4491-b921-9988220011cc",
    analysisDate: "10/9/2026, 8:15:22 pm",
    smokingHistory: "Former (Quit 12 yrs)",
    familyHistory: "Maternal Breast Cancer",
    prevCancerHistory: "No",
    brcaStatus: "BRCA1 Negative / BRCA2 Negative",
    clinicalSymptoms: "Persistent dry cough, mild hemoptysis",
    specimenType: "Bronchoscopic Endobronchial Biopsy (Right Upper Lobe)",
    primaryDiagnosis: "Invasive Lung Adenocarcinoma (ACA)",
    isMalignant: true,
    confidenceScore: 96.4,
    stageIndication: "Stage IB (cT2a N0 M0)",
    breakdown: [
      { label: "Lung Adenocarcinoma (ACA)", code: "ACA", percentage: 96.4, color: "#ef4444" },
      { label: "Lung Squamous Cell Carcinoma (SCC)", code: "SCC", percentage: 2.4, color: "#f59e0b" },
      { label: "Benign (Normal Parenchyma)", code: "BENIGN", percentage: 1.2, color: "#10b981" },
    ],
    biomarkers: [
      { marker: "TTF-1 & Napsin A", result: "Strong Diffuse Positive", status: "positive", clinicalImpact: "Confirms Adenocarcinoma Primary" },
      { marker: "EGFR Exon 19 Deletion", result: "Positive (p.E746_A750del)", status: "positive", clinicalImpact: "Eligible for Osimertinib Targeted Therapy" },
      { marker: "ALK Fusion Gene (FISH)", result: "Negative", status: "negative", clinicalImpact: "ALK inhibitors not indicated" },
      { marker: "PD-L1 TPS", result: "12% (Low-Intermediate)", status: "intermediate", clinicalImpact: "Secondary consideration" },
    ],
    recommendations: [
      "Consult Medical Oncologist for 1st-line Osimertinib (EGFR-TKI) targeted therapy protocol.",
      "Perform brain MRI with contrast to establish baseline CNS staging.",
      "Baseline cardiac monitoring (ECHO/ECG) prior to starting targeted kinase inhibition.",
    ],
    gradCamDetails: {
      model: "DenseNet-121 + Grad-CAM XAI Explainability Attention Engine",
      cellularFeatures: "Glandular formation with mucin secretion, enlarged hyperchromatic nuclei, and micropapillary architectural patterns.",
      heatmapFocus: "Dense Grad-CAM attention focused on infiltrative cribriform acinar glands."
    }
  }
];

export default function PrecisionOncologyReport() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [heatmapOverlay, setHeatmapOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState<"clinical" | "biomarkers" | "xai" | "audit">("clinical");
  const [isPrinting, setIsPrinting] = useState(false);

  const currentCase = SAMPLE_CASES[selectedCaseIndex];

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 150);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 cyber-panel p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-space text-xs font-bold text-glow">
            METROPOLITAN ONCOLOGY CDSS ENGINE v3.2
          </span>
          <span className="hidden sm:inline-block font-space text-[10px] px-2 py-0.5 rounded bg-[var(--glow-xs)] border border-[var(--border-accent)] text-[var(--accent-primary)]">
            ISO 15189 / CAP Certified
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Patient Selector */}
          <select
            value={selectedCaseIndex}
            onChange={(e) => setSelectedCaseIndex(Number(e.target.value))}
            className="font-space text-xs px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] outline-none cursor-pointer focus:border-[var(--accent-primary)]"
          >
            {SAMPLE_CASES.map((c, i) => (
              <option key={c.id} value={i}>
                Patient: {c.name.toUpperCase()} ({c.primaryDiagnosis.split(" ")[0]})
              </option>
            ))}
          </select>

          {/* Print/Download Button */}
          <button
            onClick={handlePrint}
            className="cyber-button font-space text-xs px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 hover:scale-105 transition-all"
            style={{ background: "var(--gradient-primary)", color: "#000", border: "none" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24-1.077-.32-2.18-.32-3.329 0-4.97 3.82-9 8.533-9 4.713 0 8.534 4.03 8.534 9 0 1.149-.08 2.252-.32 3.329m-16.427 0A9 9 0 0015 21a9 9 0 008.273-7.171m-16.546 0h16.546M12 9v6m0 0l-3-3m3 3l3-3" />
            </svg>
            <span>{isPrinting ? "Generating..." : "Print / PDF Report"}</span>
          </button>
        </div>
      </div>

      {/* Main Medical Report Sheet (White/Clinical High-End Paper or Theme Aware) */}
      <div
        id="clinical-report-printable"
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all shadow-2xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-accent)",
          boxShadow: "0 0 40px var(--glow-xs), 0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        {/* Top Laboratory Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b-2" style={{ borderColor: "#2563eb" }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold font-space text-sm">
                ✚
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight font-space text-blue-600 dark:text-blue-400">
                PRECISION ONCOLOGY CLINICAL REPORT
              </h1>
            </div>
            <p className="font-space text-xs font-semibold text-gray-600 dark:text-gray-300">
              AI-Powered Diagnostic Decision Support System (CDSS) · Deep Transfer Learning & Explainable AI
            </p>
          </div>

          <div className="text-left md:text-right font-space">
            <div className="font-bold text-sm tracking-wider text-gray-900 dark:text-gray-100 uppercase">
              METROPOLITAN ONCOLOGY
            </div>
            <div className="text-[10px] text-gray-500 font-mono tracking-tighter">
              ID: {currentCase.reportId}
            </div>
            <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              ✓ CLINICAL VALIDATION VERIFIED
            </div>
          </div>
        </div>

        {/* Navigation Sub-Tabs within Report */}
        <div className="flex flex-wrap gap-2 pt-4 pb-2 border-b border-[var(--border-subtle)]">
          {[
            { id: "clinical", label: "📋 Patient & Diagnosis" },
            { id: "xai", label: "🔬 Grad-CAM Histopathology" },
            { id: "biomarkers", label: "🧬 Molecular Biomarkers" },
            { id: "audit", label: "🔒 Cryptographic Audit" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="font-space text-xs px-3 py-1.5 rounded-lg transition-all font-bold"
              style={{
                background: activeTab === tab.id ? "var(--accent-primary)" : "var(--glow-xs)",
                color: activeTab === tab.id ? "#000" : "var(--text-muted)",
                border: `1px solid ${activeTab === tab.id ? "var(--accent-primary)" : "var(--border-subtle)"}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Clinical Diagnosis & Specifications */}
        {activeTab === "clinical" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 pt-4"
          >
            {/* Patient Specifications Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-space text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                  Patient Specifications
                </h2>
                <span className="font-space text-[10px] text-gray-500">
                  Accession Specimen: {currentCase.specimenType}
                </span>
              </div>

              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl font-space text-xs"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
              >
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Patient Name:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100 capitalize">{currentCase.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Age / Gender:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.age} / {currentCase.gender}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-gray-500 block uppercase">Patient ID (UUID):</span>
                  <span className="font-mono text-[11px] font-semibold text-gray-800 dark:text-gray-200 break-all">{currentCase.patientUuid}</span>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Smoking History:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.smokingHistory}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Family History:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.familyHistory}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Prev Cancer History:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.prevCancerHistory}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">BRCA Status:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.brcaStatus}</span>
                </div>

                <div className="col-span-2 sm:col-span-2">
                  <span className="text-[10px] text-gray-500 block uppercase">Analysis Date:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.analysisDate}</span>
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <span className="text-[10px] text-gray-500 block uppercase">Clinical Symptoms:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.clinicalSymptoms}</span>
                </div>
              </div>
            </div>

            {/* AI Pulmonary Prediction Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-space text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="text-blue-500">⚡</span> AI Pulmonary Diagnostic Prediction
                </h2>
                <span className="font-space text-xs px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-500/40 text-red-600 dark:text-red-400 font-bold">
                  {currentCase.stageIndication}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Diagnostic Classification Card (Hero Box) */}
                <div
                  className="md:col-span-5 p-5 rounded-xl flex flex-col justify-between items-center text-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.02))",
                    border: "2px solid rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <div className="w-full text-left">
                    <span className="font-space text-[10px] uppercase font-bold tracking-widest text-red-500">
                      PRIMARY DIAGNOSTIC CLASSIFICATION
                    </span>
                  </div>

                  <div className="my-4">
                    <h3 className="font-space text-xl md:text-2xl font-black text-red-600 dark:text-red-400 leading-tight">
                      {currentCase.primaryDiagnosis}
                    </h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-space text-xs font-bold text-red-600 dark:text-red-300">
                        Confidence Score: {currentCase.confidenceScore}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full pt-2 border-t border-red-200 dark:border-red-900/40 flex items-center justify-between font-space text-[10px] text-gray-500">
                    <span>Model: DenseNet-121</span>
                    <span>Validation: 97.8% Accuracy</span>
                  </div>
                </div>

                {/* Classification Breakdown Table & Telemetry */}
                <div
                  className="md:col-span-7 p-5 rounded-xl flex flex-col justify-between"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-space text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200">
                        Multi-Class Probability Breakdown
                      </h3>
                      <span className="font-space text-[10px] text-gray-500 font-mono">Softmax Logits</span>
                    </div>

                    <div className="space-y-3.5">
                      {currentCase.breakdown.map((item) => (
                        <div key={item.code} className="space-y-1">
                          <div className="flex items-center justify-between font-space text-xs font-semibold">
                            <span className="text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
                              {item.label}
                            </span>
                            <span className="font-mono font-bold" style={{ color: item.color }}>
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                            <motion.div
                              className="h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              style={{ background: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] font-space text-[10px] text-gray-500 flex items-center justify-between">
                    <span>Threshold Cutoff: &gt; 85.0% for definitive reporting</span>
                    <span className="text-emerald-500 font-bold">✓ High Confidence Pass</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pathologist & Clinical Recommendations */}
            <div
              className="p-5 rounded-xl border border-blue-500/30"
              style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.06), transparent)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🛡️</span>
                <h3 className="font-space text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Oncological Decision Support Recommendations
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {currentCase.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-space text-gray-700 dark:text-gray-300">
                    <span className="text-blue-500 font-bold mt-0.5">[{idx + 1}]</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Grad-CAM Explainable AI Visualization */}
        {activeTab === "xai" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-space text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                  Histopathology Grad-CAM Visual Attention Map
                </h3>
                <p className="font-space text-xs text-gray-500">
                  Explainable AI (XAI) heatmap highlighting cellular features influencing neural classification
                </p>
              </div>

              <button
                onClick={() => setHeatmapOverlay(!heatmapOverlay)}
                className="font-space text-xs px-3 py-1.5 rounded-lg font-bold border border-theme flex items-center gap-2 transition-all hover:bg-[var(--glow-sm)]"
                style={{ color: heatmapOverlay ? "#ef4444" : "var(--text-main)" }}
              >
                <span>{heatmapOverlay ? "Heatmap: ACTIVE (ON)" : "Heatmap: RAW (OFF)"}</span>
              </button>
            </div>

            {/* Interactive Biopsy Viewer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 rounded-xl overflow-hidden border border-[var(--border-subtle)] relative aspect-[16/10] bg-black">
                {/* SVG Histopathology simulation */}
                <svg viewBox="0 0 400 250" className="w-full h-full">
                  <defs>
                    <radialGradient id="gradcamHeat" cx="50%" cy="50%" r="45%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={heatmapOverlay ? 0.85 : 0} />
                      <stop offset="45%" stopColor="#f59e0b" stopOpacity={heatmapOverlay ? 0.6 : 0} />
                      <stop offset="75%" stopColor="#10b981" stopOpacity={heatmapOverlay ? 0.3 : 0} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Microscopic Tissue Background (H&E stain purple/pink simulation) */}
                  <rect width="400" height="250" fill="#2d1b4e" />

                  {/* Cellular Morphology Stroma */}
                  <g opacity="0.6" stroke="#c084fc" strokeWidth="1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <circle
                        key={i}
                        cx={(i * 37) % 380 + 15}
                        cy={(i * 29) % 230 + 15}
                        r={12 + (i % 7)}
                        fill="#581c87"
                        opacity="0.7"
                      />
                    ))}
                  </g>

                  {/* Malignant Squamous Cell Nest */}
                  <g transform="translate(190, 120)">
                    <circle cx="0" cy="0" r="55" fill="#7e22ce" stroke="#e879f9" strokeWidth="2" />
                    <circle cx="-15" cy="-10" r="18" fill="#9333ea" />
                    <circle cx="15" cy="15" r="22" fill="#a855f7" />
                    <circle cx="0" cy="0" r="12" fill="#fdf4ff" opacity="0.9" />
                  </g>

                  {/* Grad-CAM Heatmap Overlay */}
                  <circle cx="200" cy="125" r="85" fill="url(#gradcamHeat)" />

                  {/* Crosshairs & Bounding Reticle */}
                  {heatmapOverlay && (
                    <g stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3">
                      <rect x="135" y="60" width="130" height="130" rx="8" fill="none" />
                      <line x1="200" y1="45" x2="200" y2="205" strokeWidth="0.8" />
                      <line x1="120" y1="125" x2="280" y2="125" strokeWidth="0.8" />
                    </g>
                  )}
                </svg>

                {/* Live Floating Telemetry on Image */}
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 backdrop-blur text-white font-space text-[10px]">
                  <span>Mag: 400× | H&amp;E Stain | Tile: LLL_B04</span>
                </div>
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-red-600/90 text-white font-space text-[10px] font-bold">
                  <span>Grad-CAM Peak: 0.942</span>
                </div>
              </div>

              {/* XAI Explanation Details */}
              <div
                className="md:col-span-5 p-4 rounded-xl flex flex-col justify-between space-y-3"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
              >
                <div>
                  <span className="font-space text-[10px] uppercase tracking-widest text-blue-500 font-bold block mb-1">
                    AI ATTENTION INTERPRETATION
                  </span>
                  <div className="space-y-2 font-space text-xs text-gray-700 dark:text-gray-300">
                    <div>
                      <span className="text-gray-500 text-[10px] block">Model Architecture:</span>
                      <span className="font-bold">{currentCase.gradCamDetails.model}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">Cellular Morphology Features:</span>
                      <p className="text-[11px] leading-relaxed mt-0.5">{currentCase.gradCamDetails.cellularFeatures}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">Heatmap Target Region:</span>
                      <p className="text-[11px] leading-relaxed mt-0.5 text-amber-600 dark:text-amber-400 font-semibold">{currentCase.gradCamDetails.heatmapFocus}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 font-space text-[10px] text-blue-700 dark:text-blue-300">
                  💡 <strong>Pathologist Note:</strong> Explainable AI alignment with atypical keratinization provides high concordance with manual microscopic examination.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Molecular Biomarkers Panel */}
        {activeTab === "biomarkers" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-space text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                Molecular Biomarker &amp; Immunohistochemistry Panel
              </h3>
              <span className="font-space text-[10px] text-gray-500">Next-Generation Pathology</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full font-space text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--border-subtle)] text-left text-gray-500 text-[10px] uppercase">
                    <th className="py-2 px-3">Biomarker / Assay</th>
                    <th className="py-2 px-3">Clinical Result</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Therapeutic Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {currentCase.biomarkers.map((bm, i) => (
                    <tr key={i} className="hover:bg-[var(--glow-xs)] transition-colors">
                      <td className="py-2.5 px-3 font-bold text-gray-900 dark:text-gray-100">{bm.marker}</td>
                      <td className="py-2.5 px-3 text-gray-700 dark:text-gray-300 font-medium">{bm.result}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            bm.status === "positive"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                              : bm.status === "negative"
                              ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                          }`}
                        >
                          {bm.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400 text-[11px]">{bm.clinicalImpact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Cryptographic Audit & Blockchain Integrity */}
        {activeTab === "audit" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-space text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                Cryptographic Audit Trail &amp; Verification Hashes
              </h3>
              <span className="font-space text-[10px] text-emerald-500 font-bold">🔒 Immutable Ledger Recorded</span>
            </div>

            <div
              className="p-4 rounded-xl font-mono text-xs space-y-3"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
            >
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Report Cryptographic SHA-256 Checksum:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold break-all">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Digital Attestation Signature:</span>
                <span className="text-blue-600 dark:text-blue-400 break-all">
                  SIG_ONCO_CDSS_ECDSA_99a810cd837482910fa31290bbce88124509ad77
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Inference Execution Node:</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Node-Cluster-US-East-04 · PyTorch 2.3 · NVIDIA TensorRT A100 Engine (Execution time: 382ms)
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Official Medical Signoff Footer */}
        <div className="mt-8 pt-4 border-t-2 border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-space text-[10px] text-gray-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded border border-gray-300 dark:border-gray-700 flex items-center justify-center text-xs font-bold text-center leading-none">
              SEAL<br/>CERT
            </div>
            <div>
              <div className="font-bold text-gray-800 dark:text-gray-200 text-xs">Dr. E. Vance, MD, PhD, FCAP</div>
              <div>Chief of Molecular Pathology &amp; AI Diagnostics</div>
              <div>Metropolitan Oncology Center</div>
            </div>
          </div>

          <div className="text-right">
            <div>Electronic Signature ID: <span className="font-mono text-gray-700 dark:text-gray-300">MET-ONCO-9482-VAL</span></div>
            <div>Generated by Sowndharya P.L. Precision Oncology CDSS</div>
            <div className="text-emerald-600 font-bold">Confidential Medical Record · HIPAA/GDPR Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}
