import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_token } = body;

    if (!session_token) {
      return NextResponse.json({ valid: false, error: "Missing session token" }, { status: 400 });
    }

    // Mocked validation for verified session
    return NextResponse.json({
      valid: true,
      user_id: "usr_94827394",
      email: "engineer@broadcast-network.com",
      tier: "pro",
      wallet_balance: 45.5,
      currency: "USD",
      permitted_apps: ["verz_link", "verz_stream"],
    });
  } catch (error) {
    return NextResponse.json({ valid: false, error: "Internal error" }, { status: 500 });
  }
}
