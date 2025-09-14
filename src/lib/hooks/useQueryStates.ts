import { QueryResult } from "@apollo/client";

export interface QueryStatesConfig {
  loadingMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
}

export interface QueryStatesResult<T> {
  data: T | undefined;
  isLoading: boolean;
  hasError: boolean;
  isEmpty: boolean;
  error: Error | undefined;
}

/**
 * Hook to extract common loading, error, and empty state logic from GraphQL queries
 * @param queryResult - Apollo Client query result
 * @param dataExtractor - Function to extract the actual data array from the query result
 * @returns Standardized state object
 */
export function useQueryStates<TData, TResult>(
  queryResult: QueryResult<TData>,
  dataExtractor: (data: TData) => TResult[] | undefined,
): QueryStatesResult<TResult[]> {
  const { data, loading, error } = queryResult;

  const extractedData = data ? dataExtractor(data) : undefined;
  const isEmpty =
    !loading && !error && (!extractedData || extractedData.length === 0);

  return {
    data: extractedData,
    isLoading: loading && !data,
    hasError: !!error,
    isEmpty,
    error: error || undefined,
  };
}
