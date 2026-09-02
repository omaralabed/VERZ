"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, Server, Shield, ArrowRight } from "lucide-react";

export function PricingCalculator() {
  const [billingCycle, setBillingCycle] = useState<"hourly" | "monthly">("hourly");

  return (
    <section id="pricing" className="py-20 bg-surface-300/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-3">
            Transparent Pricing
          </h2>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Pay Only For What You Stream.
          </h3>
          <p className="mt-4 text-base text-zinc-400">
            No expensive hardware contracts. Top up your wallet on the Central Hub and spin up dedicated VERZ Cloud relays by the hour.
          </p>

          {/* Toggle Button */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-surface-100 border border-white/10">
            <button
              onClick={() => setBillingCycle("hourly")}
              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                billingCycle === "hourly"
                  ? "bg-accent-cyan text-background shadow-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              On-Demand (Per Hour)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-accent-cyan text-background shadow-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Unlimited Pass
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Starter */}
          <div className="p-8 rounded-2xl bg-surface-100 border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Starter Node
              </div>
              <h4 className="text-xl font-bold text-white">Vloggers & Remote Work</h4>
              <p className="text-xs text-zinc-400 mt-2">
                Perfect for Zoom meetings, 1080p live streams, and digital nomads.
              </p>

              <div className="my-6">
                <span className="text-4xl font-mono font-black text-white">
                  {billingCycle === "hourly" ? "$0.25" : "$19"}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {billingCycle === "hourly" ? " / hour" : " / month"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-300 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>1 vCPU / 1GB RAM Dedicated Relay</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>Up to 100 Mbps Throughput</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>Clean Dedicated Static IP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-green shrink-0" />
                  <span>Starlink + 1x 5G Modem</span>
                </li>
              </ul>
            </div>

            <Link
              href="/hub"
              className="mt-8 block w-full py-3 rounded-xl bg-surface-50 hover:bg-surface-200 border border-white/10 text-center text-xs font-mono font-bold text-white transition-all"
            >
              Deploy Starter Node
            </Link>
          </div>

          {/* Tier 2: Pro Node (Featured) */}
          <div className="p-8 rounded-2xl bg-surface-100 border-2 border-accent-cyan relative flex flex-col justify-between shadow-glow">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent-cyan text-background text-[10px] font-mono font-bold uppercase tracking-wider">
              Most Popular for 4K
            </div>

            <div>
              <div className="text-xs font-mono text-accent-cyan uppercase tracking-wider mb-2">
                Pro Node
              </div>
              <h4 className="text-xl font-bold text-white">Production & 4K Streamers</h4>
              <p className="text-xs text-zinc-400 mt-2">
                Designed for 4K video, dual 5G SIMs, and high-bitrate multi-camera events.
              </p>

              <div className="my-6">
                <span className="text-4xl font-mono font-black text-white">
                  {billingCycle === "hourly" ? "$0.65" : "$59"}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {billingCycle === "hourly" ? " / hour" : " / month"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-200 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>2 vCPU / 4GB RAM Dedicated Relay</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Up to 500 Mbps Throughput</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Sub-second 0ms Packet Cloning Mode</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Starlink + 2x 5G SIMs + Ethernet</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span>Router Package for GL.iNet / OpenWrt</span>
                </li>
              </ul>
            </div>

            <Link
              href="/hub"
              className="mt-8 block w-full py-3.5 rounded-xl bg-accent-cyan hover:bg-accent-cyan/90 text-center text-xs font-mono font-bold text-background transition-all shadow-glow"
            >
              Deploy Pro Node →
            </Link>
          </div>

          {/* Tier 3: Broadcast Max */}
          <div className="p-8 rounded-2xl bg-surface-100 border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-mono text-accent-purple uppercase tracking-wider mb-2">
                Broadcast Max
              </div>
              <h4 className="text-xl font-bold text-white">OB Trucks & TV Stations</h4>
              <p className="text-xs text-zinc-400 mt-2">
                Enterprise power for outside broadcast trucks and high-profile live sports.
              </p>

              <div className="my-6">
                <span className="text-4xl font-mono font-black text-white">
                  {billingCycle === "hourly" ? "$1.25" : "$199"}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {billingCycle === "hourly" ? " / hour" : " / month"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-300 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-purple shrink-0" />
                  <span>4 vCPU / 8GB RAM High-Compute Relay</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-purple shrink-0" />
                  <span>1 Gbps+ Gigabit Throughput</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-purple shrink-0" />
                  <span>Full Developer REST API & Webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-purple shrink-0" />
                  <span>Priority Routing & 99.99% SLA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-purple shrink-0" />
                  <span>White-label Hardware Firmware License</span>
                </li>
              </ul>
            </div>

            <Link
              href="/hub"
              className="mt-8 block w-full py-3 rounded-xl bg-surface-50 hover:bg-surface-200 border border-white/10 text-center text-xs font-mono font-bold text-white transition-all"
            >
              Deploy Broadcast Max
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
