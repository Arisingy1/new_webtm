import type { Metadata } from "next";
import { Geologica, JetBrains_Mono, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-onest",
});

const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geologica",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono-jb",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://talentmind.ru"),
  title: {
    default: "TalentMind — AI interview analysis and cultural fit",
    template: "%s · TalentMind",
  },
  description:
    "TalentMind turns audio and video interview recordings into a digitized candidate profile: soft-skills assessment, the STAR method, and fit against your company DNA.",
  keywords: [
    "AI interview analysis",
    "soft skills",
    "corporate culture",
    "HR Tech",
    "candidate assessment",
  ],
  openGraph: {
    title: "TalentMind — Hire by your company DNA",
    description:
      "A digitized candidate profile built on data, not intuition.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${geologica.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
