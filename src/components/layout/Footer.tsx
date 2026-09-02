"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Shield, Network, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full border-t border-white/5 bg-surface-300 text-zinc-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-black tracking-widest text-white">
                VERZ<span className="text-accent-cyan">.</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm">
              The Real-Time Cloud Infrastructure & Network Bonding Platform. High-speed multi-WAN aggregation for Starlink, 5G, and mission-critical live connections.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-accent-green">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              All VERZ Global Edge Relays Operational (100.0% SLA)
            </div>
          </div>

          {/* Apps Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Apps & Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#interactive-demo" className="hover:text-accent-cyan transition-colors flex items-center justify-between">
                  Verz Link (Bonding) <span className="text-[10px] bg-accent-cyan/10 text-accent-cyan px-1.5 py-0.5 rounded">Live</span>
                </Link>
              </li>
              <li>
                <span className="text-zinc-500 flex items-center justify-between">
                  Verz Stream <span className="text-[10px] bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded">Q4</span>
                </span>
              </li>
              <li>
                <span className="text-zinc-500 flex items-center justify-between">
                  Verz Voice (SIP) <span className="text-[10px] bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded">Q1</span>
                </span>
              </li>
              <li>
                <span className="text-zinc-500 flex items-center justify-between">
                  Verz Box (Hardware) <span className="text-[10px] bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded">2027</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Infrastructure Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Infrastructure</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hub" className="hover:text-white transition-colors">
                  Central Hub Console
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Server Sizing & Pricing
                </Link>
              </li>
              <li>
                <span className="text-zinc-500">VERZ Dedicated Cloud Relays</span>
              </li>
              <li>
                <span className="text-zinc-500">OpenWrt / GL.iNet Configs</span>
              </li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Company & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-zinc-400">Security & Encryption</span></li>
              <li><span className="text-zinc-400">Acceptable Use Policy</span></li>
              <li><span className="text-zinc-400">Terms of Service</span></li>
              <li><span className="text-zinc-400">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {year} VERZ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
