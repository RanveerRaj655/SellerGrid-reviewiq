import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Review, FilterState } from '@/types';

export function useReviews(filters?: Partial<FilterState>) {
  const params = new URLSearchParams();
  if (filters?.platform && filters.platform !== 'all') params.set('platform', filters.platform);
  if (filters?.sentiment && filters.sentiment !== 'all') params.set('sentiment', filters.sentiment);
  if (filters?.productId && filters.productId !== 'all') params.set('productId', filters.productId);
  if (filters?.rootCause && filters.rootCause !== 'all') params.set('rootCause', filters.rootCause);
  if (filters?.search) params.set('search', filters.search);

  const query = params.toString();
  const url = `/api/reviews${query ? `?${query}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<Review[]>(url, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
  });

  return {
    reviews: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
}