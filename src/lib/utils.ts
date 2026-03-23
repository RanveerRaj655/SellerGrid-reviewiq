import { clsx, type ClassValue } from 'clsx';
import { Sentiment, Severity, Platform, RootCause } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function getSentimentColor(sentiment: Sentiment): string {
  return {
    positive: 'text-green-700 bg-green-50 border-green-200',
    neutral: 'text-gray-600 bg-gray-50 border-gray-200',
    negative: 'text-red-700 bg-red-50 border-red-200',
  }[sentiment];
}

export function getSeverityColor(severity: Severity): string {
  return {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    low: 'text-green-700 bg-green-50 border-green-200',
  }[severity];
}

export function getPlatformLabel(platform: Platform): string {
  return {
    amazon: 'Amazon',
    flipkart: 'Flipkart',
    shopify: 'Shopify',
    instagram: 'Instagram',
  }[platform];
}

export function getRootCauseLabel(cause: RootCause): string {
  return {
    delivery: 'Delivery',
    defect: 'Product Defect',
    pricing: 'Pricing',
    packaging: 'Packaging',
    service: 'Customer Service',
    other: 'Other',
  }[cause];
}

export function getRootCauseColor(cause: RootCause): string {
  return {
    delivery: 'text-red-700 bg-red-50',
    defect: 'text-orange-700 bg-orange-50',
    pricing: 'text-blue-700 bg-blue-50',
    packaging: 'text-amber-700 bg-amber-50',
    service: 'text-purple-700 bg-purple-50',
    other: 'text-gray-600 bg-gray-50',
  }[cause];
}

export function getSeverityDot(severity: Severity): string {
  return {
    high: 'bg-red-500',
    medium: 'bg-amber-400',
    low: 'bg-green-500',
  }[severity];
}