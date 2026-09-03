"use client";

import React, { useState, useEffect } from "react";
import {
  Server,
  Zap,
  ShieldCheck,
  Power,
  RefreshCw,
  Download,
  Copy,
  Check,
  Info,
  Radio,
  Network,
  Cpu,
  Plus,
  ArrowLeft,
  QrCode,
  Smartphone,
  Laptop,
  Wifi,
  Trash2,
  Activity,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sliders,
  CheckCircle2,
  X,
} from "lucide-react";
import { ServerPlan, ServerCategory, BondingNode, DeviceKey } from "@/lib/types";

export default function HubDashboard() {
  // Navigation View: "fleet" (list of servers), "deploy" (Linode sizing tables), "manage" (single server dashboard)
  const [currentView, setCurrentView] = useState<"fleet" | "deploy" | "manage">("fleet");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("vz_node_chicago_01");

  // Deploy Form State
  const [activeTab, setActiveTab] = useState<ServerCategory>("dedicated");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("dedicated_16gb");
  const [serverLabel, setServerLabel] = useState<string>("chicago-relay-01");
  const [selectedRegion, setSelectedRegion] = useState<string>("US-Central (Chicago)");
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(35);

  // Device Management Modal States
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState<boolean>(false);
  const [newDeviceName, setNewDeviceName] = useState<string>("");
  const [newDeviceType, setNewDeviceType] = useState<"ios" | "android" | "macos" | "windows" | "router">("ios");
  const [qrModalKey, setQrModalKey] = useState<DeviceKey | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Active Fleet State (User's deployed cloud servers)
  const [nodes, setNodes] = useState<BondingNode[]>([
    {
      id: "vz_node_chicago_01",
      name: "chicago-relay-01",
      region: "US-Central (Chicago)",
      planId: "dedicated_16gb",
      planName: "Dedicated 16 GB",
      category: "dedicated",
      ipAddress: "198.51.100.24",
      port: 5000,
      status: "running",
      createdAt: "2026-09-03T12:00:00Z",
      uptimeSeconds: 7840,
      hourlyPrice: 0.229,
      monthlyPrice: 154,
      maxDevices: 50,
      inboundMbps: 142.8,
      outboundMbps: 139.4,
      packetLossPct: 0.0,
      devices: [
        {
          id: "dev_01",
          nodeId: "vz_node_chicago_01",
          name: "Director's iPhone 15 Pro",
          deviceType: "ios",
          assignedIp: "10.8.0.2",
          pairingToken: "vz_live_839f28c94e0192a7",
          status: "connected",
          currentSpeedMbps: 42.5,
          lastHandshake: "2s ago",
          createdAt: "2026-09-03T12:05:00Z",
        },
        {
          id: "dev_02",
          nodeId: "vz_node_chicago_01",
          name: "Studio MacBook Pro (vMix)",
          deviceType: "macos",
          assignedIp: "10.8.0.3",
          pairingToken: "vz_live_1928374a8b7c6d5e",
          status: "connected",
          currentSpeedMbps: 98.2,
          lastHandshake: "1s ago",
          createdAt: "2026-09-03T12:10:00Z",
        },
      ],
    },
    {
      id: "vz_node_nyc_02",
      name: "nyc-camera-node",
      region: "US-East (New York)",
      planId: "shared_1gb",
      planName: "Shared 1 GB",
      category: "shared",
      ipAddress: "198.51.100.89",
      port: 5000,
      status: "running",
      createdAt: "2026-09-03T13:30:00Z",
      uptimeSeconds: 2420,
      hourlyPrice: 0.022,
      monthlyPrice: 16,
      maxDevices: 5,
      inboundMbps: 35.1,
      outboundMbps: 34.8,
      packetLossPct: 0.0,
      devices: [
        {
          id: "dev_03",
          nodeId: "vz_node_nyc_02",
          name: "Field GL.iNet Travel Router",
          deviceType: "router",
          assignedIp: "10.8.0.2",
          pairingToken: "vz_live_774920aa9911bb22",
          status: "connected",
          currentSpeedMbps: 34.8,
          lastHandshake: "4s ago",
          createdAt: "2026-09-03T13:35:00Z",
        },
      ],
    },
  ]);

  // Master Plans with Max Device Allowances & Formula Pricing
  const allPlans: ServerPlan[] = [
    // === DEDICATED CPU PLANS ===
    {
      id: "dedicated_4gb",
      name: "Dedicated 4 GB",
      category: "dedicated",
      monthlyPrice: 48,
      hourlyPrice: 0.068,
      ram: "4 GB",
      cpus: 2,
      storage: "80 GB",
      transfer: "4 TB",
      networkSpeed: "40 Gbps / 4 Gbps",
      maxDevices: 10,
    },
    {
      id: "dedicated_8gb",
      name: "Dedicated 8 GB",
      category: "dedicated",
      monthlyPrice: 85,
      hourlyPrice: 0.122,
      ram: "8 GB",
      cpus: 4,
      storage: "160 GB",
      transfer: "5 TB",
      networkSpeed: "40 Gbps / 5 Gbps",
      maxDevices: 25,
    },
    {
      id: "dedicated_16gb",
      name: "Dedicated 16 GB",
      category: "dedicated",
      monthlyPrice: 159,
      hourlyPrice: 0.229,
      ram: "16 GB",
      cpus: 8,
      storage: "320 GB",
      transfer: "6 TB",
      networkSpeed: "40 Gbps / 6 Gbps",
      maxDevices: 50,
    },
    {
      id: "dedicated_32gb",
      name: "Dedicated 32 GB",
      category: "dedicated",
      monthlyPrice: 308,
      hourlyPrice: 0.443,
      ram: "32 GB",
      cpus: 16,
      storage: "640 GB",
      transfer: "7 TB",
      networkSpeed: "40 Gbps / 7 Gbps",
      maxDevices: 100,
    },
    {
      id: "dedicated_64gb",
      name: "Dedicated 64 GB",
      category: "dedicated",
      monthlyPrice: 604,
      hourlyPrice: 0.872,
      ram: "64 GB",
      cpus: 32,
      storage: "1280 GB",
      transfer: "8 TB",
      networkSpeed: "40 Gbps / 8 Gbps",
      maxDevices: 200,
    },
    {
      id: "dedicated_128gb",
      name: "Dedicated 128 GB",
      category: "dedicated",
      monthlyPrice: 1198,
      hourlyPrice: 1.733,
      ram: "128 GB",
      cpus: 50,
      storage: "2560 GB",
      transfer: "10 TB",
      networkSpeed: "40 Gbps / 10 Gbps",
      maxDevices: 500,
    },

    // === SHARED CPU PLANS ===
    {
      id: "shared_1gb",
      name: "Shared 1 GB",
      category: "shared",
      monthlyPrice: 16,
      hourlyPrice: 0.022,
      ram: "1 GB",
      cpus: 1,
      storage: "25 GB",
      transfer: "1 TB",
      networkSpeed: "40 Gbps / 1 Gbps",
      maxDevices: 5,
    },
    {
      id: "shared_2gb",
      name: "Shared 2 GB",
      category: "shared",
      monthlyPrice: 23,
      hourlyPrice: 0.033,
      ram: "2 GB",
      cpus: 1,
      storage: "50 GB",
      transfer: "2 TB",
      networkSpeed: "40 Gbps / 2 Gbps",
      maxDevices: 8,
    },
    {
      id: "shared_4gb",
      name: "Shared 4 GB",
      category: "shared",
      monthlyPrice: 35,
      hourlyPrice: 0.051,
      ram: "4 GB",
      cpus: 2,
      storage: "80 GB",
      transfer: "4 TB",
      networkSpeed: "40 Gbps / 4 Gbps",
      maxDevices: 15,
    },
    {
      id: "shared_8gb",
      name: "Shared 8 GB",
      category: "shared",
      monthlyPrice: 60,
      hourlyPrice: 0.086,
      ram: "8 GB",
      cpus: 4,
      storage: "160 GB",
      transfer: "5 TB",
      networkSpeed: "40 Gbps / 5 Gbps",
      maxDevices: 25,
    },
    {
      id: "shared_16gb",
      name: "Shared 16 GB",
      category: "shared",
      monthlyPrice: 110,
      hourlyPrice: 0.158,
      ram: "16 GB",
      cpus: 6,
      storage: "320 GB",
      transfer: "8 TB",
      networkSpeed: "40 Gbps / 6 Gbps",
      maxDevices: 40,
    },
    {
      id: "shared_32gb",
      name: "Shared 32 GB",
      category: "shared",
      monthlyPrice: 209,
      hourlyPrice: 0.301,
      ram: "32 GB",
      cpus: 8,
      storage: "640 GB",
      transfer: "16 TB",
      networkSpeed: "40 Gbps / 7 Gbps",
      maxDevices: 75,
    },
  ];

  // Active Selected Node for "manage" view
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Selected Plan for Deploy view
  const selectedPlan = allPlans.find((p) => p.id === selectedPlanId) || allPlans[0];

  // Live timer tick for running nodes
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((n) => ({
          ...n,
          uptimeSeconds: n.uptimeSeconds + 1,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Provisioning countdown simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isProvisioning) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Provisioning complete: Add new node to fleet
            const newNodeId = "vz_node_" + Math.random().toString(36).substring(7);
            const newNode: BondingNode = {
              id: newNodeId,
              name: serverLabel || "verz-relay",
              region: selectedRegion,
              planId: selectedPlan.id,
              planName: selectedPlan.name,
              category: selectedPlan.category,
              ipAddress: "198.51.100." + Math.floor(Math.random() * 200 + 10),
              port: 5000,
              status: "running",
              createdAt: new Date().toISOString(),
              uptimeSeconds: 1,
              hourlyPrice: selectedPlan.hourlyPrice,
              monthlyPrice: selectedPlan.monthlyPrice,
              maxDevices: selectedPlan.maxDevices,
              inboundMbps: 0.0,
              outboundMbps: 0.0,
              packetLossPct: 0.0,
              devices: [
                {
                  id: "dev_" + Math.random().toString(36).substring(7),
                  nodeId: newNodeId,
                  name: "Primary Device (Master)",
                  deviceType: "ios",
                  assignedIp: "10.8.0.2",
                  pairingToken: "vz_live_" + Math.random().toString(36).substring(2, 18),
                  status: "idle",
                  currentSpeedMbps: 0,
                  lastHandshake: "Just now",
                  createdAt: new Date().toISOString(),
                },
              ],
            };

            setNodes((existing) => [newNode, ...existing]);
            setIsProvisioning(false);
            setSelectedNodeId(newNodeId);
            setCurrentView("manage");
            return 35;
          }
          return prev - 1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isProvisioning, serverLabel, selectedRegion, selectedPlan]);

  const handleStartDeploy = () => {
    setIsProvisioning(true);
    setCountdown(35);
  };

  const handleDestroyServer = (nodeId: string) => {
    if (confirm("Are you sure you want to DESTROY this server? Billing will stop immediately.")) {
      setNodes((prev) => prev.filter((n) => n.id !== nodeId));
      if (selectedNodeId === nodeId) {
        setCurrentView("fleet");
      }
    }
  };

  const handleCreateDeviceKey = () => {
    if (!newDeviceName.trim()) {
      alert("Please enter a device label.");
      return;
    }

    if (activeNode.devices.length >= activeNode.maxDevices) {
      alert(`Plan limit reached. This ${activeNode.planName} server allows up to ${activeNode.maxDevices} simultaneous devices.`);
      return;
    }

    const nextIpNum = activeNode.devices.length + 2;
    const newKey: DeviceKey = {
      id: "dev_" + Math.random().toString(36).substring(7),
      nodeId: activeNode.id,
      name: newDeviceName,
      deviceType: newDeviceType,
      assignedIp: `10.8.0.${nextIpNum}`,
      pairingToken: "vz_live_" + Math.random().toString(36).substring(2, 18),
      status: "idle",
      currentSpeedMbps: 0,
      lastHandshake: "Pending connection",
      createdAt: new Date().toISOString(),
    };

    setNodes((prev) =>
      prev.map((n) =>
        n.id === activeNode.id
          ? { ...n, devices: [...n.devices, newKey] }
          : n
      )
    );

    setNewDeviceName("");
    setIsAddDeviceOpen(false);
    setQrModalKey(newKey);
  };

  const handleDeleteDeviceKey = (keyId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === activeNode.id
          ? { ...n, devices: n.devices.filter((d) => d.id !== keyId) }
          : n
      )
    );
  };

  const handleForceDisconnectAll = () => {
    alert("Active sessions cleared! Tunnel locks have been reset for this server.");
    setNodes((prev) =>
      prev.map((n) =>
        n.id === activeNode.id
          ? {
              ...n,
              devices: n.devices.map((d) => ({ ...d, status: "idle", currentSpeedMbps: 0 })),
            }
          : n
      )
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "ios":
      case "android":
        return <Smartphone className="h-4 w-4 text-sky-400" />;
      case "macos":
      case "windows":
        return <Laptop className="h-4 w-4 text-emerald-400" />;
      case "router":
        return <Wifi className="h-4 w-4 text-amber-400" />;
      default:
        return <Network className="h-4 w-4 text-zinc-300" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-black text-white p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ========================================================================= */}
        {/* VIEW 1: FLEET OVERVIEW ("MY CLOUD RELAYS")                                */}
        {/* ========================================================================= */}
        {currentView === "fleet" && (
          <div className="space-y-6">
            {/* Header with Fleet Stats & Deploy Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Cloud Relays
                  </h1>
                  <span className="text-xs font-mono font-bold bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded-full">
                    {nodes.length} Active {nodes.length === 1 ? "Server" : "Servers"}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 mt-1">
                  Manage your deployed private bonding servers across Chicago, New York, and Frankfurt.
                </p>
              </div>

              <button
                onClick={() => setCurrentView("deploy")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg"
              >
                <Plus className="h-4 w-4 text-black stroke-[3]" />
                <span>Deploy New Server</span>
              </button>
            </div>

            {/* Empty State */}
            {nodes.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-white/10 bg-surface-100 space-y-4">
                <Server className="h-12 w-12 text-zinc-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Active Servers</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  You do not have any cloud bonding relays deployed. Spin up your first dedicated instance in under 35 seconds.
                </p>
                <button
                  onClick={() => setCurrentView("deploy")}
                  className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider"
                >
                  Deploy First Relay
                </button>
              </div>
            ) : (
              /* Cloud Instances Table (Linode / AWS Style) */
              <div className="rounded-2xl border border-white/15 bg-surface-100 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                      <tr>
                        <th className="py-4 px-6">Server Label & Status</th>
                        <th className="py-4 px-6">Plan & Hardware</th>
                        <th className="py-4 px-6">Public IP</th>
                        <th className="py-4 px-6">Region</th>
                        <th className="py-4 px-6">Devices</th>
                        <th className="py-4 px-6">Rate</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {nodes.map((node) => {
                        const activeDevCount = node.devices.filter((d) => d.status === "connected").length;
                        return (
                          <tr
                            key={node.id}
                            className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                            onClick={() => {
                              setSelectedNodeId(node.id);
                              setCurrentView("manage");
                            }}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                                <div>
                                  <div className="font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                    <span>{node.name}</span>
                                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <span className="font-mono text-xs text-zinc-400">{node.id}</span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <span className="font-bold text-white block">{node.planName}</span>
                              <span className="text-xs text-zinc-400 font-mono">
                                {node.category === "dedicated" ? "100% Dedicated CPU" : "Shared Pool"}
                              </span>
                            </td>

                            <td className="py-4 px-6">
                              <span className="font-mono font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded text-xs">
                                {node.ipAddress}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-zinc-300 font-medium">
                              {node.region}
                            </td>

                            <td className="py-4 px-6">
                              <span className="font-mono text-xs text-zinc-200">
                                <strong className="text-white">{node.devices.length}</strong> / {node.maxDevices} keys
                              </span>
                              <span className="block text-[11px] text-emerald-400 font-mono">
                                {activeDevCount} active
                              </span>
                            </td>

                            <td className="py-4 px-6 font-mono text-xs">
                              <span className="text-white font-bold">${node.hourlyPrice.toFixed(3)}/hr</span>
                              <span className="block text-zinc-400 text-[11px]">(${node.monthlyPrice}/mo cap)</span>
                            </td>

                            <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedNodeId(node.id);
                                    setCurrentView("manage");
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-bold text-xs font-mono transition-all"
                                >
                                  Manage →
                                </button>
                                <button
                                  onClick={() => handleDestroyServer(node.id)}
                                  title="Destroy Server (Stops Billing)"
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 transition-all"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: DEPLOY NEW SERVER (THE LINODE-STYLE SIZING TABLE)                 */}
        {/* ========================================================================= */}
        {currentView === "deploy" && (
          <div className="space-y-6">
            {/* Breadcrumb & Title */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <button
                onClick={() => setCurrentView("fleet")}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-3.5 py-2 rounded-xl transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>← Back to All Relays</span>
              </button>

              <div className="text-xs font-mono text-zinc-400">
                Linode Backbone • 100% SLA Guarantee
              </div>
            </div>

            {/* Deploy Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Deploy Cloud Relay
              </h1>
              <p className="text-sm text-zinc-300 mt-1">
                Select your hardware specs. All servers include automated multi-WAN bonding, clean IPs, and device key generation.
              </p>
            </div>

            {/* Server Label & Region Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl bg-surface-100 border border-white/15">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  Server Label (Name)
                </label>
                <input
                  type="text"
                  value={serverLabel}
                  onChange={(e) => setServerLabel(e.target.value)}
                  placeholder="e.g. chicago-relay-01"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  Relay Region (Location)
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white"
                >
                  <option value="US-Central (Chicago)">US-Central (Chicago, IL) - 10 Gbps</option>
                  <option value="US-East (New York)">US-East (New York, NY) - 10 Gbps</option>
                  <option value="EU-Central (Frankfurt)">EU-Central (Frankfurt, DE) - 10 Gbps</option>
                  <option value="AP-South (Tokyo)">AP-South (Tokyo, JP) - 10 Gbps</option>
                </select>
              </div>
            </div>

            {/* Tabs: Dedicated CPU vs Shared CPU */}
            <div className="flex border-b border-white/15 gap-4">
              <button
                onClick={() => setActiveTab("dedicated")}
                className={`pb-3 text-sm font-bold font-mono transition-colors relative ${
                  activeTab === "dedicated" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                [ Dedicated CPU ]
                {activeTab === "dedicated" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-glow" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("shared")}
                className={`pb-3 text-sm font-bold font-mono transition-colors relative ${
                  activeTab === "shared" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                [ Shared CPU ]
                {activeTab === "shared" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-glow" />
                )}
              </button>
            </div>

            {/* Plans Table */}
            <div className="rounded-2xl border border-white/15 bg-surface-100 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    <tr>
                      <th className="py-4 px-4 w-12 text-center">Select</th>
                      <th className="py-4 px-4">Plan Name</th>
                      <th className="py-4 px-4">Monthly</th>
                      <th className="py-4 px-4">Hourly</th>
                      <th className="py-4 px-4">RAM</th>
                      <th className="py-4 px-4">CPUs</th>
                      <th className="py-4 px-4">Transfer</th>
                      <th className="py-4 px-4">Device Allowance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {allPlans
                      .filter((p) => p.category === activeTab)
                      .map((plan) => {
                        const isSelected = selectedPlanId === plan.id;
                        return (
                          <tr
                            key={plan.id}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "bg-white/10" : "hover:bg-white/[0.03]"
                            }`}
                          >
                            <td className="py-4 px-4 text-center">
                              <input
                                type="radio"
                                name="serverPlan"
                                checked={isSelected}
                                onChange={() => setSelectedPlanId(plan.id)}
                                className="h-4 w-4 text-white border-white/30 focus:ring-white"
                              />
                            </td>
                            <td className="py-4 px-4 font-bold text-white">
                              {plan.name}
                            </td>
                            <td className="py-4 px-4 font-mono font-bold text-white">
                              ${plan.monthlyPrice}/mo
                            </td>
                            <td className="py-4 px-4 font-mono text-zinc-300">
                              ${plan.hourlyPrice.toFixed(3)}/hr
                            </td>
                            <td className="py-4 px-4 text-zinc-300">{plan.ram}</td>
                            <td className="py-4 px-4 text-zinc-300">{plan.cpus} vCPU</td>
                            <td className="py-4 px-4 text-zinc-300">{plan.transfer}</td>
                            <td className="py-4 px-4">
                              <span className="font-mono text-xs font-bold bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded">
                                Up to {plan.maxDevices} Devices
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deploy Action Card */}
            <div className="p-6 rounded-2xl border-2 border-white/20 bg-surface-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                  Ready to Provision:
                </span>
                <div className="text-xl font-black text-white">
                  {selectedPlan.name} • ${selectedPlan.hourlyPrice.toFixed(3)}/hr
                  <span className="text-sm font-normal text-zinc-300 ml-2">(${selectedPlan.monthlyPrice}/mo cap)</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Allows up to {selectedPlan.maxDevices} simultaneous device keys. Billed on-demand.
                </p>
              </div>

              {isProvisioning ? (
                <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Provisioning VM on Cloud Backbone ({countdown}s)...</span>
                </div>
              ) : (
                <button
                  onClick={handleStartDeploy}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Zap className="h-4 w-4 text-black stroke-[3]" />
                  <span>Deploy {selectedPlan.name} (35s)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: SINGLE SERVER DETAIL DASHBOARD & DEVICE KEYS                      */}
        {/* ========================================================================= */}
        {currentView === "manage" && activeNode && (
          <div className="space-y-8">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <button
                onClick={() => setCurrentView("fleet")}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-3.5 py-2 rounded-xl transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>← Back to All Relays</span>
              </button>

              <button
                onClick={() => handleDestroyServer(activeNode.id)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-400 bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 px-3.5 py-2 rounded-xl transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Destroy This Server</span>
              </button>
            </div>

            {/* Server Overview Banner */}
            <div className="p-6 rounded-2xl bg-surface-100 border border-white/15 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {activeNode.name}
                    </h1>
                    <span className="text-xs font-mono font-bold bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded">
                      {activeNode.planName}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-zinc-300 mt-1">
                    Node ID: {activeNode.id} • Location: {activeNode.region}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-400 block">Dedicated Public IP</span>
                    <span className="font-mono text-base font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded inline-block">
                      {activeNode.ipAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Telemetry Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-xs text-zinc-400 block">Live Throughput</span>
                  <span className="text-lg font-bold text-white block mt-1">
                    {activeNode.inboundMbps.toFixed(1)} Mbps
                  </span>
                  <span className="text-[11px] text-emerald-400">Zero packet loss</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-xs text-zinc-400 block">Active Devices</span>
                  <span className="text-lg font-bold text-white block mt-1">
                    {activeNode.devices.filter((d) => d.status === "connected").length} / {activeNode.maxDevices}
                  </span>
                  <span className="text-[11px] text-zinc-400">Simultaneous limit</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-xs text-zinc-400 block">Session Uptime</span>
                  <span className="text-lg font-bold text-white block mt-1">
                    {Math.floor(activeNode.uptimeSeconds / 60)}m {activeNode.uptimeSeconds % 60}s
                  </span>
                  <span className="text-[11px] text-emerald-400">100.0% SLA</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-xs text-zinc-400 block">Billing Rate</span>
                  <span className="text-lg font-bold text-white block mt-1">
                    ${activeNode.hourlyPrice.toFixed(3)}/hr
                  </span>
                  <span className="text-[11px] text-zinc-400">Capped at ${activeNode.monthlyPrice}/mo</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DEVICE CONNECTION KEYS SECTION                                            */}
            {/* ========================================================================= */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Device Connection Keys</span>
                    <span className="text-xs font-mono font-bold bg-white/10 text-white px-2 py-0.5 rounded border border-white/15">
                      {activeNode.devices.length} of {activeNode.maxDevices} Keys Generated
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Each device gets an isolated cryptographic tunnel into this server. Connect phones via QR code, or routers via .conf file.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleForceDisconnectAll}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-zinc-200 transition-colors"
                  >
                    ⚡ Force Reset Locks
                  </button>

                  <button
                    onClick={() => setIsAddDeviceOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md"
                  >
                    <Plus className="h-4 w-4 text-black stroke-[3]" />
                    <span>Add Device Key</span>
                  </button>
                </div>
              </div>

              {/* Devices Table */}
              <div className="rounded-2xl border border-white/15 bg-surface-100 overflow-hidden shadow-xl">
                {activeNode.devices.length === 0 ? (
                  <div className="p-8 text-center text-zinc-400 text-sm">
                    No device keys created yet. Click <strong>"Add Device Key"</strong> to generate your first phone, laptop, or router connection.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white/5 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                        <tr>
                          <th className="py-4 px-6">Device Name & Type</th>
                          <th className="py-4 px-6">Tunnel IP</th>
                          <th className="py-4 px-6">Connection Status</th>
                          <th className="py-4 px-6">Pairing Token</th>
                          <th className="py-4 px-6 text-right">Connect Actions</th>
                          <th className="py-4 px-6 text-right">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-sans">
                        {activeNode.devices.map((device) => (
                          <tr key={device.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                  {getDeviceIcon(device.deviceType)}
                                </div>
                                <div>
                                  <span className="font-bold text-white block">{device.name}</span>
                                  <span className="text-xs font-mono uppercase text-zinc-400">
                                    {device.deviceType}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6 font-mono text-xs text-zinc-300">
                              {device.assignedIp}
                            </td>

                            <td className="py-4 px-6 font-mono text-xs">
                              {device.status === "connected" ? (
                                <div className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                                  <span className="text-emerald-400 font-bold">
                                    Online ({device.currentSpeedMbps} Mbps)
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-zinc-400">
                                  <span className="h-2 w-2 rounded-full bg-zinc-500" />
                                  <span>Idle / Offline</span>
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-6 font-mono text-xs text-zinc-400">
                              <div className="flex items-center gap-2">
                                <span className="truncate max-w-[120px]">{device.pairingToken}</span>
                                <button
                                  onClick={() => copyToClipboard(device.pairingToken, device.id)}
                                  className="text-cyan-400 hover:text-white transition-colors"
                                  title="Copy Token"
                                >
                                  {copiedKeyId === device.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2 font-mono text-xs">
                                <button
                                  onClick={() => setQrModalKey(device)}
                                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-bold transition-all flex items-center gap-1.5"
                                >
                                  <QrCode className="h-3.5 w-3.5" />
                                  <span>QR Code</span>
                                </button>

                                <button
                                  onClick={() =>
                                    alert(`Downloading WireGuard / VERZ configuration profile for ${device.name}...`)
                                  }
                                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-200 transition-all flex items-center gap-1.5"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  <span>.conf</span>
                                </button>
                              </div>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => handleDeleteDeviceKey(device.id)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Revoke Device Key"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: ADD DEVICE KEY                                                     */}
        {/* ========================================================================= */}
        {isAddDeviceOpen && activeNode && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface-100 border border-white/20 rounded-2xl p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">Generate Device Key</h3>
                <button
                  onClick={() => setIsAddDeviceOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                    Device Label
                  </label>
                  <input
                    type="text"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    placeholder="e.g. Sony FX6 Camera Rig or iPhone"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                    Device Platform / Type
                  </label>
                  <select
                    value={newDeviceType}
                    onChange={(e) => setNewDeviceType(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white"
                  >
                    <option value="ios">Apple iOS (iPhone / iPad) - QR Code</option>
                    <option value="android">Android Phone / Tablet - QR Code</option>
                    <option value="macos">Apple macOS (MacBook / Studio)</option>
                    <option value="windows">Windows PC (vMix / OBS)</option>
                    <option value="router">Hardware Router (GL.iNet / OpenWrt / Custom PCB)</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono">
                  Assigned Internal IP: <strong className="text-white">10.8.0.{activeNode.devices.length + 2}</strong>
                  <span className="block text-[11px] text-zinc-400 mt-0.5">
                    Server allows {activeNode.maxDevices} simultaneous connections.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsAddDeviceOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDeviceKey}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md"
                >
                  Generate Key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: QR CODE INSTANT MOBILE ONBOARDING                                  */}
        {/* ========================================================================= */}
        {qrModalKey && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-surface-100 border border-white/20 rounded-2xl p-6 text-center space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white">{qrModalKey.name}</h3>
                <button
                  onClick={() => setQrModalKey(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* QR Code Container */}
              <div className="p-6 bg-white rounded-2xl inline-block mx-auto shadow-inner">
                {/* Simulated High-Res QR SVG */}
                <svg
                  className="w-48 h-48 mx-auto"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" fill="white" />
                  {/* Position squares */}
                  <rect x="10" y="10" width="25" height="25" fill="black" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="black" />

                  <rect x="65" y="10" width="25" height="25" fill="black" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="black" />

                  <rect x="10" y="65" width="25" height="25" fill="black" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="black" />

                  {/* Matrix pattern */}
                  <rect x="42" y="12" width="6" height="6" fill="black" />
                  <rect x="52" y="12" width="6" height="6" fill="black" />
                  <rect x="42" y="24" width="6" height="6" fill="black" />
                  <rect x="48" y="32" width="6" height="6" fill="black" />
                  <rect x="12" y="42" width="6" height="6" fill="black" />
                  <rect x="24" y="42" width="6" height="6" fill="black" />
                  <rect x="36" y="42" width="6" height="6" fill="black" />
                  <rect x="48" y="42" width="6" height="6" fill="black" />
                  <rect x="60" y="42" width="6" height="6" fill="black" />
                  <rect x="72" y="42" width="6" height="6" fill="black" />
                  <rect x="84" y="42" width="6" height="6" fill="black" />
                  <rect x="42" y="52" width="6" height="6" fill="black" />
                  <rect x="60" y="52" width="6" height="6" fill="black" />
                  <rect x="78" y="52" width="6" height="6" fill="black" />
                  <rect x="42" y="64" width="6" height="6" fill="black" />
                  <rect x="54" y="64" width="6" height="6" fill="black" />
                  <rect x="66" y="64" width="6" height="6" fill="black" />
                  <rect x="42" y="76" width="6" height="6" fill="black" />
                  <rect x="60" y="76" width="6" height="6" fill="black" />
                  <rect x="72" y="76" width="6" height="6" fill="black" />
                  <rect x="84" y="76" width="6" height="6" fill="black" />
                  <rect x="54" y="88" width="6" height="6" fill="black" />
                  <rect x="78" y="88" width="6" height="6" fill="black" />
                </svg>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono text-zinc-300">
                  Scan this QR code with your iPhone, Android, or VERZ Link app to connect in 1 second.
                </p>
                <div className="font-mono text-[11px] text-zinc-400 bg-black/50 p-2 rounded-lg truncate border border-white/10">
                  {qrModalKey.pairingToken}
                </div>
              </div>

              <button
                onClick={() => setQrModalKey(null)}
                className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
