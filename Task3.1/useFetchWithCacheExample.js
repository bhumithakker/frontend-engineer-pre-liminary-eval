import React, { useState } from 'react';
import useFetchWithCache from './useFetchWithCache';

/**
 * Example component that demonstrates the useFetchWithCache hook
 */
function DataFetchingComponent() {
  // Define some sample URLs to fetch from
  const apiUrls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];
  
  // State to keep track of which URL to fetch
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const currentUrl = apiUrls[currentUrlIndex];
  
  // Use our custom hook to fetch and cache data
  const { data, loading, error, refetch } = useFetchWithCache(currentUrl);
  
  // Function to cycle through URLs
  const changeUrl = () => {
    setCurrentUrlIndex((prevIndex) => (prevIndex + 1) % apiUrls.length);
  };
  
  return (
    <div>
      <h2>Data Fetching with Cache Example</h2>
      
      <div>
        <p>Current URL: {currentUrl}</p>
        <button onClick={changeUrl}>Change URL</button>
        <button onClick={refetch}>Force Refetch</button>
      </div>
      
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div>
            <h3>Data from API:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <p>
          <strong>How this works:</strong>
        </p>
        <ul>
          <li>
            Click "Change URL" to cycle through different API endpoints. Notice that when you
            return to a previously fetched URL, the data appears instantly (from cache).
          </li>
          <li>
            Click "Force Refetch" to bypass the cache and get fresh data from the API.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DataFetchingComponent;