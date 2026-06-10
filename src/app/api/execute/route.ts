import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const PISTON_URL = process.env.PISTON_URL || "http://localhost:2000";

    const response = await fetch(`${PISTON_URL}/api/v2/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Piston error:", errText);

      throw new Error("PISTON_FAILED");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Execute error:", error);

    return NextResponse.json(
      {
        error: true,
        type: "EXECUTION_FAILED",
        message: "Execution failed. Check backend logs.",
      },
      { status: 500 },
    );
  }
}
