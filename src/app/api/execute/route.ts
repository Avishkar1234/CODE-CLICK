import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // If API fails → treat as unavailable
    if (!response.ok) {
      throw new Error('EXECUTION_UNAVAILABLE');
    }

    const text = await response.text();

    if (!text) {
      throw new Error('EMPTY_RESPONSE');
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Execute error:', error);

    // 🔥 Controlled response for frontend
    return NextResponse.json(
      {
        error: true,
        type: 'EXECUTION_UNAVAILABLE',
        message:
          'Code execution is not available in production. Please run locally.',
      },
      { status: 200 } // keep 200 so frontend handles it gracefully
    );
  }
}
