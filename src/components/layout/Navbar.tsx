"use client";

import Link from "next/link";
import { Network, Zap, Shield, LayoutDashboard, ChevronRight } from "lucide-react";

import { VerzLogo } from "@/components/ui/VerzLogo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <VerzLogo size="md" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <Link href="#interactive-demo" className="hover:text-accent-cyan transition-colors flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-accent-cyan" />
            Live Demo
          </Link>
          <Link href="#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/hub" className="hover:text-white transition-colors text-zinc-400">
            Console
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/hub"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition-all hover:bg-zinc-200 shadow-sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Launch Hub</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
