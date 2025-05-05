import React, { lazy, Suspense, useState } from 'react';
import Loading from '../components/Loading';

// Lazy load the heavy component - it will only be loaded when the button is clicked
const HeavyFeature = lazy(() => import('../components/HeavyFeature'));

const Home: React.FC = () => {
  const [showHeavyFeature, setShowHeavyFeature] = useState(false);

  return (
    <div className="page home-page">
      <h1>Home Page</h1>
      <p>This is the home page of our optimized React application.</p>
      <p>This component will be loaded on initial page load.</p>
      
      <div className="feature-section">
        <h2>Code Splitting Demo</h2>
        <p>Click the button below to load a heavy component dynamically:</p>
        <button onClick={() => setShowHeavyFeature(true)}>
          {showHeavyFeature ? 'Component Loaded' : 'Load Heavy Component'}
        </button>
        
        {showHeavyFeature && (
          <Suspense fallback={<Loading />}>
            <div className="heavy-feature-container">
              <HeavyFeature />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Home;