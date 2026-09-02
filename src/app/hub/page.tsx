"use client";

import React, { useState, useEffect } from "react";
import {
  Server,
  Zap,
  ShieldCheck,
  Power,
  RefreshCw,
  Terminal,
  Download,
  Copy,
  Check,
  Info,
  Radio,
  Network,
  Cpu,
} from "lucide-react";
import { ServerPlan, ServerCategory } from "@/lib/types";

export default function HubDashboard() {
  const [activeTab, setActiveTab] = useState<ServerCategory>("dedicated");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("dedicated_4gb");
  const [nodeState, setNodeState] = useState<"idle" | "provisioning" | "running" | "terminating">("idle");
  const [countdown, setCountdown] = useState(35);
  const [copied, setCopied] = useState(false);
  const [nodeUptime, setNodeUptime] = useState(0);

  // Accurate Cloud Server Plans with +$10/mo Margin
  const allPlans: ServerPlan[] = [
    // === DEDICATED CPU PLANS ===
    {
      id: "dedicated_4gb",
      name: "Dedicated 4 GB",
      category: "dedicated",
      monthlyPrice: 46, // Base $36 + $10
      hourlyPrice: 0.068,
      ram: "4 GB",
      cpus: 2,
      storage: "80 GB",
      transfer: "4 TB",
      networkSpeed: "40 Gbps / 4 Gbps",
    },
    {
      id: "dedicated_8gb",
      name: "Dedicated 8 GB",
      category: "dedicated",
      monthlyPrice: 82, // Base $72 + $10
      hourlyPrice: 0.122,
      ram: "8 GB",
      cpus: 4,
      storage: "160 GB",
      transfer: "5 TB",
      networkSpeed: "40 Gbps / 5 Gbps",
    },
    {
      id: "dedicated_16gb",
      name: "Dedicated 16 GB",
      category: "dedicated",
      monthlyPrice: 154, // Base $144 + $10
      hourlyPrice: 0.229,
      ram: "16 GB",
      cpus: 8,
      storage: "320 GB",
      transfer: "6 TB",
      networkSpeed: "40 Gbps / 6 Gbps",
    },
    {
      id: "dedicated_32gb",
      name: "Dedicated 32 GB",
      category: "dedicated",
      monthlyPrice: 298, // Base $288 + $10
      hourlyPrice: 0.443,
      ram: "32 GB",
      cpus: 16,
      storage: "640 GB",
      transfer: "7 TB",
      networkSpeed: "40 Gbps / 7 Gbps",
    },
    {
      id: "dedicated_64gb",
      name: "Dedicated 64 GB",
      category: "dedicated",
      monthlyPrice: 586, // Base $576 + $10
      hourlyPrice: 0.872,
      ram: "64 GB",
      cpus: 32,
      storage: "1280 GB",
      transfer: "8 TB",
      networkSpeed: "40 Gbps / 8 Gbps",
    },
    {
      id: "dedicated_96gb",
      name: "Dedicated 96 GB",
      category: "dedicated",
      monthlyPrice: 874, // Base $864 + $10
      hourlyPrice: 1.301,
      ram: "96 GB",
      cpus: 48,
      storage: "1920 GB",
      transfer: "9 TB",
      networkSpeed: "40 Gbps / 9 Gbps",
    },

    // === SHARED CPU PLANS ===
    {
      id: "shared_1gb",
      name: "Shared 1 GB",
      category: "shared",
      monthlyPrice: 15, // Base $5 + $10
      hourlyPrice: 0.022,
      ram: "1 GB",
      cpus: 1,
      storage: "25 GB",
      transfer: "1 TB",
      networkSpeed: "40 Gbps / 1 Gbps",
    },
    {
      id: "shared_2gb",
      name: "Shared 2 GB",
      category: "shared",
      monthlyPrice: 22, // Base $12 + $10
      hourlyPrice: 0.033,
      ram: "2 GB",
      cpus: 1,
      storage: "50 GB",
      transfer: "2 TB",
      networkSpeed: "40 Gbps / 2 Gbps",
    },
    {
      id: "shared_4gb",
      name: "Shared 4 GB",
      category: "shared",
      monthlyPrice: 34, // Base $24 + $10
      hourlyPrice: 0.051,
      ram: "4 GB",
      cpus: 2,
      storage: "80 GB",
      transfer: "4 TB",
      networkSpeed: "40 Gbps / 4 Gbps",
    },
    {
      id: "shared_8gb",
      name: "Shared 8 GB",
      category: "shared",
      monthlyPrice: 58, // Base $48 + $10
      hourlyPrice: 0.086,
      ram: "8 GB",
      cpus: 4,
      storage: "160 GB",
      transfer: "5 TB",
      networkSpeed: "40 Gbps / 5 Gbps",
    },
    {
      id: "shared_16gb",
      name: "Shared 16 GB",
      category: "shared",
      monthlyPrice: 106, // Base $96 + $10
      hourlyPrice: 0.158,
      ram: "16 GB",
      cpus: 6,
      storage: "320 GB",
      transfer: "8 TB",
      networkSpeed: "40 Gbps / 6 Gbps",
    },
    {
      id: "shared_32gb",
      name: "Shared 32 GB",
      category: "shared",
      monthlyPrice: 202, // Base $192 + $10
      hourlyPrice: 0.301,
      ram: "32 GB",
      cpus: 8,
      storage: "640 GB",
      transfer: "16 TB",
      networkSpeed: "40 Gbps / 7 Gbps",
    },
  ];

  const currentPlans = allPlans.filter((p) => p.category === activeTab);
  const selectedPlan = allPlans.find((p) => p.id === selectedPlanId) || currentPlans[0];

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
      }, 100);
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-100 border border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Verz Link Cloud Deployer</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25">
              APP SERVER 01
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Choose your cloud server plan. Hourly on-demand deployment with auto-destruction on disconnect.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">Cloud Backbone</span>
            <span className="text-xs font-mono text-accent-green font-bold flex items-center gap-1.5 justify-end">
              <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              Connected (Ready)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Sizing Table, Right = Deployment Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: The Linode-style Table */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Navigation Tabs (Dedicated CPU vs Shared CPU) */}
          <div className="flex items-center gap-6 border-b border-white/10 pb-0">
            <button
              onClick={() => {
                setActiveTab("dedicated");
                setSelectedPlanId("dedicated_4gb");
              }}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === "dedicated"
                  ? "text-accent-cyan"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Dedicated CPU
              {activeTab === "dedicated" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("shared");
                setSelectedPlanId("shared_1gb");
              }}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === "shared"
                  ? "text-accent-cyan"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Shared CPU
              {activeTab === "shared" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan" />
              )}
            </button>
          </div>

          {/* Tab Description Banner */}
          <div className="p-3.5 rounded-xl bg-surface-200 border border-white/5 text-xs text-zinc-400 leading-relaxed">
            {activeTab === "dedicated" ? (
              <span>
                <strong className="text-white">Dedicated CPU instances</strong> are built for full-duty broadcast workloads needing consistent, unthrottled performance with zero noisy neighbors.
              </span>
            ) : (
              <span>
                <strong className="text-white">Shared CPU instances</strong> are balanced for medium-duty workloads, everyday bonding, and provide an economical mix of performance and price.
              </span>
            )}
          </div>

          {/* Linode-Style Cloud Pricing Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-surface-100/90 shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-surface-200/80 text-zinc-400 font-mono">
                  <th className="p-3.5 pl-4 font-semibold">Plan</th>
                  <th className="p-3.5 font-semibold">Monthly</th>
                  <th className="p-3.5 font-semibold">Hourly</th>
                  <th className="p-3.5 font-semibold">RAM</th>
                  <th className="p-3.5 font-semibold">CPUs</th>
                  <th className="p-3.5 font-semibold">Storage</th>
                  <th className="p-3.5 font-semibold">Transfer</th>
                  <th className="p-3.5 font-semibold pr-4">Network In / Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {currentPlans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <tr
                      key={plan.id}
                      onClick={() => nodeState === "idle" && setSelectedPlanId(plan.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-accent-cyan/10 text-white"
                          : "hover:bg-white/[0.02] text-zinc-300"
                      } ${nodeState !== "idle" ? "cursor-not-allowed opacity-80" : ""}`}
                    >
                      {/* Plan Radio + Name */}
                      <td className="p-3.5 pl-4 font-sans font-medium flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="server_plan"
                          checked={isSelected}
                          onChange={() => setSelectedPlanId(plan.id)}
                          disabled={nodeState !== "idle"}
                          className="h-3.5 w-3.5 accent-accent-cyan cursor-pointer"
                        />
                        <span className={isSelected ? "text-accent-cyan font-bold" : "text-white"}>
                          {plan.name}
                        </span>
                      </td>

                      {/* Monthly (Base + $10) */}
                      <td className="p-3.5 font-bold text-white">
                        ${plan.monthlyPrice}
                      </td>

                      {/* Hourly */}
                      <td className="p-3.5 text-zinc-300">
                        ${plan.hourlyPrice.toFixed(3)}
                      </td>

                      {/* RAM */}
                      <td className="p-3.5 text-zinc-400">
                        {plan.ram}
                      </td>

                      {/* CPUs */}
                      <td className="p-3.5 text-zinc-400">
                        {plan.cpus}
                      </td>

                      {/* Storage */}
                      <td className="p-3.5 text-zinc-400">
                        {plan.storage}
                      </td>

                      {/* Transfer */}
                      <td className="p-3.5 text-zinc-400">
                        {plan.transfer}
                      </td>

                      {/* Network In / Out */}
                      <td className="p-3.5 pr-4 text-zinc-400">
                        {plan.networkSpeed}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Zero Waste Guarantee Note */}
          <div className="p-3.5 rounded-xl bg-accent-green/5 border border-accent-green/20 text-xs text-zinc-300 flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-accent-green shrink-0" />
            <span>
              <strong>Zero-Waste Cloud Guarantee: </strong>
              You only pay for the exact minutes your server is deployed. When you disconnect, the instance is automatically destroyed.
            </span>
          </div>

        </div>

        {/* Right 4 Cols: Live Deployment Controller */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-100 border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Deployment Controller
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

            {/* Selected Plan Summary Box */}
            <div className="p-4 rounded-xl bg-surface-200 border border-white/5 mb-6 space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Selected Server Plan
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-white">{selectedPlan.name}</span>
                <span className="text-base font-mono font-black text-accent-cyan">
                  ${selectedPlan.hourlyPrice.toFixed(3)}/hr
                </span>
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                {selectedPlan.cpus} CPU • {selectedPlan.ram} RAM • {selectedPlan.transfer} Transfer
              </div>
            </div>

            {/* State: Idle */}
            {nodeState === "idle" && (
              <div className="space-y-6 text-center py-4">
                <div className="h-14 w-14 rounded-2xl bg-surface-50 border border-white/10 mx-auto flex items-center justify-center text-accent-cyan shadow-glow">
                  <Server className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Ready to Deploy</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                    Click to launch your dedicated bonding relay node in Chicago.
                  </p>
                </div>

                <button
                  onClick={handleDeploy}
                  className="w-full py-3.5 rounded-xl bg-accent-cyan text-background font-mono font-bold text-xs uppercase tracking-wider hover:bg-accent-cyan/90 transition-all shadow-glow flex items-center justify-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  <span>Deploy {selectedPlan.name} (35s)</span>
                </button>
              </div>
            )}

            {/* State: Provisioning */}
            {nodeState === "provisioning" && (
              <div className="space-y-6 text-center py-6">
                <div className="h-14 w-14 rounded-2xl bg-accent-amber/10 border border-accent-amber/30 mx-auto flex items-center justify-center text-accent-amber animate-spin">
                  <RefreshCw className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Initializing Relay...</h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    Establishing encrypted tunnel ({countdown}s)
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
                <div className="p-4 rounded-xl bg-surface-200 border border-accent-green/30 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Dedicated Public IP:</span>
                    <span className="text-accent-cyan font-bold">198.51.100.24</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Active Plan:</span>
                    <span className="text-white font-bold">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Active Session Uptime:</span>
                    <span className="text-accent-green font-bold">{nodeUptime}s</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Hourly Cost Ticker:</span>
                    <span className="text-white">${((nodeUptime / 3600) * selectedPlan.hourlyPrice).toFixed(4)}</span>
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
                <RefreshCw className="h-7 w-7 text-red-400 animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-white">Destroying Node...</h4>
                <p className="text-xs font-mono text-zinc-400">Stopping billing meter and freeing resources.</p>
              </div>
            )}

          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
            <span>Location:</span>
            <span className="text-zinc-300">US-Central (Chicago)</span>
          </div>

        </div>

      </div>

    </div>
  );
}
