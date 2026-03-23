import { NextRequest, NextResponse } from 'next/server';

const tonePrompts = {
  apology:
    'Write a sincere, short apology response to this customer review in 2-3 sentences. Acknowledge their issue and offer to resolve it.',
  friendly:
    'Write a warm and friendly response to this customer review in 2-3 sentences. Be personable and helpful.',
  professional:
    'Write a professional and courteous response to this customer review in 2-3 sentences. Be clear and solution-focused.',
};

const fallbacks = {
  apology:
    'We sincerely apologize for your experience. This is not the standard we hold ourselves to, and we would like to make it right. Please contact us directly so we can resolve this for you immediately.',
  friendly:
    'Hey! Thanks so much for your feedback — we really appreciate you taking the time. We would love to help sort this out for you. Drop us a message and we will get it fixed!',
  professional:
    'Thank you for bringing this to our attention. We take all customer feedback seriously and would like to address your concern promptly. Please reach out to our support team with your order details.',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reviewText, tone } = body;

    if (!reviewText || !tone) {
      return NextResponse.json(
        { error: 'Missing reviewText or tone' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // No API key — return smart fallback
    if (!apiKey || apiKey === 'your_key_here') {
      console.log('No API key found, using fallback reply');
      return NextResponse.json({
        reply: fallbacks[tone as keyof typeof fallbacks],
        source: 'fallback',
      });
    }

    console.log('Calling Anthropic API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: `${tonePrompts[tone as keyof typeof tonePrompts]}\n\nCustomer review: "${reviewText}"\n\nWrite only the reply, nothing else:`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      // Fall back gracefully instead of crashing
      return NextResponse.json({
        reply: fallbacks[tone as keyof typeof fallbacks],
        source: 'fallback',
        error: errorData,
      });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? fallbacks[tone as keyof typeof fallbacks];

    return NextResponse.json({ reply, source: 'ai' });

  } catch (err) {
    console.error('Reply route error:', err);
    return NextResponse.json(
      { reply: fallbacks['professional'], source: 'fallback' },
      { status: 200 }
    );
  }
}