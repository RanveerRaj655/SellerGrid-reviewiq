import { NextResponse } from 'next/server';
import { mockStats, mockSentimentData, mockCategoryData } from '@/data/mock';

export async function GET() {
  return NextResponse.json({
    stats: mockStats,
    sentiment: mockSentimentData,
    categories: mockCategoryData,
  });
}