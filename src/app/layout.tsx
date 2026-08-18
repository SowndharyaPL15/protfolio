import type { Metadata } from "next";
import { DM_Sans, Space_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sowndharya P.L — AI Engineer & Full Stack Developer",
  description:
    "AI Engineer, Full Stack Developer, and Machine Learning Enthusiast. Explore the portfolio of Sowndharya P.L — real-world projects in AI, blockchain, IoT, and web development.",
  keywords: [
    "Sowndharya PL", "SowndharyaPL15", "AI Engineer", "Full Stack Developer",
    "Machine Learning", "Blockchain", "React", "Next.js", "Python", "PyTorch",
    "Portfolio", "Software Engineer", "Dr. N.G.P Institute", "Tirupur",
  ],
  authors: [{ name: "Sowndharya P.L" }],
  openGraph: {
    title: "Sowndharya P.L — AI Engineer & Full Stack Developer Portfolio",
    description:
      "Real-world projects in AI, blockchain, IoT, and web development. Explore Sowndharya P.L's portfolio.",
    url: "https://sowndharyapl15.github.io/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sowndharya P.L — AI Engineer & Full Stack Developer",
    description: "Real-world projects in AI, blockchain, IoT, and web development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${dmSans.variable} ${spaceMono.variable} ${dmSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-hidden" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
