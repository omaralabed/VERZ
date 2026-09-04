export type AppId = "verz_link" | "verz_stream" | "verz_voice" | "verz_studio";

export interface VerzApp {
  id: AppId;
  name: string;
  tagline: string;
  category: "Networking" | "Media & Video" | "Voice & Telecom" | "Production";
  status: "live" | "beta" | "coming_soon";
  subdomain: string;
  description: string;
  iconName: string;
  accentColor: string;
}

export type ServerCategory = "dedicated" | "shared";

export interface ServerPlan {
  id: string;
  name: string;
  category: ServerCategory;
  monthlyPrice: number; // Base + $10 margin
  hourlyPrice: number;
  ram: string;
  cpus: number;
  storage: string;
  transfer: string;
  networkSpeed: string;
  maxDevices: number;
}

export interface BondedInterface {
  id: string;
  name: string; // e.g. "SIM 1 (5G Sub-6)", "SIM 2 (LTE-A)", "Wi-Fi 6", "Starlink"
  type: "cellular" | "wifi" | "ethernet" | "satellite";
  speedMbps: number;
  signalStrengthPct: number; // 0 - 100%
  latencyMs: number;
  packetLossPct: number;
  status: "active" | "standby";
  publicIp: string; // e.g. "172.56.21.84" (Cellular) or "73.189.44.12" (ISP IP)
  localIp?: string; // e.g. "192.168.1.145" (for Wi-Fi / Ethernet / Starlink LAN)
  gatewayIp?: string; // e.g. "192.168.1.1" (Local router gateway)
  ispOrCarrier: string; // e.g. "T-Mobile 5G", "AT&T", "Comcast Business", "SpaceX Starlink"
}

export interface DeviceKey {
  id: string;
  nodeId: string;
  name: string;
  deviceType: "ios" | "android" | "macos" | "windows" | "router";
  assignedIp: string;
  pairingToken: string;
  status: "connected" | "idle";
  uploadSpeedMbps: number;
  downloadSpeedMbps: number;
  totalDataTransferredGb: number;
  bandwidthLoadPct: number; // e.g. 74%
  signalQualityPct: number; // overall signal health
  packetLossPct: number;
  latencyMs: number;
  bondedPortsCount: number; // how many ports/WANs bonded in this device
  interfaces: BondedInterface[];
  sparkline: number[]; // real-time signal/speed waveform graphic
  lastHandshake: string;
  createdAt: string;
}

export interface BondingNode {
  id: string;
  name: string;
  region: string;
  planId: string;
  planName: string;
  category: ServerCategory;
  ipAddress: string;
  port: number;
  status: "booting" | "running" | "terminating" | "stopped";
  createdAt: string;
  uptimeSeconds: number;
  hourlyPrice: number;
  monthlyPrice: number;
  maxDevices: number;
  devices: DeviceKey[];
  inboundMbps: number;
  outboundMbps: number;
  packetLossPct: number;
}

export interface UserWallet {
  balance: number;
  currency: string;
  autoRechargeEnabled: boolean;
  rechargeThreshold: number;
  rechargeAmount: number;
}
