import { NextResponse } from "next/server";
import { REGISTERED_APPS } from "@/lib/anchor-registry";

export async function GET() {
  try {
    // Strip secret keys before returning directory
    const publicDirectory = Object.values(REGISTERED_APPS).map(({ secretKey, ...publicApp }) => publicApp);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      total_apps: publicDirectory.length,
      apps: publicDirectory,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch app directory" }, { status: 500 });
  }
}
