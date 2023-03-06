import useSWR from 'swr';

interface FetcherResponse<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
  isValidating: boolean;
}

interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
}

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data as T;
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
): FetcherResponse<T> {
  const { data, error, isLoading, isValidating } = useSWR<T>(url, fetcher, {
    ...options,
    refreshInterval: 0, // Stop retrying when the API call returns an error, but it wont if its a logic error.
    errorRetryCount: 0, // In case of error it wont retry even if its a failure produced by the own logic,
    revalidateOnFocus: false, // Avoids to recall the API whenever we switch to another tab or programm and come back to the page.
  });
  return { data, error, isLoading, isValidating };
}
