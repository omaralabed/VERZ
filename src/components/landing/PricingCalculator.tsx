"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Users, Server, ShieldCheck, ArrowRight, Zap } from "lucide-react";

export function PricingCalculator() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "hourly">("monthly");

  return (
    <section id="pricing" className="py-20 bg-surface-300/60 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-3 block">
            Cloud Server Options
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Shared or Dedicated CPU.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Choose affordable Shared CPU servers for everyday bonding, or Dedicated CPU servers for guaranteed, contention-free 4K broadcast performance.
          </p>

          {/* Toggle Button */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-surface-100 border border-white/10">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-accent-cyan text-background shadow-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Plan
            </button>
            <button
              onClick={() => setBillingCycle("hourly")}
              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                billingCycle === "hourly"
                  ? "bg-accent-cyan text-background shadow-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              On-Demand (Hourly)
            </button>
          </div>
        </div>

        {/* 2 Main Choices: Shared CPU vs Dedicated CPU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Card 1: Shared CPU Server */}
          <div className="p-8 rounded-2xl bg-surface-100 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-surface-50 border border-white/10 text-zinc-300 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                  Standard Plan
                </span>
              </div>

              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                Option 01
              </div>
              <h3 className="text-2xl font-bold text-white">Shared CPU Server</h3>
              <p className="text-xs text-zinc-400 mt-2">
                Shared compute instance. Ideal for remote work, everyday bonding, Zoom calls, and 1080p live streams.
              </p>

              <div className="my-6">
                <span className="text-4xl font-mono font-black text-white">
                  {billingCycle === "monthly" ? "$15" : "$0.025"}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {billingCycle === "monthly" ? " / month" : " / hour"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-300 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>Shared CPU Cores (Standard Compute)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>Up to 150 Mbps Multi-WAN Bonding</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>Starlink + 5G + Wi-Fi Aggregation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>Fast 1-Click Cloud Deployment</span>
                </li>
              </ul>
            </div>

            <Link
              href="/hub"
              className="mt-8 block w-full py-3 rounded-xl bg-surface-50 hover:bg-surface-200 border border-white/10 text-center text-xs font-mono font-bold text-white transition-all"
            >
              Select Shared Server
            </Link>
          </div>

          {/* Card 2: Dedicated CPU Server (Featured) */}
          <div className="p-8 rounded-2xl bg-surface-100 border-2 border-accent-cyan relative flex flex-col justify-between shadow-glow">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-accent-cyan text-background text-[10px] font-mono font-bold uppercase tracking-wider">
              Recommended for Broadcast & 4K
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan flex items-center justify-center">
                  <Server className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                  100% Dedicated Cores
                </span>
              </div>

              <div className="text-xs font-mono text-accent-cyan uppercase tracking-wider mb-1">
                Option 02
              </div>
              <h3 className="text-2xl font-bold text-white">Dedicated CPU Server</h3>
              <p className="text-xs text-zinc-400 mt-2">
                100% dedicated CPU threads with zero resource competition. Guaranteed sustained CPU power for high-bitrate 4K streaming.
              </p>

              <div className="my-6">
                <span className="text-4xl font-mono font-black text-white">
                  {billingCycle === "monthly" ? "$49" : "$0.075"}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {billingCycle === "monthly" ? " / month" : " / hour"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-200 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>100% Dedicated CPU (No noisy neighbors)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Guaranteed 100% Sustained Performance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Exclusive Dedicated Clean Static IP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Sub-second 0ms Packet Cloning for 4K video</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Router Config for GL.iNet & Hardware</span>
                </li>
              </ul>
            </div>

            <Link
              href="/hub"
              className="mt-8 block w-full py-3.5 rounded-xl bg-accent-cyan hover:bg-accent-cyan/90 text-center text-xs font-mono font-bold text-background transition-all shadow-glow"
            >
              Deploy Dedicated Server →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
