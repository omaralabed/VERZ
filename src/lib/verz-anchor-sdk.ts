/**
 * ============================================================================
 * VERZ ANCHOR CLIENT SDK (Plug-and-Play Client for App Servers)
 * ============================================================================
 * Drop this file into any independent app repository (e.g. VERZ Stream, VERZ Voice)
 * to connect it directly to the VERZ Anchor Server in 60 seconds.
 * 
 * Usage in your app:
 * 
 *   const anchor = new VerzAnchorClient({
 *     anchorUrl: process.env.ANCHOR_SERVER_URL || "https://hub.verz.io",
 *     appSecret: process.env.ANCHOR_APP_SECRET,
 *     appId: "verz_stream",
 *   });
 * 
 *   // 1. Verify a user when they open your app
 *   const user = await anchor.verifySession(req.query.token);
 * 
 *   // 2. Charge usage credits
 *   await anchor.deductUsage(user.user_id, 0.05, "1 hour live transcoding");
 * 
 *   // 3. Keep health status green in the Hub
 *   await anchor.sendHeartbeat({ cpuPct: 18, activeConnections: 4 });
 * ============================================================================
 */

export interface AnchorConfig {
  anchorUrl: string; // e.g. "https://hub.verz.io" or "http://localhost:3000"
  appSecret: string; // e.g. "sec_app_stream_live_44719c2d"
  appId: string;     // e.g. "verz_stream"
}

export interface VerifiedUser {
  user_id: string;
  email: string;
  tier: string;
  wallet_balance_usd: number;
  permitted_apps: string[];
}

export class VerzAnchorClient {
  private anchorUrl: string;
  private appSecret: string;
  private appId: string;

  constructor(config: AnchorConfig) {
    this.anchorUrl = config.anchorUrl.replace(/\/$/, "");
    this.appSecret = config.appSecret;
    this.appId = config.appId;
  }

  /**
   * Validates an incoming user session token against the Anchor Server.
   * Enables seamless Single Sign-On (SSO) across all VERZ apps.
   */
  async verifySession(sessionToken: string): Promise<{ success: boolean; user?: VerifiedUser; error?: string }> {
    try {
      const res = await fetch(`${this.anchorUrl}/api/v1/apps/verify-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.appSecret}`,
        },
        body: JSON.stringify({ session_token: sessionToken }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Authentication failed" };
      }

      return { success: true, user: data.user };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error connecting to Anchor Server" };
    }
  }

  /**
   * Reports billable usage (e.g. streaming hours, server minutes) to the Anchor Server.
   */
  async deductUsage(
    userId: string,
    amountUsd: number,
    description: string,
    units?: number,
    unitType?: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const res = await fetch(`${this.anchorUrl}/api/v1/apps/billing/usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.appSecret}`,
        },
        body: JSON.stringify({
          user_id: userId,
          amount_usd: amountUsd,
          description,
          units_consumed: units,
          unit_type: unitType,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Billing deduction failed" };
      }

      return { success: true, transactionId: data.transaction_id };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error connecting to Anchor Server" };
    }
  }

  /**
   * Sends a periodic heartbeat to Anchor Server to show your app is LIVE & healthy.
   */
  async sendHeartbeat(metrics?: { cpuPct?: number; activeConnections?: number; latencyMs?: number }): Promise<boolean> {
    try {
      const res = await fetch(`${this.anchorUrl}/api/v1/apps/heartbeat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.appSecret}`,
        },
        body: JSON.stringify({
          status: "live",
          cpu_pct: metrics?.cpuPct,
          active_connections: metrics?.activeConnections,
          latency_ms: metrics?.latencyMs,
        }),
      });

      return res.ok;
    } catch {
      return false;
    }
  }
}
