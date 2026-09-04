import { NextResponse } from "next/server";
import { validateAppAuth, REGISTERED_APPS } from "@/lib/anchor-registry";

export async function POST(request: Request) {
  try {
    const auth = validateAppAuth(request);
    if (!auth.authorized || !auth.app) {
      return NextResponse.json({ success: false, error: auth.error || "Unauthorized app server" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { status = "live", cpu_pct, active_connections, latency_ms } = body;

    // Update in-memory registry record for this app
    const appRecord = REGISTERED_APPS[auth.app.id];
    if (appRecord) {
      appRecord.status = status;
      appRecord.lastHeartbeat = new Date().toISOString();
      appRecord.healthMetrics = {
        cpuPct: typeof cpu_pct === "number" ? cpu_pct : appRecord.healthMetrics?.cpuPct,
        activeConnections: typeof active_connections === "number" ? active_connections : appRecord.healthMetrics?.activeConnections,
        latencyMs: typeof latency_ms === "number" ? latency_ms : appRecord.healthMetrics?.latencyMs,
      };
    }

    return NextResponse.json({
      success: true,
      app_id: auth.app.id,
      acknowledged_at: new Date().toISOString(),
      heartbeat_interval_sec: 30,
      anchor_status: "online",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Anchor heartbeat error" }, { status: 500 });
  }
}
