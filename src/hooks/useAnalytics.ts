import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { SentimentDataPoint, CategoryDataPoint, DashboardStats } from '@/types';

interface AnalyticsData {
  stats: DashboardStats;
  sentiment: SentimentDataPoint[];
  categories: CategoryDataPoint[];
}

export function useAnalytics() {
  const { data, error, isLoading } = useSWR<AnalyticsData>(
    '/api/analytics',
    fetcher,
    { refreshInterval: 60000 }
  );

  return {
    stats: data?.stats,
    sentimentData: data?.sentiment ?? [],
    categoryData: data?.categories ?? [],
    isLoading,
    isError: !!error,
  };
}