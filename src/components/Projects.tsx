"use client";

import React from "react";
import ProjectCard, { type ProjectData } from "./ProjectCard";

const PROJECTS: ProjectData[] = [
  {
    num:      "Project 01",
    title:    "CuraNet – Caregiver Support System",
    desc:     "A full-stack web application designed to assist caregivers managing individuals with disabilities — enabling tracking of patient needs, daily activities, and communication.",
    features: [
      "Responsive, user-friendly UI design",
      "Secure data storage with PostgreSQL",
      "CRUD operations for real-time data handling",
      "Dashboard for caregiver management",
    ],
    tags:   ["HTML", "CSS", "JavaScript", "PostgreSQL"],
    github: "https://github.com/SowndharyaPL15/CuraNet",
    demo:   "https://curanet-mj06.onrender.com/",
    images: ["/projects/curanet/1.png", "/projects/curanet/2.png"],
  },
  {
    num:      "Project 02",
    title:    "PharmaTrace AI – Medicine Authentication",
    desc:     "A secure web application that detects counterfeit medicines using AI and ensures authenticity through QR-based tracking with REST API communication.",
    features: [
      "AI model integration using Python Flask",
      "QR code-based verification system",
      "REST API communication",
      "Focus on security and scalability",
    ],
    tags:   ["Node.js", "Express.js", "PostgreSQL", "Python"],
    github: "https://github.com/SowndharyaPL15/pharmatrace-ai",
    demo:   "https://pharmatrace-web-server.onrender.com",
    images: ["/projects/pharmatrace/1.png"],
  },
  {
    num:      "Project 03",
    title:    "SmartExpensePro – SMS Expense Tracker",
    desc:     "An Android app that automatically tracks expenses by reading SMS messages and categorizing transactions with smart financial summaries and insights.",
    features: [
      "SMS parsing and transaction extraction",
      "Intelligent expense categorization",
      "Financial summaries and insights",
      "Automated expense tracking",
    ],
    tags:   ["Android", "Java", "SMS API"],
    github: "https://github.com/SowndharyaPL15/SmartExpensePro",
    demo:   "https://smartexpensepro.onrender.com/",
    images: ["/projects/smartexpense/1.png"],
  },
  {
    num:      "Project 04",
    title:    "Aerial Object Detection – IoT Based",
    desc:     "An IoT-based system that detects aerial objects using ultrasonic sensors and triggers real-time alerts. Presented as a research paper that won 2nd prize.",
    features: [
      "Ultrasonic sensor-based detection",
      "Real-time alert system with buzzers",
      "Arduino-based implementation",
      "Research paper – 2nd Prize Award",
    ],
    tags:   ["Arduino", "Embedded Systems", "IoT", "C"],
    github: null,
    badge:  "IoT Research",
    images: [],
  },
  {
    num:      "Project 05",
    title:    "CivicPulse – Smart Civic Issue Management",
    desc:     "A web platform that enables citizens to report civic issues with geo-tagging and track resolution in real time through an interactive admin dashboard.",
    features: [
      "Geo-tagged complaint submission",
      "Real-time complaint tracking",
      "Admin dashboard for monitoring",
      "Duplicate detection & auto assignment",
    ],
    tags:   ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com/SowndharyaPL15/CivicPulse",
    images: ["/projects/civicpulse/1.png"],
  },
  {
    num:      "Project 06",
    title:    "Connectify – Real-Time Chat Application",
    desc:     "A modern web chat application that enables users to communicate in real time with secure authentication and seamless messaging experience.",
    features: [
      "Real-time messaging system",
      "User authentication and sessions",
      "Chat history and message storage",
      "Responsive UI with modern design",
    ],
    tags:   ["Laravel", "PHP", "MySQL", "JavaScript"],
    github: "https://github.com/SowndharyaPL15/connectify-cartrabbit",
    demo:   "https://connectify-bw2w.onrender.com",
    images: ["/projects/connectify/1.png"],
  },
  {
    num:      "Project 07",
    title:    "ModelHubX – MLOps Registry & Deployment",
    desc:     "High-end MLOps platform for automated AI model versioning and Kubernetes deployment. Features a premium glassmorphic SaaS dashboard, real-time cluster metrics, and dynamic K8s manifest synthesis.",
    features: [
      "Immutable AI Model Registry & Versioning",
      "K8s Infrastructure Synthesis & Auto-scaling",
      "Real-time Diagnostics & Cluster Metrics",
      "Dual-Theme Glassmorphic Mission Dashboard",
    ],
    tags:   ["Python", "Kubernetes", "Redis", "Docker"],
    github: "https://github.com/SowndharyaPL15/ModelHubX",
    demo:   "https://modelhubx-1.onrender.com/",
    badge:  "AI/ML",
    images: ["/projects/modelhubx/1.png"],
  },
  {
    num:      "Project 08",
    title:    "AI Product Authentication System",
    desc:     "A deep learning platform for item authentication and fingerprinting. Classifies product images as Authentic or Fake using a custom CNN with an explainability module.",
    features: [
      "Custom CNN (PyTorch) & OpenCV Preprocessing",
      "Explainable AI (XAI) Prediction Reasons",
      "Real-time Image Analysis Dashboard",
      "Automated Feature Extraction & Fingerprinting",
    ],
    tags:   ["Python", "PyTorch", "OpenCV", "Machine Learning"],
    github: "https://github.com/SowndharyaPL15/AI-Product-Authentication-System",
    demo:   "https://ai-product-authentication-system.onrender.com",
    badge:  "Deep Learning",
    images: ["/projects/ai-auth/1.png"],
  },
  {
    num:      "Project 09",
    title:    "Clixora – URL Shortening & Analytics",
    desc:     "A production-quality URL shortening and real-time link analytics platform with secure JWT auth, bulk URL creation, and custom expiration options.",
    features: [
      "Secure JWT User Authentication",
      "Custom Aliasing & Duplicate Checks",
      "Bulk URL Shortening via CSV Uploads",
      "Granular Device, IP, & Browser Analytics",
    ],
    tags:   ["React", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com/SowndharyaPL15/Clixora",
    demo:   "https://clixora-frontend.onrender.com",
    badge:  "Full Stack",
    images: ["/projects/clixora/1.png"],
  },
  {
    num:      "Project 10",
    title:    "INDUS AI – Industrial Cognitive Memory System",
    desc:     "Preserves and searches industrial knowledge (SOPs, logs, manuals) using FAISS vector similarity search and dynamic AI reasoning chains.",
    features: [
      "Industrial Document & SOP Ingestion",
      "High-Performance Vector Search with FAISS",
      "AI Reasoning Agents via LangChain & LangGraph",
      "Role-Based Access Control & Safe Outputs",
    ],
    tags:   ["FastAPI", "React", "PostgreSQL", "FAISS"],
    github: "https://github.com/SowndharyaPL15/indus_ai",
    demo:   "https://indus-ai-frontend.onrender.com",
    badge:  "AI & Cognitive Systems",
    images: ["/projects/indus_ai/1.png"],
  },
  {
    num:      "Project 11",
    title:    "Precision Oncology – Clinical Decision Support",
    desc:     "AI-powered clinical decision support framework for diagnosing Lung and Breast cancer from histopathology images using deep transfer learning and Explainable AI.",
    features: [
      "Multimodal Histopathology Analysis",
      "Deep Transfer Learning (DenseNet)",
      "Explainable AI (Grad-CAM) Heatmaps",
      "Interactive Diagnostic Web Dashboard",
    ],
    tags:   ["FastAPI", "React", "TensorFlow", "DenseNet", "PyTorch", "Grad-CAM"],
    github: "https://github.com/SowndharyaPL15/Precision-Oncology-CDSS",
    demo:   "https://precision-oncology-frontend.onrender.com",
    badge:  "AI & Healthcare CDSS",
    images: ["/projects/precision-oncology/1.svg"],
  },
];

export default function Projects() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex items-center justify-between pb-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <h2 className="font-space text-sm font-bold uppercase tracking-widest text-glow">
          COMPLETED PROJECTS
        </h2>
        <span className="font-space text-xs" style={{ color: "var(--text-muted)" }}>
          {PROJECTS.length} ENTRIES FOUND
        </span>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.num} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}
