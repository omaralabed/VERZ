import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized. Missing API key." }, { status: 401 });
    }

    const body = await request.json();
    const { region = "us-ord", size = "pro", auto_destroy_minutes = 180 } = body;

    // Simulated VERZ Cloud Node Response
    const mockNode = {
      id: "vz_node_" + Math.random().toString(36).substring(7),
      region,
      size,
      public_ip: "198.51.100." + Math.floor(Math.random() * 200 + 10),
      bonding_port: 5000,
      protocol: "verz_multipath_udp",
      status: "running",
      auto_destroy_at: new Date(Date.now() + auto_destroy_minutes * 60000).toISOString(),
      token: "vz_live_" + Math.random().toString(36).substring(2, 18),
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Node provisioned successfully on VERZ Cloud Backbone",
      node: mockNode,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to provision node" }, { status: 500 });
  }
}
