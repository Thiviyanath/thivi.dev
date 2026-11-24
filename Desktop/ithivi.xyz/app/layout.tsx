import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Live3DBackground from "./components/Live3DBackground";
import PortfolioShell from "./components/PortfolioShell";
import ScrollEffects from "./components/ScrollEffects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thiviyanath Maheswaran | Software Engineer",
  description:
    "Engineering portfolio of Thiviyanath Maheswaran — web systems, APIs, computer vision, and practical security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="relative isolate min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased selection:bg-accent/30 selection:text-accent">
        <Live3DBackground />
        <PortfolioShell>{children}</PortfolioShell>
        <ScrollEffects />
      </body>
    </html>
  );
}