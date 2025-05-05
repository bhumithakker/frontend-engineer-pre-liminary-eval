// App.js
import React, { useState } from 'react';
import VirtualizedList from './VirtualizedList';
import NonVirtualizedList from './NonVirtualizedList';

const App = () => {
  const [showVirtualized, setShowVirtualized] = useState(true);
  
  const toggleView = () => {
    setShowVirtualized(!showVirtualized);
  };

  return (
    <div className="App">
      <div style={{ padding: '10px' }}>
        <button onClick={toggleView} style={{ padding: '8px 16px', marginBottom: '20px' }}>
          Switch to {showVirtualized ? 'Non-Virtualized' : 'Virtualized'} List
        </button>
        
        <div style={{ border: '1px solid #eee', padding: '10px' }}>
          <p><strong>Current View:</strong> {showVirtualized ? 'Virtualized' : 'Non-Virtualized'} List</p>
          <p>
            <strong>Performance instructions:</strong> Open your browser console to view React Profiler 
            measurements. Compare the render times between virtualized and non-virtualized lists.
          </p>
        </div>
      </div>

      {showVirtualized ? <VirtualizedList /> : <NonVirtualizedList />}
    </div>
  );
};

export default App;