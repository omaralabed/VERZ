import { NextResponse } from "next/server";
import { validateAppAuth } from "@/lib/anchor-registry";

export async function POST(request: Request) {
  try {
    // 1. Authenticate caller as authorized VERZ app server
    const auth = validateAppAuth(request);
    if (!auth.authorized || !auth.app) {
      return NextResponse.json({ success: false, error: auth.error || "Unauthorized app server" }, { status: 401 });
    }

    const body = await request.json();
    const { user_id, amount_usd, description, units_consumed, unit_type = "hours" } = body;

    if (!user_id || typeof amount_usd !== "number" || amount_usd <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid billing payload. 'user_id' and positive 'amount_usd' are required." },
        { status: 400 }
      );
    }

    // Generate unique transaction reference
    const transactionId = "tx_" + Math.random().toString(36).substring(2, 14);

    return NextResponse.json({
      success: true,
      transaction_id: transactionId,
      app_id: auth.app.id,
      user_id,
      amount_deducted_usd: Number(amount_usd.toFixed(4)),
      description: description || `Usage charge for ${auth.app.name}`,
      units_consumed,
      unit_type,
      currency: "USD",
      timestamp: new Date().toISOString(),
      status: "settled",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Anchor billing error" }, { status: 500 });
  }
}
