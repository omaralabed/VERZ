import { AppId } from "./types";

export interface RegisteredApp {
  id: AppId;
  name: string;
  tagline: string;
  subdomain: string;
  secretKey: string;
  status: "live" | "beta" | "coming_soon" | "maintenance";
  lastHeartbeat?: string;
  healthMetrics?: {
    cpuPct?: number;
    activeConnections?: number;
    latencyMs?: number;
  };
}

// In-memory registry of authorized apps and their shared master secrets
// In production, these can be set via environment variables (e.g. ANCHOR_SECRET_VERZ_LINK)
export const REGISTERED_APPS: Record<string, RegisteredApp> = {
  verz_link: {
    id: "verz_link",
    name: "VERZ Link",
    tagline: "Multi-WAN Cloud Bonding Engine",
    subdomain: "link.verz.io",
    secretKey: process.env.ANCHOR_SECRET_VERZ_LINK || "sec_app_link_live_99281a8b",
    status: "live",
  },
  verz_stream: {
    id: "verz_stream",
    name: "VERZ Stream",
    tagline: "Broadcast-Grade Video Ingest & Transcoding",
    subdomain: "stream.verz.io",
    secretKey: process.env.ANCHOR_SECRET_VERZ_STREAM || "sec_app_stream_live_44719c2d",
    status: "beta",
  },
  verz_voice: {
    id: "verz_voice",
    name: "VERZ Voice",
    tagline: "Ultra-Low Latency Audio Intercom",
    subdomain: "voice.verz.io",
    secretKey: process.env.ANCHOR_SECRET_VERZ_VOICE || "sec_app_voice_live_77192a5f",
    status: "coming_soon",
  },
  verz_studio: {
    id: "verz_studio",
    name: "VERZ Studio",
    tagline: "Cloud Vision Mixer & Production Switcher",
    subdomain: "studio.verz.io",
    secretKey: process.env.ANCHOR_SECRET_VERZ_STUDIO || "sec_app_studio_live_33102d8e",
    status: "coming_soon",
  },
};

/**
 * Validates that an incoming API request from an independent app server
 * possesses a valid Bearer token matching the registered app secret.
 */
export function validateAppAuth(request: Request, expectedAppId?: string): { authorized: boolean; app?: RegisteredApp; error?: string } {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authorized: false, error: "Missing or malformed Authorization header. Expected Bearer token." };
  }

  const token = authHeader.replace("Bearer ", "").trim();

  // Find app matching the secret token
  const matchingApp = Object.values(REGISTERED_APPS).find((app) => app.secretKey === token);

  if (!matchingApp) {
    return { authorized: false, error: "Invalid App Secret Key. Unauthorized app server." };
  }

  if (expectedAppId && matchingApp.id !== expectedAppId) {
    return { authorized: false, error: `Secret key belongs to ${matchingApp.id}, not ${expectedAppId}.` };
  }

  return { authorized: true, app: matchingApp };
}
