import { NextResponse } from "next/server";
import { validateAppAuth } from "@/lib/anchor-registry";

export async function POST(request: Request) {
  try {
    // 1. Verify that the calling app server has an authorized secret
    const auth = validateAppAuth(request);
    if (!auth.authorized || !auth.app) {
      return NextResponse.json({ success: false, error: auth.error || "Unauthorized app server" }, { status: 401 });
    }

    // 2. Parse the session token forwarded by the app
    const body = await request.json();
    const { session_token } = body;

    if (!session_token) {
      return NextResponse.json({ success: false, error: "Missing session_token parameter" }, { status: 400 });
    }

    // 3. In production, query Redis / PostgreSQL for active session.
    // For now, return verified user identity with permissions for this app.
    const mockUser = {
      user_id: "usr_verz_lead_engineer",
      email: "engineer@verz-broadcast.com",
      tier: "enterprise_pro",
      wallet_balance_usd: 124.80,
      currency: "USD",
      permitted_apps: ["verz_link", "verz_stream", "verz_voice", "verz_studio"],
      session_expires_at: new Date(Date.now() + 86400000).toISOString(),
    };

    const hasPermission = mockUser.permitted_apps.includes(auth.app.id);

    if (!hasPermission) {
      return NextResponse.json(
        {
          success: false,
          error: `User does not have an active subscription for app: ${auth.app.name}`,
          user_id: mockUser.user_id,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      verified_by: "VERZ Anchor Core",
      calling_app: auth.app.id,
      user: mockUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Anchor server error" }, { status: 500 });
  }
}
