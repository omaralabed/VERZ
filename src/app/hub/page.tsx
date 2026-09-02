"use client";

import React, { useState, useEffect } from "react";
import {
  Server,
  Zap,
  ShieldCheck,
  Power,
  RefreshCw,
  Terminal,
  Clock,
  Download,
  Copy,
  Check,
  AlertCircle,
  Network,
  Cpu,
} from "lucide-react";
import { ServerSizeId, ServerTier } from "@/lib/types";

export default function HubDashboard() {
  const [selectedSize, setSelectedSize] = useState<ServerSizeId>("pro");
  const [nodeState, setNodeState] = useState<"idle" | "provisioning" | "running" | "terminating">("idle");
  const [countdown, setCountdown] = useState(35);
  const [copied, setCopied] = useState(false);
  const [nodeUptime, setNodeUptime] = useState(0);

  // Available Server Sizing Options
  const tiers: ServerTier[] = [
    {
      id: "starter",
      name: "Shared CPU Server",
      vCPU: 1,
      ramGB: 1,
      maxThroughputMbps: 150,
      hourlyRate: 0.025,
      description: "Shared compute instance. Ideal for everyday internet bonding, Zoom calls, and 1080p streams.",
      recommendedFor: "Starlink + 1x 5G / Everyday Use",
    },
    {
      id: "pro",
      name: "Dedicated CPU Server",
      vCPU: 2,
      ramGB: 4,
      maxThroughputMbps: 500,
      hourlyRate: 0.075,
      description: "100% dedicated CPU cores. Exclusive dedicated IP, zero noisy neighbors, and guaranteed sustained 4K performance.",
      recommendedFor: "4K OBS / vMix / Live Broadcasts",
    },
    {
      id: "broadcast_max",
      name: "Dedicated High-Compute Server",
      vCPU: 4,
      ramGB: 8,
      maxThroughputMbps: 1200,
      hourlyRate: 0.135,
      description: "High-capacity dedicated multi-core server for OB trucks, TV stations, and multi-camera live feeds.",
      recommendedFor: "Live Television & Major Events",
    },
  ];

  // Deployment trigger
  const handleDeploy = () => {
    setNodeState("provisioning");
    setCountdown(35);
  };

  // Terminate trigger
  const handleTerminate = () => {
    setNodeState("terminating");
    setTimeout(() => {
      setNodeState("idle");
      setNodeUptime(0);
    }, 2000);
  };

  // Countdown effect
  useEffect(() => {
    let timer: any;
    if (nodeState === "provisioning") {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setNodeState("running");
            return 35;
          }
          return prev - 1;
        });
      }, 100); // Accelerated simulation for smooth UX
    } else if (nodeState === "running") {
      timer = setInterval(() => {
        setNodeUptime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [nodeState]);

  const copyToken = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTier = tiers.find((t) => t.id === selectedSize)!;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-100 border border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Verz Link Control Center</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25">
              APP SERVER 01
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Deploy dedicated, single-tenant bonding relays on the VERZ Cloud Backbone. Auto-terminates on client disconnect.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">VERZ Cloud Network</span>
            <span className="text-xs font-mono text-accent-green font-bold flex items-center gap-1.5 justify-end">
              <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              Connected (Ready)
            </span>
          </div>
        </div>
      </div>

      {/* Sizing & Deployer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Server Sizing Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-300">
              Step 1: Choose Shared or Dedicated Server
            </h2>
            <span className="text-xs text-zinc-400 font-mono">Billed by minute</span>
          </div>

          <div className="space-y-3">
            {tiers.map((tier) => {
              const isSelected = selectedSize === tier.id;
              const badgeLabel =
                tier.id === "starter"
                  ? "Shared CPU Cores • Standard Speed"
                  : tier.id === "pro"
                  ? "100% Dedicated Cores • Dedicated IP"
                  : "High-Compute Dedicated Cores • 1 Gbps+";
              return (
                <div
                  key={tier.id}
                  onClick={() => nodeState === "idle" && setSelectedSize(tier.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-surface-50 border-accent-cyan shadow-glow"
                      : "bg-surface-200 border-white/5 hover:border-white/20"
                  } ${nodeState !== "idle" ? "cursor-not-allowed opacity-80" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{tier.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-accent-cyan">
                          {badgeLabel}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{tier.description}</p>
                      <div className="text-[11px] font-mono text-zinc-300 mt-2">
                        Recommended: {tier.recommendedFor}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xl font-mono font-black text-white">
                        ${tier.hourlyRate.toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono block">/ hour</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Auto-Destroy Guarantee */}
          <div className="p-4 rounded-xl bg-accent-green/5 border border-accent-green/20 text-xs text-zinc-300 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-accent-green shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Zero-Waste Guarantee: </span>
              This VERZ Cloud relay is <strong>auto-destroyed</strong> as soon as you stop streaming or close your client app. You never pay for idle hours.
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Deployment Monitor */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-surface-100 border border-white/10 flex flex-col justify-between relative overflow-hidden">
          
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Worker Node Controller
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  nodeState === "running"
                    ? "bg-accent-green/15 text-accent-green border border-accent-green/30"
                    : nodeState === "provisioning"
                    ? "bg-accent-amber/15 text-accent-amber border border-accent-amber/30 animate-pulse"
                    : "bg-white/5 text-zinc-400"
                }`}
              >
                ● {nodeState}
              </span>
            </div>

            {/* State: Idle */}
            {nodeState === "idle" && (
              <div className="space-y-6 text-center py-8">
                <div className="h-16 w-16 rounded-2xl bg-surface-50 border border-white/10 mx-auto flex items-center justify-center text-accent-cyan shadow-glow">
                  <Server className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Ready to Boot VERZ Cloud Node</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                    Selected: <strong>{activeTier.name}</strong> (${activeTier.hourlyRate}/hr) in Chicago.
                  </p>
                </div>

                <button
                  onClick={handleDeploy}
                  className="w-full py-4 rounded-xl bg-accent-cyan text-background font-mono font-bold text-sm hover:bg-accent-cyan/90 transition-all shadow-glow flex items-center justify-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  <span>Deploy Worker Node (35s)</span>
                </button>
              </div>
            )}

            {/* State: Provisioning */}
            {nodeState === "provisioning" && (
              <div className="space-y-6 text-center py-8">
                <div className="h-16 w-16 rounded-2xl bg-accent-amber/10 border border-accent-amber/30 mx-auto flex items-center justify-center text-accent-amber animate-spin">
                  <RefreshCw className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Initializing Dedicated Relay...</h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    Establishing encrypted high-speed tunnel ({countdown}s)
                  </p>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-amber transition-all duration-300"
                    style={{ width: `${((35 - countdown) / 35) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* State: Running */}
            {nodeState === "running" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-200 border border-accent-green/30 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Dedicated Public IP:</span>
                    <span className="text-accent-cyan font-bold">198.51.100.24</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Bonding UDP Port:</span>
                    <span className="text-white">5000</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Active Session Uptime:</span>
                    <span className="text-accent-green font-bold">{nodeUptime}s</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Hourly Cost Ticker:</span>
                    <span className="text-white">${((nodeUptime / 3600) * activeTier.hourlyRate).toFixed(4)}</span>
                  </div>
                </div>

                {/* Connection Token */}
                <div className="p-3 rounded-lg bg-surface-300 border border-white/5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1">
                    <span>Pairing Token (Paste into App or Router):</span>
                    <button
                      onClick={() => copyToken("vz_live_839f28c94e0192a7")}
                      className="text-accent-cyan hover:underline flex items-center gap-1"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="font-mono text-xs text-zinc-300 truncate">
                    vz_live_839f28c94e0192a7...
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => alert("Downloading VERZ Link .conf file for your router or PC...")}
                    className="py-2.5 px-3 rounded-lg bg-surface-50 border border-white/10 text-xs font-mono font-medium text-white hover:bg-surface-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .conf</span>
                  </button>
                  <button
                    onClick={handleTerminate}
                    className="py-2.5 px-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs font-mono font-bold text-red-400 hover:bg-red-500/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Power className="h-3.5 w-3.5" />
                    <span>Destroy Node</span>
                  </button>
                </div>
              </div>
            )}

            {/* State: Terminating */}
            {nodeState === "terminating" && (
              <div className="text-center py-12 space-y-3">
                <RefreshCw className="h-8 w-8 text-red-400 animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-white">Destroying VERZ Cloud Node...</h4>
                <p className="text-xs font-mono text-zinc-400">Stopping billing meter and freeing IP address.</p>
              </div>
            )}

          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
            <span>Orchestrator:</span>
            <span className="text-zinc-300">VERZ Edge Mesh v1.0 (US-Central)</span>
          </div>

        </div>

      </div>

      {/* Developer API Quick Reference */}
      <div className="p-6 rounded-2xl bg-surface-100 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent-purple" />
              Automate Deployments with the Verz API
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Want to spin up nodes programmatically from your camera, broadcast truck script, or custom app?
            </p>
          </div>
          <span className="text-xs font-mono text-accent-cyan">curl / REST</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-300 border border-white/5 font-mono text-xs text-zinc-300 overflow-x-auto">
          <pre>{`curl -X POST https://hub.verz.com/api/nodes/deploy \\
  -H "Authorization: Bearer verz_live_demo12345" \\
  -H "Content-Type: application/json" \\
  -d '{"region": "us-ord", "size": "pro", "auto_destroy_minutes": 180}'`}</pre>
        </div>
      </div>
    </div>
  );
}
