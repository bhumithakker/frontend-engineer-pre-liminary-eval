import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="page dashboard-page">
      <h1>Dashboard Page</h1>
      <p>This is the dashboard page of our optimized React application.</p>
      <p>This component will be lazy-loaded only when needed.</p>
      
      <div className="counter">
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default Dashboard;