import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERZ — The Real-Time Cloud & Network Bonding Platform",
  description: "Unbreakable Multi-WAN bonding for Starlink, 5G, and Live Broadcast. Dedicated on-demand cloud relays with zero packet loss.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans min-h-screen bg-background text-zinc-100 flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
