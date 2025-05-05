// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Add some basic styles
const styles = `
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 20px;
  }
  
  .ListItemEven { 
    background-color: #f8f8f8; 
  }
  
  .ListItemOdd { 
    background-color: #ffffff; 
  }
  
  .SelectedItem {
    background-color: #e6f7ff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #91d5ff;
  }
`;

// Add styles to document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));