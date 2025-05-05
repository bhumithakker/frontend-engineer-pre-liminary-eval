// VirtualizedList.js
import React, { useState, useCallback, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Profiler } from 'react';

// Item renderer component wrapped in React.memo to prevent unnecessary re-renders
const Row = React.memo(({ index, style, data }) => {
  const item = data.items[index];
  
  const handleClick = useCallback(() => {
    data.onItemClick(item);
  }, [data, item]);

  return (
    <div 
      className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} 
      style={{
        ...style,
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

const VirtualizedList = () => {
  // Generate 10,000 items
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

  // Memoize the item click handler with useCallback
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    console.log(`Selected item: ${item.id}`);
  }, []);

  const itemData = useMemo(() => ({
    items,
    onItemClick: handleItemClick,
  }), [items, handleItemClick]);

  return (
    <div className="VirtualizedList">
      <h1>Virtualized List of 10,000 Items</h1>
      
      {selectedItem && (
        <div className="SelectedItem">
          Selected: Item #{selectedItem.id} - {selectedItem.name}
        </div>
      )}
      
      <div className="ListContainer">
        <Profiler id="VirtualizedList" onRender={onRenderCallback}>
          <List
            height={500}
            width={600}
            itemCount={items.length}
            itemSize={50}
            itemData={itemData}
          >
            {Row}
          </List>
        </Profiler>
      </div>
    </div>
  );
};

export default VirtualizedList;