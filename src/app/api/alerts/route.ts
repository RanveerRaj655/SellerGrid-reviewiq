import { NextResponse } from 'next/server';
import { mockAlerts } from '@/data/mock';

export async function GET() {
  const active = mockAlerts.filter(a => !a.resolved);
  return NextResponse.json(active);
}