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
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  X,
  Gauge,
  Signal,
  ArrowUpRight,
  ArrowDownLeft,
  Layers,
  Globe,
} from "lucide-react";
import { ServerPlan, ServerCategory, BondingNode, DeviceKey, BondedInterface } from "@/lib/types";

// ============================================================================
// HELPER SUBCOMPONENTS: LIVE SVG SPARKLINE & SIGNAL QUALITY BARS
// ============================================================================

function DeviceSparkline({ points, color = "#34d399" }: { points: number[]; color?: string }) {
  if (!points || points.length < 2) return null;
  const max = Math.max(...points, 60);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const height = 24;
  const width = 84;
  const step = width / (points.length - 1);

  const pathD = points
    .map((pt, i) => {
      const x = i * step;
      const y = height - ((pt - min) / range) * (height - 6) - 3;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SignalBars({ qualityPct }: { qualityPct: number }) {
  const bars = [25, 50, 75, 90];
  return (
    <div className="flex items-end gap-0.5 h-3.5" title={`Signal Health: ${qualityPct}%`}>
      {bars.map((threshold, idx) => (
        <span
          key={idx}
          style={{ height: `${(idx + 1) * 25}%` }}
          className={`w-1 rounded-sm transition-all duration-300 ${
            qualityPct >= threshold
              ? "bg-emerald-400 shadow-[0_0_6px_#34d399]"
              : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function HubDashboard() {
  // Navigation View: "fleet" (list of servers), "deploy" (sizing tables), "manage" (single server dashboard)
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
  const [newDeviceBondedPorts, setNewDeviceBondedPorts] = useState<number>(2);
  const [expandedDeviceIds, setExpandedDeviceIds] = useState<string[]>(["dev_01", "dev_02", "dev_03"]);
  const [qrModalKey, setQrModalKey] = useState<DeviceKey | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [nodeToDelete, setNodeToDelete] = useState<BondingNode | null>(null);

  const toggleDeviceExpand = (deviceId: string) => {
    setExpandedDeviceIds((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  // Active Fleet State with Deep Multi-WAN Telemetry
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
      monthlyPrice: 159,
      maxDevices: 50,
      inboundMbps: 140.7,
      outboundMbps: 138.2,
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
          uploadSpeedMbps: 42.5,
          downloadSpeedMbps: 18.2,
          totalDataTransferredGb: 14.8,
          bandwidthLoadPct: 74,
          signalQualityPct: 96,
          packetLossPct: 0.0,
          latencyMs: 18,
          bondedPortsCount: 2,
          interfaces: [
            {
              id: "if_1",
              name: "Port 1: 5G Ultra Wideband",
              type: "cellular",
              speedMbps: 26.5,
              signalStrengthPct: 96,
              latencyMs: 17,
              packetLossPct: 0.0,
              status: "active",
              ispOrCarrier: "Verizon 5G Ultra Wideband",
              publicIp: "174.205.88.42",
            },
            {
              id: "if_2",
              name: "Port 2: Wi-Fi 6 (Field Hotspot)",
              type: "wifi",
              speedMbps: 16.0,
              signalStrengthPct: 92,
              latencyMs: 19,
              packetLossPct: 0.0,
              status: "active",
              ispOrCarrier: "AT&T Fiber",
              localIp: "192.168.4.112",
              gatewayIp: "192.168.4.1",
              publicIp: "108.212.95.14",
            },
          ],
          sparkline: [22, 28, 35, 38, 41, 40, 42, 44, 43, 42, 43, 42],
          lastHandshake: "1s ago",
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
          uploadSpeedMbps: 98.2,
          downloadSpeedMbps: 45.1,
          totalDataTransferredGb: 52.4,
          bandwidthLoadPct: 88,
          signalQualityPct: 98,
          packetLossPct: 0.0,
          latencyMs: 14,
          bondedPortsCount: 3,
          interfaces: [
            {
              id: "if_3",
              name: "Port 1: Gigabit Fiber Ethernet",
              type: "ethernet",
              speedMbps: 58.0,
              signalStrengthPct: 100,
              latencyMs: 12,
              packetLossPct: 0.0,
              status: "active",
              ispOrCarrier: "Comcast Business Metro-E",
              localIp: "192.168.1.84",
              gatewayIp: "192.168.1.1",
              publicIp: "73.189.44.12",
            },
            {
              id: "if_4",
              name: "Port 2: 5G Backup Modem",
              type: "cellular",
              speedMbps: 24.2,
              signalStrengthPct: 94,
              latencyMs: 16,
              packetLossPct: 0.0,
              status: "active",
              ispOrCarrier: "T-Mobile 5G Standalone",
              publicIp: "172.56.21.84",
            },
            {
              id: "if_5",
              name: "Port 3: Starlink Mobile Gen 3",
              type: "satellite",
              speedMbps: 16.0,
              signalStrengthPct: 95,
              latencyMs: 26,
              packetLossPct: 0.0,
              status: "active",
              ispOrCarrier: "SpaceX Starlink Mobility",
              localIp: "192.168.100.24",
              gatewayIp: "192.168.100.1",
              publicIp: "98.97.182.65",
            },
          ],
          sparkline: [80, 85, 92, 95, 98, 97, 99, 98, 97, 98, 99, 98],
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
      inboundMbps: 34.8,
      outboundMbps: 33.2,
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
          uploadSpeedMbps: 34.8,
          downloadSpeedMbps: 12.0,
          totalDataTransferredGb: 8.6,
          bandwidthLoadPct: 62,
          signalQualityPct: 91,
          packetLossPct: 0.0,
          latencyMs: 22,
          bondedPortsCount: 2,
          interfaces: [
            {
              id: "if_6",
              name: "Port 1: Dual LTE USB Dongle",
              type: "cellular",
              speedMbps: 20.8,
              signalStrengthPct: 88,
              latencyMs: 24,
              packetLossPct: 0.0,
              status: "active",
              ispOrCarrier: "AT&T Business LTE",
              publicIp: "166.198.42.19",
            },
            {
              id: "if_7",
              name: "Port 2: Venue Guest Wi-Fi",
              type: "wifi",
              speedMbps: 14.0,
              signalStrengthPct: 94,
              latencyMs: 20,
              packetLossPct: 0.0,
              status: "active",
              ispOrCarrier: "Spectrum Enterprise",
              localIp: "10.0.12.85",
              gatewayIp: "10.0.12.1",
              publicIp: "68.195.220.104",
            },
          ],
          sparkline: [18, 22, 28, 32, 34, 35, 33, 34, 35, 34, 35, 34],
          lastHandshake: "3s ago",
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

  // Live real-time telemetry tick (simulating live bonding packet balancing)
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          let nodeInboundSum = 0;
          let nodeOutboundSum = 0;

          const updatedDevices = n.devices.map((d) => {
            if (d.status !== "connected") return d;

            // Subtle live fluctuations for realism
            const delta = (Math.random() - 0.5) * 1.6;
            const newUpload = Math.max(8, Number((d.uploadSpeedMbps + delta).toFixed(1)));
            const newDownload = Math.max(4, Number((d.downloadSpeedMbps + delta * 0.4).toFixed(1)));
            const newLoad = Math.min(99, Math.max(30, Math.round(d.bandwidthLoadPct + (Math.random() - 0.5) * 3)));
            const newTransferred = Number((d.totalDataTransferredGb + newUpload / 9000).toFixed(2));
            const newSparkline = [...d.sparkline.slice(1), Math.round(newUpload)];

            nodeInboundSum += newUpload;
            nodeOutboundSum += newDownload;

            // Distribute across bonded interfaces
            const updatedInterfaces = d.interfaces.map((intf, idx) => {
              const weight = 1 / d.interfaces.length;
              const intfDelta = (Math.random() - 0.5) * 0.8;
              const intfSpeed = Math.max(2, Number((newUpload * weight + intfDelta).toFixed(1)));
              return {
                ...intf,
                speedMbps: intfSpeed,
                latencyMs: Math.max(12, intf.latencyMs + Math.round((Math.random() - 0.5) * 2)),
              };
            });

            return {
              ...d,
              uploadSpeedMbps: newUpload,
              downloadSpeedMbps: newDownload,
              bandwidthLoadPct: newLoad,
              totalDataTransferredGb: newTransferred,
              sparkline: newSparkline,
              interfaces: updatedInterfaces,
            };
          });

          return {
            ...n,
            uptimeSeconds: n.uptimeSeconds + 1,
            inboundMbps: Number((nodeInboundSum || n.inboundMbps).toFixed(1)),
            outboundMbps: Number((nodeOutboundSum || n.outboundMbps).toFixed(1)),
            devices: updatedDevices,
          };
        })
      );
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Provisioning countdown simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isProvisioning) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Provisioning complete: Add new node to fleet with 0 devices
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
              devices: [],
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

  const handleDeleteServer = (node: BondingNode) => {
    setNodeToDelete(node);
  };

  const confirmDeleteNode = () => {
    if (!nodeToDelete) return;
    const targetId = nodeToDelete.id;
    setNodes((prev) => prev.filter((n) => n.id !== targetId));
    if (selectedNodeId === targetId) {
      setCurrentView("fleet");
    }
    setNodeToDelete(null);
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

    // Generate bonded interfaces based on selected port count
    const generatedInterfaces: BondedInterface[] = [];
    if (newDeviceBondedPorts === 1) {
      generatedInterfaces.push({
        id: "if_gen_1",
        name: "Port 1: Cellular 5G (SIM 1)",
        type: "cellular",
        speedMbps: 32.5,
        signalStrengthPct: 95,
        latencyMs: 18,
        packetLossPct: 0.0,
        status: "active",
        ispOrCarrier: "T-Mobile 5G Ultra",
        publicIp: `172.56.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
      });
    } else if (newDeviceBondedPorts === 2) {
      generatedInterfaces.push(
        {
          id: "if_gen_1",
          name: "Port 1: Cellular 5G (SIM 1)",
          type: "cellular",
          speedMbps: 22.0,
          signalStrengthPct: 96,
          latencyMs: 17,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "Verizon 5G UW",
          publicIp: `174.205.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
        },
        {
          id: "if_gen_2",
          name: "Port 2: Wi-Fi 6 / Backup WAN",
          type: "wifi",
          speedMbps: 16.5,
          signalStrengthPct: 92,
          latencyMs: 19,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "Spectrum Business Fiber",
          localIp: `192.168.1.${Math.floor(Math.random() * 150) + 20}`,
          gatewayIp: "192.168.1.1",
          publicIp: `71.120.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
        }
      );
    } else if (newDeviceBondedPorts === 3) {
      generatedInterfaces.push(
        {
          id: "if_gen_1",
          name: "Port 1: Cellular 5G High-Band",
          type: "cellular",
          speedMbps: 24.5,
          signalStrengthPct: 96,
          latencyMs: 16,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "AT&T 5G+",
          publicIp: `107.77.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
        },
        {
          id: "if_gen_2",
          name: "Port 2: Cellular LTE Secondary",
          type: "cellular",
          speedMbps: 12.0,
          signalStrengthPct: 84,
          latencyMs: 22,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "T-Mobile LTE",
          publicIp: `172.56.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
        },
        {
          id: "if_gen_3",
          name: "Port 3: Starlink Mobile Kit",
          type: "satellite",
          speedMbps: 18.2,
          signalStrengthPct: 95,
          latencyMs: 28,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "SpaceX Starlink Mobility",
          localIp: `192.168.100.${Math.floor(Math.random() * 80) + 20}`,
          gatewayIp: "192.168.100.1",
          publicIp: `98.97.${Math.floor(Math.random() * 80) + 100}.${Math.floor(Math.random() * 200) + 10}`,
        }
      );
    } else {
      generatedInterfaces.push(
        {
          id: "if_gen_1",
          name: "Port 1: 5G Carrier A",
          type: "cellular",
          speedMbps: 28.0,
          signalStrengthPct: 98,
          latencyMs: 15,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "Verizon 5G UW",
          publicIp: `174.205.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
        },
        {
          id: "if_gen_2",
          name: "Port 2: 5G Carrier B",
          type: "cellular",
          speedMbps: 26.5,
          signalStrengthPct: 92,
          latencyMs: 17,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "T-Mobile 5G Standalone",
          publicIp: `172.56.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
        },
        {
          id: "if_gen_3",
          name: "Port 3: Starlink Flat High-Perf",
          type: "satellite",
          speedMbps: 22.0,
          signalStrengthPct: 97,
          latencyMs: 26,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "SpaceX Starlink Enterprise",
          localIp: `192.168.100.${Math.floor(Math.random() * 80) + 20}`,
          gatewayIp: "192.168.100.1",
          publicIp: `98.97.${Math.floor(Math.random() * 80) + 100}.${Math.floor(Math.random() * 200) + 10}`,
        },
        {
          id: "if_gen_4",
          name: "Port 4: Venue Fiber Ethernet",
          type: "ethernet",
          speedMbps: 35.0,
          signalStrengthPct: 100,
          latencyMs: 11,
          packetLossPct: 0.0,
          status: "active",
          ispOrCarrier: "Comcast Business Gigabit",
          localIp: `10.0.0.${Math.floor(Math.random() * 100) + 10}`,
          gatewayIp: "10.0.0.1",
          publicIp: `73.189.${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 200) + 10}`,
        }
      );
    }

    const totalInitSpeed = Number(generatedInterfaces.reduce((acc, curr) => acc + curr.speedMbps, 0).toFixed(1));

    const newKey: DeviceKey = {
      id: "dev_" + Math.random().toString(36).substring(7),
      nodeId: activeNode.id,
      name: newDeviceName,
      deviceType: newDeviceType,
      assignedIp: `10.8.0.${nextIpNum}`,
      pairingToken: "vz_live_" + Math.random().toString(36).substring(2, 18),
      status: "connected",
      uploadSpeedMbps: totalInitSpeed,
      downloadSpeedMbps: Number((totalInitSpeed * 0.45).toFixed(1)),
      totalDataTransferredGb: 0.05,
      bandwidthLoadPct: 58,
      signalQualityPct: 95,
      packetLossPct: 0.0,
      latencyMs: 18,
      bondedPortsCount: newDeviceBondedPorts,
      interfaces: generatedInterfaces,
      sparkline: [20, 24, 28, 30, 32, 34, 33, 35, 36, 37, 36, totalInitSpeed],
      lastHandshake: "Just now",
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
    setExpandedDeviceIds((prev) => [...prev, newKey.id]);
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
              devices: n.devices.map((d) => ({
                ...d,
                status: "idle",
                uploadSpeedMbps: 0,
                downloadSpeedMbps: 0,
                bandwidthLoadPct: 0,
                signalQualityPct: 0,
                sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              })),
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
                  Manage your private bonding servers across Chicago, New York, and Frankfurt.
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
              /* Cloud Instances Fleet Spaced Floating Cards with Integrated Labels */
              <div className="space-y-3">
                <div className="overflow-x-auto pb-4">
                  <div className="min-w-[1040px] space-y-6">
                    {nodes.map((node, index) => {
                      const activeDevCount = node.devices.filter((d) => d.status === "connected").length;
                      const rowNumber = String(index + 1).padStart(2, "0");
                      return (
                        <div
                          key={node.id}
                          onClick={() => {
                            setSelectedNodeId(node.id);
                            setCurrentView("manage");
                          }}
                          className="p-5 sm:p-6 rounded-2xl bg-surface-100 hover:bg-[#181D2A] border-2 border-white/15 hover:border-cyan-400/50 border-l-[6px] border-l-emerald-400 transition-all shadow-lg hover:shadow-[0_12px_36px_rgba(0,229,255,0.1)] group cursor-pointer space-y-3.5"
                        >
                          {/* TOP LEVEL LABELS ROW (100% LEVEL, EVEN HORIZONTAL ALIGNMENT, HIGH READABILITY) */}
                          <div className="grid grid-cols-[48px_2.2fr_1.6fr_1.4fr_1.5fr_1.1fr_1.1fr_130px] items-center gap-4 text-xs font-mono font-black uppercase tracking-wider text-zinc-300 border-b border-white/10 pb-2.5">
                            <div className="text-center text-zinc-400">#</div>
                            <div>Server Name & Status</div>
                            <div>Plan & Hardware</div>
                            <div>Public IP</div>
                            <div>Region</div>
                            <div>Devices</div>
                            <div>Rate</div>
                            <div className="text-right">Actions</div>
                          </div>

                          {/* VALUES DATA ROW (PERFECTLY ALIGNED UNDER RESPECTIVE LABELS) */}
                          <div className="grid grid-cols-[48px_2.2fr_1.6fr_1.4fr_1.5fr_1.1fr_1.1fr_130px] items-center gap-4">
                            {/* 1. Number Badge */}
                            <div className="flex items-center justify-center">
                              <span className="font-mono text-xs font-black text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 px-2.5 py-1 rounded-md shadow-sm group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                                {rowNumber}
                              </span>
                            </div>

                            {/* 2. Server Name & Status */}
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse shrink-0" />
                              <div className="min-w-0">
                                <div className="font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5 truncate">
                                  <span className="truncate">{node.name}</span>
                                  <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                </div>
                                <span className="font-mono text-xs text-zinc-400 truncate block mt-0.5">{node.id}</span>
                              </div>
                            </div>

                            {/* 3. Plan & Hardware */}
                            <div className="min-w-0">
                              <span className="font-bold text-white block truncate">{node.planName}</span>
                              <span className="text-xs text-zinc-400 font-mono block truncate mt-0.5">
                                {node.category === "dedicated" ? "100% Dedicated CPU" : "Shared Pool"}
                              </span>
                            </div>

                            {/* 4. Public IP */}
                            <div>
                              <span className="font-mono font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded text-xs inline-block">
                                {node.ipAddress}
                              </span>
                            </div>

                            {/* 5. Region */}
                            <div className="text-zinc-200 font-medium truncate text-sm">
                              {node.region}
                            </div>

                            {/* 6. Devices */}
                            <div className="font-mono text-xs">
                              <span className="text-zinc-200 block">
                                <strong className="text-white">{node.devices.length}</strong> / {node.maxDevices} keys
                              </span>
                              <span className="block text-[11px] text-emerald-400 font-bold mt-0.5">
                                {activeDevCount} active
                              </span>
                            </div>

                            {/* 7. Rate */}
                            <div className="font-mono text-xs">
                              <span className="text-white font-bold block">${node.hourlyPrice.toFixed(3)}/hr</span>
                              <span className="block text-zinc-400 text-[11px] mt-0.5">(${node.monthlyPrice}/mo cap)</span>
                            </div>

                            {/* 8. Actions */}
                            <div className="text-right" onClick={(e) => e.stopPropagation()}>
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
                                  onClick={() => handleDeleteServer(node)}
                                  title="Delete Server (Stops Billing)"
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 transition-all"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: DEPLOY NEW SERVER (SIZING TABLE)                                  */}
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
                <span>Back to All Relays</span>
              </button>

              <div className="text-xs font-mono text-zinc-400">
                VERZ Cloud Backbone • 100% SLA Guarantee
              </div>
            </div>

            {/* Deploy Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Deploy Cloud Relay
              </h1>
              <p className="text-sm text-zinc-200 mt-1">
                Select your hardware specs. All servers include automated multi-WAN bonding, clean IPs, and device key generation.
              </p>
            </div>

            {/* Server Label & Region Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-surface-100 border-2 border-white/20 shadow-xl">
              <div>
                <label className="block text-sm font-black uppercase tracking-wider text-white mb-2">
                  Server Name
                </label>
                <input
                  type="text"
                  value={serverLabel}
                  onChange={(e) => setServerLabel(e.target.value)}
                  placeholder="e.g. chicago-relay-01"
                  className="w-full px-4 py-3.5 rounded-xl bg-black border-2 border-white/30 text-white font-bold text-base focus:outline-none focus:border-white placeholder:text-zinc-600 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-wider text-white mb-2">
                  Relay Region (Location)
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-black border-2 border-white/30 text-white font-bold text-base focus:outline-none focus:border-white shadow-inner"
                >
                  <option value="US-Central (Chicago)">US-Central (Chicago, IL) - 10 Gbps</option>
                  <option value="US-East (New York)">US-East (New York, NY) - 10 Gbps</option>
                  <option value="EU-Central (Frankfurt)">EU-Central (Frankfurt, DE) - 10 Gbps</option>
                  <option value="AP-South (Tokyo)">AP-South (Tokyo, JP) - 10 Gbps</option>
                </select>
              </div>
            </div>

            {/* Tabs: Dedicated CPU vs Shared CPU (High-Contrast Segmented Buttons) */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab("dedicated")}
                className={`px-6 py-3 rounded-xl text-sm font-black font-mono transition-all ${
                  activeTab === "dedicated"
                    ? "bg-white text-black shadow-xl scale-[1.02]"
                    : "bg-zinc-900 text-white border-2 border-white/30 hover:bg-zinc-800"
                }`}
              >
                [ Dedicated CPU ]
              </button>
              <button
                onClick={() => setActiveTab("shared")}
                className={`px-6 py-3 rounded-xl text-sm font-black font-mono transition-all ${
                  activeTab === "shared"
                    ? "bg-white text-black shadow-xl scale-[1.02]"
                    : "bg-zinc-900 text-white border-2 border-white/30 hover:bg-zinc-800"
                }`}
              >
                [ Shared CPU ]
              </button>
            </div>

            {/* Plans Table (Maximum Contrast for Low-Vision Users) */}
            <div className="rounded-2xl border-2 border-white/20 bg-surface-100 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-900 border-b-2 border-white/20 text-xs font-mono font-black uppercase tracking-wider text-white">
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
                  <tbody className="divide-y divide-white/10 font-sans">
                    {allPlans
                      .filter((p) => p.category === activeTab)
                      .map((plan, planIdx) => {
                        const isSelected = selectedPlanId === plan.id;
                        const isPlanDarker = planIdx % 2 === 0;
                        return (
                          <tr
                            key={plan.id}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-white/15 border-l-4 border-l-cyan-400"
                                : isPlanDarker
                                ? "bg-[#090B12] hover:bg-white/[0.08]"
                                : "bg-[#181D2A] hover:bg-white/[0.08]"
                            }`}
                          >
                            <td className="py-4 px-4 text-center">
                              <input
                                type="radio"
                                name="serverPlan"
                                checked={isSelected}
                                onChange={() => setSelectedPlanId(plan.id)}
                                className="h-5 w-5 text-white accent-cyan-400 border-white focus:ring-white"
                              />
                            </td>
                            <td className="py-4 px-4 font-black text-base text-white">
                              {plan.name}
                            </td>
                            <td className="py-4 px-4 font-mono font-black text-base text-white">
                              ${plan.monthlyPrice}/mo
                            </td>
                            <td className="py-4 px-4 font-mono font-bold text-sm text-cyan-300">
                              ${plan.hourlyPrice.toFixed(3)}/hr
                            </td>
                            <td className="py-4 px-4 font-bold text-sm text-white">{plan.ram}</td>
                            <td className="py-4 px-4 font-bold text-sm text-white">{plan.cpus} vCPU</td>
                            <td className="py-4 px-4 font-bold text-sm text-white">{plan.transfer}</td>
                            <td className="py-4 px-4">
                              <span className="font-mono text-xs font-black text-emerald-300 bg-emerald-950/80 border-2 border-emerald-500/60 px-3 py-1.5 rounded-lg inline-block shadow-sm">
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
                <span>Back to All Relays</span>
              </button>

              <button
                onClick={() => handleDeleteServer(activeNode)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-400 bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 px-3.5 py-2 rounded-xl transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Server</span>
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
            {/* DEVICE CONNECTION KEYS SECTION (FULL LIVE TELEMETRY & MULTI-WAN BREAKDOWN)*/}
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
                    Live bandwidth, load capacity, signal health waveform, and bonded WAN ports per device.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleForceDisconnectAll}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-zinc-200 transition-colors"
                  >
                    Force Reset Locks
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

              {/* Connection Keys Dropdown List (Click to Show Details / Click to Hide) */}
              <div className="space-y-3">
                {activeNode.devices.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400 text-sm space-y-2 rounded-2xl border-2 border-white/15 bg-surface-100">
                    <p className="font-bold text-white text-base">No device connection keys generated yet.</p>
                    <p>Click <strong>"Add Device Key"</strong> above to generate a new key for your phone, laptop, or multi-port router.</p>
                  </div>
                ) : (
                  activeNode.devices.map((device) => {
                    const isExpanded = expandedDeviceIds.includes(device.id);
                    return (
                      <div
                        key={device.id}
                        className={`rounded-2xl border-2 transition-all overflow-hidden ${
                          isExpanded
                            ? "border-cyan-400/50 bg-surface-100 shadow-[0_0_30px_rgba(0,229,255,0.08)]"
                            : "border-white/15 bg-surface-100/90 hover:border-white/30"
                        }`}
                      >
                        {/* ============================================================= */}
                        {/* CLICKABLE DROPDOWN HEADER BAR (CLICK TO SHOW / HIDE DETAILS) */}
                        {/* ============================================================= */}
                        <div
                          onClick={() => toggleDeviceExpand(device.id)}
                          className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-white/[0.03]"
                        >
                          {/* Left: Device Icon, Name, IP, Type, Status */}
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/15 shrink-0">
                              {getDeviceIcon(device.deviceType)}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-base truncate">{device.name}</span>
                                <span className="text-[10px] font-mono uppercase font-bold text-zinc-300 bg-white/10 border border-white/15 px-2 py-0.5 rounded shrink-0">
                                  {device.deviceType}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 mt-1 font-mono text-xs">
                                <span className="font-bold text-cyan-300">{device.assignedIp}</span>
                                <span className="text-zinc-600">•</span>
                                {device.status === "connected" ? (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
                                    Online
                                  </span>
                                ) : (
                                  <span className="text-zinc-500">Idle / Offline</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Center: Bonded Ports Chip, Live Speed, Load, Signal */}
                          <div className="flex items-center flex-wrap gap-4 sm:gap-6 font-mono text-xs">
                            {/* Ports Chip */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold shrink-0">
                              <Layers className="h-3.5 w-3.5" />
                              <span>{device.bondedPortsCount} {device.bondedPortsCount === 1 ? "Port" : "Ports"} Bonded</span>
                            </div>

                            {/* Live Speed */}
                            {device.status === "connected" && (
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="flex items-center gap-1 text-emerald-400 font-black text-sm">
                                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                                    <span>{device.uploadSpeedMbps.toFixed(1)} Mbps</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                                    <ArrowDownLeft className="h-3 w-3 text-zinc-500" />
                                    <span>{device.downloadSpeedMbps.toFixed(1)} Mbps</span>
                                  </div>
                                </div>

                                {/* Load Meter */}
                                <div className="hidden lg:block min-w-[90px]">
                                  <div className="flex items-center justify-between text-[11px] mb-1">
                                    <span className="text-zinc-300 font-bold">{device.bandwidthLoadPct}% Load</span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                    <div
                                      className="h-full bg-emerald-400 rounded-full"
                                      style={{ width: `${device.bandwidthLoadPct}%` }}
                                    />
                                  </div>
                                </div>

                                {/* Signal Health */}
                                <div className="hidden sm:flex items-center gap-2">
                                  <SignalBars qualityPct={device.signalQualityPct} />
                                  <span className="text-xs font-bold text-emerald-400">{device.signalQualityPct}%</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right: Actions & Dropdown Toggle Chevron */}
                          <div className="flex items-center justify-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setQrModalKey(device);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-mono font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                              title="Scan QR Code"
                            >
                              <QrCode className="h-3.5 w-3.5" />
                              <span>QR</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Downloading VERZ Link configuration profile for ${device.name}...`);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-200 font-mono font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                              title="Download .conf file"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>.conf</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDeviceKey(device.id);
                              }}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Revoke Device Key"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            {/* Dropdown Chevron Indicator */}
                            <div className={`p-1.5 rounded-lg transition-all ${isExpanded ? "bg-white text-black" : "text-zinc-300 bg-white/10"}`}>
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 stroke-[3]" />
                              ) : (
                                <ChevronDown className="h-4 w-4 stroke-[3]" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ============================================================= */}
                        {/* EXPANDED DETAILS (ALL BONDED PORTS & DIAGNOSTICS)             */}
                        {/* ============================================================= */}
                        {isExpanded && (
                          <div className="p-5 sm:p-6 bg-black/70 border-t-2 border-white/10 space-y-5 animate-in fade-in duration-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                              <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-cyan-400" />
                                <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                                  Bonded Ports Breakdown for {device.name}
                                </span>
                                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                                  ({device.bondedPortsCount} Active WAN Links)
                                </span>
                              </div>
                              <span className="text-xs font-mono text-zinc-400">
                                Total Transferred: <strong className="text-white">{device.totalDataTransferredGb.toFixed(2)} GB</strong> • Jitter: 1.1ms
                              </span>
                            </div>

                            {/* Ports Grid (Shows all 1, 2, 3, or 4 bonded ports) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                              {device.interfaces.map((intf) => (
                                <div
                                  key={intf.id}
                                  className="p-4 rounded-xl bg-surface-100 border-2 border-white/15 space-y-3 font-mono shadow-sm hover:border-cyan-500/40 transition-colors"
                                >
                                  {/* Port Name & Status */}
                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 truncate">
                                      {intf.type === "cellular" && <Radio className="h-3.5 w-3.5 text-pink-400 shrink-0" />}
                                      {intf.type === "wifi" && <Wifi className="h-3.5 w-3.5 text-cyan-400 shrink-0" />}
                                      {intf.type === "ethernet" && <Network className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                                      {intf.type === "satellite" && <Globe className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                                      <span className="font-black text-white truncate">{intf.name}</span>
                                    </div>
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse shrink-0" />
                                  </div>

                                  {/* Speed & RTT */}
                                  <div className="flex items-baseline justify-between pt-0.5">
                                    <span className="text-xl font-black text-cyan-300">
                                      {intf.speedMbps.toFixed(1)} <span className="text-xs font-normal text-zinc-400">Mbps</span>
                                    </span>
                                    <span className="text-xs text-zinc-300 font-bold">
                                      {intf.latencyMs}ms RTT
                                    </span>
                                  </div>

                                  {/* Signal & Loss */}
                                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1.5 border-t border-white/10">
                                    <span>Signal: <strong className="text-white">{intf.signalStrengthPct}%</strong></span>
                                    <span className="text-emerald-400 font-bold">Loss: 0.0%</span>
                                  </div>

                                  {/* IP Addressing & Carrier / ISP Details */}
                                  <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] bg-black/40 -mx-1 px-2.5 py-2 rounded-lg border border-white/5">
                                    {/* Carrier / Provider */}
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider shrink-0">
                                        {intf.type === "cellular" ? "Carrier" : "Provider"}
                                      </span>
                                      <span className="font-bold text-amber-300 truncate text-right text-[11px]" title={intf.ispOrCarrier}>
                                        {intf.ispOrCarrier}
                                      </span>
                                    </div>

                                    {/* Cellular: Carrier IP. Wi-Fi/Ethernet/Satellite: ISP Public IP */}
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider shrink-0">
                                        {intf.type === "cellular" ? "Carrier IP" : "ISP IP"}
                                      </span>
                                      <span className="font-mono font-bold text-white tracking-wide text-[11px]">
                                        {intf.publicIp}
                                      </span>
                                    </div>

                                    {/* Local Router LAN IP (Wi-Fi, Ethernet, Satellite) */}
                                    {intf.localIp && (
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider shrink-0">Local IP</span>
                                        <span className="font-mono font-bold text-cyan-300 tracking-wide text-[11px]">
                                          {intf.localIp}
                                        </span>
                                      </div>
                                    )}

                                    {/* Router Gateway IP */}
                                    {intf.gatewayIp && (
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider shrink-0">Gateway</span>
                                        <span className="font-mono text-zinc-300 font-semibold text-[11px]">
                                          {intf.gatewayIp}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Live Flow Graphic & Pairing Token Footer */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10 font-mono text-xs">
                              <div className="flex items-center gap-3 w-full md:w-auto">
                                <span className="text-zinc-400 shrink-0">Live Flow Waveform:</span>
                                <DeviceSparkline points={device.sparkline} />
                              </div>

                              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                <span className="text-zinc-400">Pairing Token:</span>
                                <code className="px-2 py-1 rounded bg-black/60 border border-white/15 text-zinc-300 text-[11px] font-mono">
                                  {device.pairingToken}
                                </code>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(device.pairingToken, device.id)}
                                  className="p-1 rounded text-cyan-400 hover:text-white transition-colors"
                                  title="Copy Token"
                                >
                                  {copiedKeyId === device.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: ADD DEVICE KEY WITH BONDED PORTS CONFIGURATION                     */}
        {/* ========================================================================= */}
        {isAddDeviceOpen && activeNode && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface-100 border-2 border-white/20 rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white">Generate Device Connection Key</h3>
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
                    placeholder="e.g. Sony FX6 Camera Rig or LiveU Solo"
                    className="w-full px-4 py-3.5 rounded-xl bg-black border-2 border-white/30 text-white font-bold text-sm focus:outline-none focus:border-white shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                    Device Platform / Type
                  </label>
                  <select
                    value={newDeviceType}
                    onChange={(e) => setNewDeviceType(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-black border-2 border-white/30 text-white font-mono text-sm focus:outline-none focus:border-white"
                  >
                    <option value="ios">Apple iOS (iPhone / iPad) - QR Code</option>
                    <option value="android">Android Phone / Tablet - QR Code</option>
                    <option value="macos">Apple macOS (MacBook / Studio)</option>
                    <option value="windows">Windows PC (vMix / OBS)</option>
                    <option value="router">Hardware Router (GL.iNet / OpenWrt / Custom PCB)</option>
                  </select>
                </div>

                {/* Bonded Ports Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                    Number of Bonded Ports / WANs in Device
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((ports) => (
                      <button
                        key={ports}
                        type="button"
                        onClick={() => setNewDeviceBondedPorts(ports)}
                        className={`py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                          newDeviceBondedPorts === ports
                            ? "bg-white text-black border-white shadow-md"
                            : "bg-black text-zinc-300 border-white/20 hover:border-white/40"
                        }`}
                      >
                        {ports} {ports === 1 ? "Port" : "Ports"}
                      </button>
                    ))}
                  </div>
                  <span className="block text-[11px] text-zinc-400 mt-1 font-mono">
                    {newDeviceBondedPorts === 1 && "Single connection (Standard tunnel)"}
                    {newDeviceBondedPorts === 2 && "Dual-WAN bonding (Cellular 5G + Wi-Fi 6)"}
                    {newDeviceBondedPorts === 3 && "Triple-WAN bonding (2x Cellular + Starlink)"}
                    {newDeviceBondedPorts === 4 && "Quad-WAN bonding (Multi-modem field backpack)"}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono">
                  Assigned Tunnel IP: <strong className="text-white">10.8.0.{activeNode.devices.length + 2}</strong>
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
                <svg
                  className="w-48 h-48 mx-auto"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="black" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="black" />

                  <rect x="65" y="10" width="25" height="25" fill="black" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="black" />

                  <rect x="10" y="65" width="25" height="25" fill="black" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="black" />

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

        {/* ========================================================================= */}
        {/* MODAL: DELETE SERVER SAFETY CONFIRMATION                                  */}
        {/* ========================================================================= */}
        {nodeToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-surface-100 border-2 border-red-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.25)] animate-in fade-in zoom-in-95 duration-150">
              
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 shrink-0">
                  <AlertCircle className="h-7 w-7 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Delete "{nodeToDelete.name}"?
                  </h3>
                  <p className="text-xs font-mono text-red-300/90 mt-1">
                    Node ID: {nodeToDelete.id} • Dedicated IP: {nodeToDelete.ipAddress}
                  </p>
                </div>
              </div>

              {/* Safety Warning Box (Dynamic based on user's actual generated keys) */}
              <div className="p-5 rounded-xl bg-red-950/40 border-2 border-red-500/30 space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-red-300">
                  <span>Connection Loss Warning:</span>
                </div>

                {nodeToDelete.devices.length === 0 ? (
                  <p className="text-xs text-zinc-300 font-mono">
                    No device keys are currently configured for this relay.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-200">
                      The following <strong className="text-white">{nodeToDelete.devices.length} {nodeToDelete.devices.length === 1 ? "device" : "devices"}</strong> will immediately lose bonding and drop offline:
                    </p>
                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                      {nodeToDelete.devices.map((dev) => (
                        <div
                          key={dev.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {getDeviceIcon(dev.deviceType)}
                            <span className="font-bold text-white truncate">{dev.name}</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                              {dev.deviceType}
                            </span>
                          </div>
                          <span className="text-cyan-300 shrink-0 font-bold ml-2">{dev.assignedIp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="text-xs text-zinc-300 space-y-2 list-disc pl-5 font-sans pt-2 border-t border-red-500/20">
                  <li>
                    <strong className="text-white">Dedicated IP Released:</strong> Public IP <code className="font-mono text-cyan-300 font-bold bg-black/40 px-1 py-0.5 rounded">{nodeToDelete.ipAddress}</code> will be removed from the cloud backbone.
                  </li>
                  <li>
                    <strong className="text-emerald-400 font-bold">Billing Stops:</strong> You will no longer be charged hourly for this server.
                  </li>
                </ul>
              </div>

              {/* Confirmation Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setNodeToDelete(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Cancel (Keep Server Safe)
                </button>
                <button
                  onClick={confirmDeleteNode}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Yes, Disconnect & Delete Server</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
