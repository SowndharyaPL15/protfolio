"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PatientCase {
  id: string;
  name: string;
  age: number;
  gender: string;
  organ: "Lung" | "Breast";
  dataset: "LC25000" | "BreakHis";
  slideImage: string;
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
  gradCamPeak: string;
  heatmapCoords: {
    cx1: string;
    cy1: string;
    cx2: string;
    cy2: string;
    rx: number;
    ry: number;
    rw: number;
    rh: number;
  };
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
    organ: "Lung",
    dataset: "LC25000",
    slideImage: "/projects/precision-oncology/slide_sri.jpg",
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
    gradCamPeak: "0.942 (High Saliency)",
    heatmapCoords: {
      cx1: "50%",
      cy1: "50%",
      cx2: "72%",
      cy2: "28%",
      rx: 310,
      ry: 180,
      rw: 380,
      rh: 380,
    },
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
      heatmapFocus: "High activation intensity over central dense malignant keratinized clusters (Coordinates: X:500, Y:375)."
    }
  },
  {
    id: "case-meera",
    name: "Meera K.",
    age: 52,
    gender: "Female",
    organ: "Breast",
    dataset: "BreakHis",
    slideImage: "/projects/precision-oncology/slide_breast.jpg",
    patientUuid: "8f7190ba-3321-4ba2-9901-ecb7811902aa",
    reportId: "a1402fe9-1920-4491-b921-9988220011cc",
    analysisDate: "10/9/2026, 8:15:22 pm",
    smokingHistory: "Former (Quit 12 yrs)",
    familyHistory: "Maternal Breast Cancer",
    prevCancerHistory: "No",
    brcaStatus: "BRCA1 Negative / BRCA2 Negative",
    clinicalSymptoms: "Palpable painless retroareolar mass, Right Breast",
    specimenType: "Core Needle Biopsy (Right Breast 10 o'clock position)",
    primaryDiagnosis: "Invasive Ductal Carcinoma (IDC - Malignant)",
    isMalignant: true,
    confidenceScore: 96.4,
    stageIndication: "Stage IIB (cT2 N1 M0)",
    gradCamPeak: "0.968 (High Saliency)",
    heatmapCoords: {
      cx1: "52%",
      cy1: "52%",
      cx2: "45%",
      cy2: "38%",
      rx: 260,
      ry: 150,
      rw: 480,
      rh: 440,
    },
    breakdown: [
      { label: "Invasive Ductal Carcinoma (IDC)", code: "IDC", percentage: 96.4, color: "#ef4444" },
      { label: "Lobular Carcinoma (ILC)", code: "ILC", percentage: 2.4, color: "#f59e0b" },
      { label: "Benign Fibroadenoma", code: "BENIGN", percentage: 1.2, color: "#10b981" },
    ],
    biomarkers: [
      { marker: "Estrogen Receptor (ER)", result: "Positive (>85% Nuclear Staining)", status: "positive", clinicalImpact: "Candidate for Endocrine Therapy (Tamoxifen/Aromatase Inhibitors)" },
      { marker: "Progesterone Receptor (PR)", result: "Positive (75% Strong Staining)", status: "positive", clinicalImpact: "Confirms Hormone-Receptor Positive Subtype" },
      { marker: "HER2/neu (IHC & FISH)", result: "Negative (Score 1+ Non-Amplified)", status: "negative", clinicalImpact: "Trastuzumab/HER2 targeted agents not indicated" },
      { marker: "Ki-67 Proliferation Index", result: "28% (High Proliferation)", status: "positive", clinicalImpact: "Indicates Luminal B Molecular Subtype" },
    ],
    recommendations: [
      "Refer to Breast Multidisciplinary Oncology Clinic for surgical staging and lumpectomy/mastectomy consultation.",
      "Conduct bilateral diagnostic mammography and breast MRI to assess multifocality.",
      "Plan adjuvant endocrine therapy regimen (Aromatase Inhibitors + ovarian suppression).",
    ],
    gradCamDetails: {
      model: "DenseNet-121 + Grad-CAM XAI Explainability Attention Engine",
      cellularFeatures: "Infiltrative sheets of pleomorphic malignant ductal epithelial cells disrupting normal basement membrane with stromal desmoplasia.",
      heatmapFocus: "Peak neural activation over invasive cribriform ductal nests and nuclear atypia core."
    }
  },
  {
    id: "case-ananya",
    name: "Ananya R.",
    age: 38,
    gender: "Female",
    organ: "Breast",
    dataset: "BreakHis",
    slideImage: "/projects/precision-oncology/slide_breast.jpg",
    patientUuid: "4e901a1c-9921-4f11-a889-1122334455aa",
    reportId: "c2299881-8811-44bb-9900-334455667788",
    analysisDate: "10/9/2026, 7:40:15 pm",
    smokingHistory: "Never",
    familyHistory: "No",
    prevCancerHistory: "No",
    brcaStatus: "Negative",
    clinicalSymptoms: "Mobile, well-circumscribed lump in Left Upper Outer Quadrant",
    specimenType: "Ultrasound-Guided Biopsy (Left Breast)",
    primaryDiagnosis: "Benign Fibroadenoma (Non-Malignant)",
    isMalignant: false,
    confidenceScore: 97.2,
    stageIndication: "Benign Lesion (Non-Neoplastic / Low Risk)",
    gradCamPeak: "0.210 (Low Basal Activation)",
    heatmapCoords: {
      cx1: "50%",
      cy1: "50%",
      cx2: "50%",
      cy2: "50%",
      rx: 200,
      ry: 150,
      rw: 600,
      rh: 450,
    },
    breakdown: [
      { label: "Benign Fibroadenoma", code: "BENIGN", percentage: 97.2, color: "#10b981" },
      { label: "Fibrocystic Changes", code: "FCC", percentage: 2.1, color: "#38bdf8" },
      { label: "Invasive Ductal Carcinoma (IDC)", code: "IDC", percentage: 0.7, color: "#ef4444" },
    ],
    biomarkers: [
      { marker: "Cellular Atypia IHC", result: "Negative", status: "negative", clinicalImpact: "Confirms benign stromal and epithelial proliferation" },
      { marker: "E-Cadherin Expression", result: "Intact Membranous", status: "positive", clinicalImpact: "Normal ductal cohesion maintained" },
      { marker: "p63 Myoepithelial Layer", result: "Continuous Intact Layer", status: "positive", clinicalImpact: "Confirms non-infiltrative benign state" },
    ],
    recommendations: [
      "No oncological surgical intervention required; benign finding.",
      "Routine 6-month clinical and ultrasound follow-up to document dimensional stability.",
      "Reassurance provided to patient; self-breast examination education."
    ],
    gradCamDetails: {
      model: "DenseNet-121 + Grad-CAM XAI Explainability Attention Engine",
      cellularFeatures: "Biphasic proliferation of stromal and regular epithelial components with preserved myoepithelial cell layer.",
      heatmapFocus: "Uniform low-intensity background attention; absence of focal malignancy activations."
    }
  },
  {
    id: "case-david",
    name: "David R.",
    age: 61,
    gender: "Male",
    organ: "Lung",
    dataset: "LC25000",
    slideImage: "/projects/precision-oncology/slide_sri.jpg",
    patientUuid: "91823746-1234-4567-8901-abcdef123456",
    reportId: "ff001122-3344-5566-7788-99aabbccddee",
    analysisDate: "10/9/2026, 6:30:00 pm",
    smokingHistory: "Former (Quit 20 yrs)",
    familyHistory: "Paternal Colon Cancer",
    prevCancerHistory: "No",
    brcaStatus: "Unknown",
    clinicalSymptoms: "Post-infectious chronic cough follow-up",
    specimenType: "Transbronchial Lung Biopsy (Right Middle Lobe)",
    primaryDiagnosis: "Benign Pulmonary Parenchyma (Normal / Reactive)",
    isMalignant: false,
    confidenceScore: 98.4,
    stageIndication: "Benign / Non-Malignant (No Dysplasia)",
    gradCamPeak: "0.185 (Low Basal Activation)",
    heatmapCoords: {
      cx1: "50%",
      cy1: "50%",
      cx2: "50%",
      cy2: "50%",
      rx: 200,
      ry: 150,
      rw: 600,
      rh: 450,
    },
    breakdown: [
      { label: "Benign (Normal Parenchyma)", code: "BENIGN", percentage: 98.4, color: "#10b981" },
      { label: "Reactive Metaplasia", code: "REACTIVE", percentage: 1.1, color: "#38bdf8" },
      { label: "Adenocarcinoma (ACA)", code: "ACA", percentage: 0.5, color: "#ef4444" },
    ],
    biomarkers: [
      { marker: "p40 & p63 IHC", result: "Negative for Invasive Carcinoma", status: "negative", clinicalImpact: "Rules out squamous malignancy" },
      { marker: "Cytokeratin AE1/AE3", result: "Normal Bronchial Distribution", status: "positive", clinicalImpact: "Normal epithelial architecture" },
      { marker: "Ki-67 Proliferation", result: "<2% (Normal Baseline)", status: "negative", clinicalImpact: "No malignant hyper-proliferation" },
    ],
    recommendations: [
      "No oncological treatment indicated; benign inflammatory changes.",
      "Repeat low-dose chest CT in 12 months for routine pulmonary nodule surveillance.",
      "Symptomatic management of post-viral reactive airway."
    ],
    gradCamDetails: {
      model: "DenseNet-121 + Grad-CAM XAI Explainability Attention Engine",
      cellularFeatures: "Normal alveolar septa with delicate capillaries and regular bronchial pseudostratified ciliated epithelium.",
      heatmapFocus: "Uniform basal distribution without localized malignant focal points."
    }
  }
];

