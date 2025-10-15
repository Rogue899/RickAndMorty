import { useState, useEffect } from 'react';

interface UseApiDataOptions<T> {
  fetchFn: () => Promise<T>;
  dependencies?: any[];
  enabled?: boolean;
}

interface UseApiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook for API data fetching with loading and error states
 */
export function useApiData<T>({
  fetchFn,
  dependencies = [],
  enabled = true
}: UseApiDataOptions<T>): UseApiDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const error = err as Error;
      const errorMessage = error?.message?.toLowerCase().includes('nothing here') 
        ? 'Resource not found' 
        : error?.message || 'Failed to load data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook for paginated data fetching
 */
export function usePaginatedData<T>(
  fetchFn: (page: number) => Promise<{ results: T[]; info: any }>,
  currentPage: number,
  dependencies: any[] = []
) {
  return useApiData({
    fetchFn: () => fetchFn(currentPage),
    dependencies: [currentPage, ...dependencies]
  });
}
