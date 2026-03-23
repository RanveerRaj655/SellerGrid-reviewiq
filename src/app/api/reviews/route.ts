import { NextRequest, NextResponse } from 'next/server';
import { mockReviews } from '@/data/mock';
import { Platform, Sentiment, RootCause } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get('platform') as Platform | null;
  const sentiment = searchParams.get('sentiment') as Sentiment | null;
  const productId = searchParams.get('productId');
  const rootCause = searchParams.get('rootCause') as RootCause | null;
  const search = searchParams.get('search');

  let results = [...mockReviews];

  if (platform) results = results.filter(r => r.platform === platform);
  if (sentiment) results = results.filter(r => r.sentiment === sentiment);
  if (productId) results = results.filter(r => r.productId === productId);
  if (rootCause) results = results.filter(r => r.rootCauses.includes(rootCause));
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(r =>
      r.text.toLowerCase().includes(q) ||
      r.author.toLowerCase().includes(q) ||
      r.productName.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(results);
}