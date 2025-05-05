import React, { useState } from 'react';

// This simulates a heavy component that would benefit from code splitting
const HeavyFeature: React.FC = () => {
  const [data, setData] = useState<string[]>([
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'
  ]);

  const addItem = () => {
    setData([...data, `Item ${data.length + 1}`]);
  };

  return (
    <div className="heavy-feature">
      <h3>Heavy Feature Component</h3>
      <p>This component is loaded dynamically only when needed.</p>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default HeavyFeature;