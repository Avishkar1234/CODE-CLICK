import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log('Piston raw response:', text);

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Execute error:', error);
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