export default function PrecisionOncologyReport() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"clinical" | "xai" | "biomarkers" | "audit">("xai");
  const [xaiViewMode, setXaiViewMode] = useState<"original" | "heatmap" | "overlay">("overlay");
  const [heatmapOpacity, setHeatmapOpacity] = useState(50);
  const [blendMode, setBlendMode] = useState("normal");
  const [zoomScale, setZoomScale] = useState(1.0);
  const [showReticle, setShowReticle] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);

  const currentCase = SAMPLE_CASES[selectedCaseIndex];

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 150);
  };

  const handleResetZoom = () => {
    setZoomScale(1.0);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 1.0));
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 cyber-panel p-3.5 rounded-xl border border-[var(--border-accent)] bg-[var(--bg-surface)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-space text-xs font-bold text-glow">
            METROPOLITAN ONCOLOGY CDSS ENGINE v3.4
          </span>
          <span className="hidden sm:inline-block font-space text-[10px] px-2 py-0.5 rounded bg-[var(--glow-xs)] border border-[var(--border-accent)] text-[var(--accent-primary)] font-bold">
            ISO 15189 / CAP Certified
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Organ Quick Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-subtle)]">
            <button
              onClick={() => setSelectedCaseIndex(0)}
              className={`font-space text-[11px] px-2.5 py-1 rounded-md font-bold transition-all ${
                currentCase.organ === "Lung"
                  ? "bg-[var(--accent-primary)] text-black shadow-sm"
                  : "text-[var(--text-muted)] hover:text-main"
              }`}
            >
              🫁 Lung (LC25000)
            </button>
            <button
              onClick={() => setSelectedCaseIndex(1)}
              className={`font-space text-[11px] px-2.5 py-1 rounded-md font-bold transition-all ${
                currentCase.organ === "Breast"
                  ? "bg-[var(--accent-primary)] text-black shadow-sm"
                  : "text-[var(--text-muted)] hover:text-main"
              }`}
            >
              🎗️ Breast (BreakHis)
            </button>
          </div>

          {/* Patient Selector */}
          <select
            value={selectedCaseIndex}
            onChange={(e) => setSelectedCaseIndex(Number(e.target.value))}
            className="font-space text-xs px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] outline-none cursor-pointer focus:border-[var(--accent-primary)]"
          >
            {SAMPLE_CASES.map((c, i) => (
              <option key={c.id} value={i}>
                Patient: {c.name.toUpperCase()} · {c.organ} ({c.primaryDiagnosis.split(" ")[0]})
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

      {/* Main Medical Report Sheet */}
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
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold font-space text-sm shadow-md">
                ✚
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight font-space text-blue-600 dark:text-blue-400">
                PRECISION ONCOLOGY CLINICAL REPORT
              </h1>
            </div>
            <p className="font-space text-xs font-semibold text-gray-600 dark:text-gray-300">
              AI-Powered Diagnostic Decision Support System (CDSS) · Deep Transfer Learning &amp; Explainable AI
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
            { id: "xai", label: "🔬 Grad-CAM Histopathology" },
            { id: "clinical", label: "📋 Patient & Diagnosis" },
            { id: "biomarkers", label: "🧬 Molecular Biomarkers" },
            { id: "audit", label: "🔒 Cryptographic Audit" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="font-space text-xs px-3.5 py-1.5 rounded-lg transition-all font-bold"
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

        {/* Tab 1: Grad-CAM Explainable AI Visualization (Exact match to User Screenshot + 100% same length & breadth) */}
        {activeTab === "xai" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-4"
          >
            {/* Dark Container exactly matching the user's uploaded screenshot */}
            <div className="rounded-2xl p-5 md:p-6 bg-[#161d26] text-white border border-[#2d3748] shadow-2xl space-y-4">
              {/* Header Bar: Title with Blue Checkmark + Zoom Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-xs font-bold shadow">
                    ✓
                  </div>
                  <h2 className="font-space text-base md:text-lg font-bold text-white tracking-wide">
                    Explainable AI (Grad-CAM Visualizations)
                  </h2>
                </div>

                {/* Zoom Tools */}
                <div className="flex items-center gap-2 font-space text-xs">
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="p-1.5 rounded-md border border-[#374151] bg-[#1f2937] text-gray-300 hover:text-white hover:border-[#00c7b7] transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="p-1.5 rounded-md border border-[#374151] bg-[#1f2937] text-gray-300 hover:text-white hover:border-[#00c7b7] transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </button>
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="p-1.5 rounded-md border border-[#374151] bg-[#1f2937] text-gray-300 hover:text-white hover:border-[#00c7b7] transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM7.5 10.5h6" />
                    </svg>
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-3 py-1.5 rounded-md border border-[#374151] bg-[#1f2937] text-gray-200 hover:text-white hover:border-[#00c7b7] text-[11px] font-semibold transition-all"
                  >
                    Reset Zoom
                  </button>
                </div>
              </div>

              {/* Mode Switcher Pills (Black Capsule Container) */}
              <div className="flex justify-center">
                <div className="inline-flex p-1 rounded-xl bg-[#0b0f14] border border-[#2d3748] shadow-inner gap-1">
                  <button
                    onClick={() => setXaiViewMode("original")}
                    className={`font-space text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      xaiViewMode === "original"
                        ? "bg-[#00c7b7] text-black shadow-lg shadow-[#00c7b7]/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>🖼</span>
                    <span>Original Slide</span>
                  </button>

                  <button
                    onClick={() => setXaiViewMode("heatmap")}
                    className={`font-space text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      xaiViewMode === "heatmap"
                        ? "bg-[#00c7b7] text-black shadow-lg shadow-[#00c7b7]/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>🌡</span>
                    <span>Heatmap</span>
                  </button>

                  <button
                    onClick={() => setXaiViewMode("overlay")}
                    className={`font-space text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      xaiViewMode === "overlay"
                        ? "bg-[#00c7b7] text-black shadow-lg shadow-[#00c7b7]/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>🔍</span>
                    <span>Overlay</span>
                  </button>
                </div>
              </div>

              {/* Histopathology Image & Grad-CAM Canvas (EXACT SAME LENGTH & BREADTH 100% ALIGNED) */}
              <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto rounded-xl overflow-hidden bg-black select-none border border-[#374151] shadow-2xl">
                {/* Scaled viewport container for smooth zoom */}
                <div
                  className="w-full h-full relative transition-transform duration-200 origin-center"
                  style={{ transform: `scale(${zoomScale})` }}
                >
                  {/* Layer 1: Original Slide Image (100% width, 100% height, full bleed) */}
                  <img
                    src={currentCase.slideImage}
                    alt={`${currentCase.organ} Histopathology - ${currentCase.primaryDiagnosis}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                      xaiViewMode === "heatmap" ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Layer 2: Grad-CAM Thermal Activation Heatmap (EXACT SAME length & breadth, 100% aligned from edge to edge) */}
                  <div
                    className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200 ${
                      xaiViewMode === "original" ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      opacity: xaiViewMode === "original" ? 0 : xaiViewMode === "heatmap" ? 1 : heatmapOpacity / 100,
                      mixBlendMode: xaiViewMode === "heatmap" ? "normal" : (blendMode as any),
                      background: xaiViewMode === "heatmap" ? "#0b0416" : "transparent",
                    }}
                  >
                    <svg
                      viewBox="0 0 1000 750"
                      preserveAspectRatio="none"
                      className="w-full h-full block"
                    >
                      <defs>
                        {/* Primary Saliency Radial Gradient */}
                        <radialGradient id="heatCore1" cx={currentCase.heatmapCoords.cx1} cy={currentCase.heatmapCoords.cy1} r="38%">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
                          <stop offset="22%" stopColor="#f97316" stopOpacity="0.85" />
                          <stop offset="48%" stopColor="#eab308" stopOpacity="0.70" />
                          <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.45" />
                          <stop offset="88%" stopColor="#3b82f6" stopOpacity="0.20" />
                          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                        </radialGradient>

                        {/* Secondary Infiltrative Gradient */}
                        <radialGradient id="heatCore2" cx={currentCase.heatmapCoords.cx2} cy={currentCase.heatmapCoords.cy2} r="30%">
                          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.90" />
                          <stop offset="28%" stopColor="#f59e0b" stopOpacity="0.75" />
                          <stop offset="55%" stopColor="#10b981" stopOpacity="0.40" />
                          <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      {/* Full-bleed ambient thermal heatmap layers spanning 1000x750 */}
                      <rect width="1000" height="750" fill="url(#heatCore1)" />
                      <rect width="1000" height="750" fill="url(#heatCore2)" />

                      {/* Cellular Reticle & Attention Boundary */}
                      {showReticle && (
                        <g stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6,6">
                          <rect
                            x={currentCase.heatmapCoords.rx}
                            y={currentCase.heatmapCoords.ry}
                            width={currentCase.heatmapCoords.rw}
                            height={currentCase.heatmapCoords.rh}
                            rx="14"
                            fill="rgba(56, 189, 248, 0.08)"
                          />
                        </g>
                      )}
                    </svg>
                  </div>

                  {/* Microscopic Telemetry Overlays */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur border border-white/10 text-white font-space text-[11px] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{currentCase.organ} Histopathology · Mag: 400× · {currentCase.dataset}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur border border-red-500/40 text-white font-space text-[11px] font-bold flex items-center gap-1.5">
                    <span className="text-red-400">🔥 Grad-CAM Peak:</span>
                    <span className="text-white font-mono">{currentCase.gradCamPeak}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Control Bar: Opacity Slider + Blend Mode Dropdown */}
              <div className="p-4 rounded-xl border border-[#2d3748] bg-[#0f141c] flex flex-col sm:flex-row items-center justify-between gap-4 font-space text-xs">
                {/* Opacity Slider */}
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
                  <span className="font-semibold text-gray-300 whitespace-nowrap text-xs">
                    Heatmap Opacity:
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={heatmapOpacity}
                    onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                    className="w-full accent-[#00c7b7] cursor-pointer h-2 bg-gray-700 rounded-lg"
                  />
                  <span className="font-mono font-bold text-[#00c7b7] min-w-[45px] text-right text-xs">
                    {heatmapOpacity}%
                  </span>
                </div>

                {/* Blend Mode Dropdown */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <span className="font-semibold text-gray-300 whitespace-nowrap text-xs">
                    Blend Mode:
                  </span>
                  <select
                    value={blendMode}
                    onChange={(e) => setBlendMode(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-[#374151] bg-[#1f2937] text-white font-space text-xs outline-none cursor-pointer focus:border-[#00c7b7] font-medium"
                  >
                    <option value="normal">Normal</option>
                    <option value="multiply">Multiply</option>
                    <option value="screen">Screen</option>
                    <option value="overlay">Overlay</option>
                    <option value="color-dodge">Color Dodge</option>
                    <option value="darken">Darken</option>
                    <option value="lighten">Lighten</option>
                    <option value="soft-light">Soft Light</option>
                    <option value="hard-light">Hard Light</option>
                    <option value="difference">Difference</option>
                  </select>

                  <button
                    onClick={() => setShowReticle(!showReticle)}
                    className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                      showReticle
                        ? "border-[#00c7b7] bg-[#00c7b7]/10 text-[#00c7b7]"
                        : "border-[#374151] bg-[#1f2937] text-gray-400"
                    }`}
                  >
                    Reticle: {showReticle ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              {/* User Specified Footnote */}
              <p className="font-space text-[11px] text-gray-400 text-center leading-relaxed">
                * Heatmap highlights deep features that contributed most heavily to the classification. Use opacity and blend controls to isolate core cell regions.
              </p>
            </div>

            {/* Neural Activation & Cellular Localization Summary */}
            <div
              className="p-4 rounded-xl border font-space text-xs space-y-3"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              <div className="font-bold uppercase tracking-wider text-blue-500 text-[10px]">
                NEURAL ACTIVATION &amp; CELLULAR LOCALIZATION SUMMARY
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Neural Architecture:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.gradCamDetails.model}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Cellular Features:</span>
                  <p className="text-[11px] mt-0.5 leading-snug">{currentCase.gradCamDetails.cellularFeatures}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Heatmap Focus:</span>
                  <p className="text-[11px] mt-0.5 leading-snug text-amber-600 dark:text-amber-400 font-semibold">{currentCase.gradCamDetails.heatmapFocus}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Clinical Diagnosis & Specifications */}
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
                  <span className="text-[10px] text-gray-500 block uppercase">BRCA Mutation Status:</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{currentCase.brcaStatus}</span>
                </div>

                <div className="col-span-2 sm:col-span-4 pt-1">
                  <span className="text-[10px] text-gray-500 block uppercase">Clinical Symptoms:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{currentCase.clinicalSymptoms}</span>
                </div>
              </div>
            </div>

            {/* AI Prediction & Confidence Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-space text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                  AI Pulmonary &amp; Oncological Prediction
                </h2>
                <span className="font-space text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  Ensemble DenseNet-121 Softmax Validation
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Diagnostic Classification Banner */}
                <div
                  className="p-5 rounded-xl border flex flex-col justify-between"
                  style={{
                    background: currentCase.isMalignant
                      ? "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.03))"
                      : "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.03))",
                    borderColor: currentCase.isMalignant ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)",
                  }}
                >
                  <div>
                    <span className="font-space text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">
                      Diagnostic Classification
                    </span>
                    <h3
                      className={`text-2xl sm:text-3xl font-extrabold font-space leading-tight ${
                        currentCase.isMalignant ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {currentCase.primaryDiagnosis}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between font-space text-xs">
                    <div>
                      <span className="text-gray-500 text-[10px] block">Confidence Score:</span>
                      <span className="text-base font-bold text-gray-900 dark:text-gray-100">{currentCase.confidenceScore}%</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 text-[10px] block">Clinical Staging:</span>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{currentCase.stageIndication}</span>
                    </div>
                  </div>
                </div>

                {/* Classification Breakdown Probabilities */}
                <div
                  className="p-5 rounded-xl border space-y-3 font-space"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
                >
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">
                    Classification Breakdown
                  </span>

                  <div className="space-y-3 pt-1">
                    {currentCase.breakdown.map((item) => (
                      <div key={item.code} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{item.label}:</span>
                          <span className="font-bold" style={{ color: item.color }}>{item.percentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: item.color }}
                          />
                        </div>
                      </div>
                    ))}
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
