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

export type ServerSizeId = "starter" | "pro" | "broadcast_max";

export interface ServerTier {
  id: ServerSizeId;
  name: string;
  vCPU: number;
  ramGB: number;
  maxThroughputMbps: number;
  hourlyRate: number;
  description: string;
  recommendedFor: string;
}

export interface BondingNode {
  id: string;
  name: string;
  region: string;
  size: ServerSizeId;
  ipAddress: string;
  port: number;
  status: "booting" | "running" | "terminating" | "stopped";
  createdAt: string;
  uptimeMinutes: number;
  totalDataGb: number;
  currentBitrateMbps: number;
}

export interface UserWallet {
  balance: number;
  currency: string;
  autoRechargeEnabled: boolean;
  rechargeThreshold: number;
  rechargeAmount: number;
}
