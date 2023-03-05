import useSWR from 'swr';

interface FetcherResponse<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
  isValidating: boolean;
}

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data as T;
}

export function useData<T>(url: string): FetcherResponse<T> {
  const { data, error, isLoading, isValidating } = useSWR<T>(url, fetcher);
  return { data, error, isLoading, isValidating };
}
