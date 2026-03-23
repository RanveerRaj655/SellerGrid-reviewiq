import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Alert } from '@/types';

export function useAlerts() {
  const { data, error, isLoading, mutate } = useSWR<Alert[]>(
    '/api/alerts',
    fetcher,
    { refreshInterval: 15000 }
  );

  return {
    alerts: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
}