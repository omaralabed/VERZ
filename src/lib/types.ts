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

export interface DeviceKey {
  id: string;
  nodeId: string;
  name: string;
  deviceType: "ios" | "android" | "macos" | "windows" | "router";
  assignedIp: string;
  pairingToken: string;
  status: "connected" | "idle";
  currentSpeedMbps: number;
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
