import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * A global cache to store fetched results across component instances
 * Using a Map for O(1) lookups by URL key
 */
const cache = new Map();

/**
 * Custom hook that fetches data from a URL and caches the results
 * 
 * @param {string} url - The URL to fetch data from
 * @returns {object} An object containing the data, loading state, error state, and a refetch function
 */
function useFetchWithCache(url) {
  // State for managing the fetch operation
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoized value to check if URL exists in cache
  // This prevents unnecessary re-renders when the URL prop doesn't change
  const cachedData = useMemo(() => {
    return cache.has(url) ? cache.get(url) : null;
  }, [url]);

  // Memoized fetch function using useCallback to maintain reference stability
  // This prevents the function from being recreated on every render
  const fetchData = useCallback(async () => {
    // If data already exists in cache, use it immediately
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      
      // Handle non-200 responses
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Store the result in the cache
      cache.set(url, result);
      
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      // Don't cache failed requests
    } finally {
      setLoading(false);
    }
  }, [url, cachedData]);

  // Force refresh function - bypasses cache and fetches fresh data
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Update the cache with fresh data
      cache.set(url, result);
      
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Effect to fetch data when the URL changes or when component mounts
  useEffect(() => {
    if (!url) return;
    
    // If data is already cached, set it immediately without a state transition
    if (cachedData) {
      setData(cachedData);
    } else {
      // Otherwise fetch from the API
      fetchData();
    }
  }, [url, fetchData, cachedData]);

  // Return the data, loading state, error state, and refetch function
  return {
    data,
    loading,
    error,
    refetch
  };
}

export default useFetchWithCache;