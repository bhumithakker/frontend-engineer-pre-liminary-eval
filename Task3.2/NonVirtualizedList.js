// NonVirtualizedList.js
import React, { useState, useCallback, useMemo } from 'react';
import { Profiler } from 'react';

// Item renderer component (not using virtualization)
const ListItem = React.memo(({ item, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(item);
  }, [onClick, item]);

  return (
    <div 
      className={item.id % 2 ? 'ListItemOdd' : 'ListItemEven'} 
      style={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
      }}
      onClick={handleClick}
    >
      <div>Item #{item.id} - {item.name}</div>
    </div>
  );
});

// Function to log profiler results
const onRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};

const NonVirtualizedList = () => {
  // Generate 10,000 items (same as virtualized version)
  const items = useMemo(() => 
    Array(10000)
      .fill()
      .map((_, index) => ({
        id: index,
        name: `Item ${index}`,
      })),
    []
  );

  const [selectedItem, setSelectedItem] = useState(null);

  // Memoize the item click handler
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    console.log(`Selected item: ${item.id}`);
  }, []);

  return (
    <div className="NonVirtualizedList">
      <h1>Non-Virtualized List of 10,000 Items</h1>
      
      {selectedItem && (
        <div className="SelectedItem">
          Selected: Item #{selectedItem.id} - {selectedItem.name}
        </div>
      )}
      
      <div 
        className="ListContainer" 
        style={{ 
          height: '500px',
          width: '600px',
          overflow: 'auto',
          border: '1px solid #ddd'
        }}
      >
        <Profiler id="NonVirtualizedList" onRender={onRenderCallback}>
          <div>
            {items.map(item => (
              <ListItem 
                key={item.id} 
                item={item} 
                onClick={handleItemClick}
              />
            ))}
          </div>
        </Profiler>
      </div>
    </div>
  );
};

export default NonVirtualizedList;