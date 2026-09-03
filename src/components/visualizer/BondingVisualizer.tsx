"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Radio, Satellite, ShieldCheck, Activity, AlertTriangle, Play, RefreshCw, Zap } from "lucide-react";

interface LinkState {
  id: string;
  name: string;
  type: "starlink" | "cellular" | "wifi";
  baseSpeed: number;
  currentSpeed: number;
  ping: number;
  active: boolean;
  color: string;
  icon: any;
}

export function BondingVisualizer() {
  const [links, setLinks] = useState<LinkState[]>([
    {
      id: "starlink",
      name: "Starlink Satellite Dish",
      type: "starlink",
      baseSpeed: 145,
      currentSpeed: 145,
      ping: 32,
      active: true,
      color: "#FF6A00", // Electric Orange
      icon: Satellite,
    },
    {
      id: "5g",
      name: "T-Mobile / Verizon 5G Modem",
      type: "cellular",
      baseSpeed: 95,
      currentSpeed: 95,
      ping: 24,
      active: true,
      color: "#7C4DFF", // Purple
      icon: Radio,
    },
    {
      id: "wifi",
      name: "Venue / Hotel Ethernet / Wi-Fi",
      type: "wifi",
      baseSpeed: 40,
      currentSpeed: 40,
      ping: 18,
      active: true,
      color: "#00E676", // Green
      icon: Wifi,
    },
  ]);

  const [simulatedDrop, setSimulatedDrop] = useState<string | null>(null);

  // Toggle active connection
  const toggleLink = (id: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  // Simulate pull cable
  const triggerDisconnect = (id: string) => {
    setSimulatedDrop(id);
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: false } : l))
    );
    setTimeout(() => {
      setSimulatedDrop(null);
    }, 4000);
  };

  const restoreAll = () => {
    setLinks((prev) => prev.map((l) => ({ ...l, active: true })));
    setSimulatedDrop(null);
  };

  // Calculate live aggregate stats
  const activeLinks = links.filter((l) => l.active);
  const totalSpeed = activeLinks.reduce((acc, curr) => acc + curr.currentSpeed, 0);
  const lowestPing = activeLinks.length > 0 ? Math.min(...activeLinks.map((l) => l.ping)) : 0;
  const isHealthy = activeLinks.length > 0;

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-surface-100 p-6 md:p-8 shadow-2xl relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
      {/* Glow Effects */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent-purple/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-mono font-medium mb-2">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            LIVE MULTI-PATH PACKET SCHEDULER
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Interactive Bonding Simulator</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Click to unplug a line or simulate high-latency drops. Watch the combined output stay unbroken with 0 dropped frames.
          </p>
        </div>

        <button
          onClick={restoreAll}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-50 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset All Lines
        </button>
      </div>

      {/* Main Grid: Inputs -> Engine -> Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-8 items-center">
        
        {/* Left Col: Physical WAN Sources */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Physical Internet Links</span>
            <span>Live Bitrate</span>
          </div>

          {links.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.id}
                className={`group p-4 rounded-xl border transition-all duration-300 ${
                  link.active
                    ? "bg-surface-200 border-white/10 hover:border-white/25"
                    : "bg-surface-300/40 border-red-500/20 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: link.active ? `${link.color}15` : "#ff3d0015",
                        color: link.active ? link.color : "#ff3d00",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{link.name}</h4>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-0.5">
                        <span className={link.active ? "text-accent-green" : "text-red-400"}>
                          {link.active ? "● Online" : "✖ Severed"}
                        </span>
                        <span>•</span>
                        <span>{link.active ? `${link.ping}ms RTT` : "Timeout"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-white">
                      {link.active ? `${link.currentSpeed} Mbps` : "0 Mbps"}
                    </div>
                    <button
                      onClick={() => (link.active ? triggerDisconnect(link.id) : toggleLink(link.id))}
                      className="text-[10px] font-mono text-zinc-400 hover:text-red-400 underline transition-colors mt-0.5"
                    >
                      {link.active ? "Simulate Disconnect" : "Reconnect"}
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: link.active ? `${(link.currentSpeed / 150) * 100}%` : "0%",
                      backgroundColor: link.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center: Verz Bonding Core Engine */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 rounded-xl bg-surface-200 border border-accent-cyan/20 relative">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-b from-accent-cyan/20 to-transparent opacity-50 blur-sm pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-xl bg-surface-50 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan shadow-glow mb-3">
              <Zap className="h-6 w-6 animate-pulse" />
            </div>
            <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              VERZ LINK CORE
            </h4>
            <p className="text-[11px] font-mono text-zinc-400 mt-1">
              Microsecond Adaptive Multi-Path Routing Engine
            </p>

            <div className="mt-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-accent-green flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>0ms Failover Protected</span>
            </div>

            {simulatedDrop && (
              <div className="mt-3 px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-[10px] font-mono text-red-300 animate-pulse">
                Cable Pulled! Packets auto-rerouted instantly.
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Aggregate Bonded Output */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-gradient-to-br from-surface-50 to-surface-200 border border-white/15 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
              Aggregated Output
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-green/15 text-accent-green">
              {isHealthy ? "ROCK SOLID" : "OFFLINE"}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                {totalSpeed} <span className="text-lg font-medium text-zinc-400">Mbps</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Combined single stream delivered to destination
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
              <div className="p-2.5 rounded-lg bg-surface-300/60 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Packet Loss</span>
                <div className="text-sm font-mono font-bold text-accent-green">0.00%</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-300/60 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Latency</span>
                <div className="text-sm font-mono font-bold text-accent-cyan">{lowestPing} ms</div>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Relay Target:</span>
                <span className="text-white">VERZ Cloud Relay (Chicago)</span>
              </div>
              <div className="flex justify-between">
                <span>IP Allocation:</span>
                <span className="text-accent-cyan font-semibold">198.51.100.24 (Clean)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Hint */}
      <div className="bg-surface-200/60 rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent-cyan" />
          <span>Try it yourself: click &ldquo;Simulate Disconnect&rdquo; on any line above to test zero-drop failover.</span>
        </div>
        <div className="text-zinc-300 font-semibold">
          Active Carrier Tunnels: {activeLinks.length} of 3
        </div>
      </div>
    </div>
  );
}
