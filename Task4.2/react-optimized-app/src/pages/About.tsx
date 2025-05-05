import React from 'react';

// Simulating a component that takes time to load
const About: React.FC = () => {
  return (
    <div className="page about-page">
      <h1>About Page</h1>
      <p>This is the about page of our optimized React application.</p>
      <p>This component will be lazy-loaded only when the user navigates to it.</p>
    </div>
  );
};

export default About;