export type Platform = 'amazon' | 'flipkart' | 'shopify' | 'instagram';

export type Sentiment = 'positive' | 'neutral' | 'negative';

export type Emotion = 'happy' | 'frustrated' | 'angry' | 'neutral';

export type Severity = 'high' | 'medium' | 'low';

export type RootCause = 'delivery' | 'defect' | 'pricing' | 'packaging' | 'service' | 'other';

export interface Review {
  id: string;
  platform: Platform;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  text: string;
  sentiment: Sentiment;
  emotion: Emotion;
  rootCauses: RootCause[];
  keywords: string[];
  replied: boolean;
  escalated: boolean;
  createdAt: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  productId: string;
  productName: string;
  rootCause: RootCause;
  count: number;
  delta: number;
  createdAt: string;
  resolved: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  platforms: Platform[];
  avgRating: number;
  ratingDelta: number;
  reviewCount: number;
  negativePercent: number;
  topIssue: RootCause | null;
  trend: 'up' | 'down' | 'stable';
}

export interface SentimentDataPoint {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface CategoryDataPoint {
  category: RootCause;
  count: number;
  percent: number;
}

export interface DashboardStats {
  avgRating: number;
  ratingDelta: number;
  negativePercent: number;
  negativeDelta: number;
  activeAlerts: number;
  impactedProducts: number;
  totalReviews: number;
  weeklyChange: string;
}

export interface ReplyDraft {
  reviewId: string;
  draft: string;
  tone: 'apology' | 'friendly' | 'professional';
}

export interface FilterState {
  platform: Platform | 'all';
  sentiment: Sentiment | 'all';
  productId: string | 'all';
  rootCause: RootCause | 'all';
  search: string;
}