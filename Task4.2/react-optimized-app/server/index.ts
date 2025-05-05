import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../src/App';
import compression from 'compression';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression and CORS
app.use(compression());
app.use(cors());

// Serve static files
app.use(express.static(path.resolve(__dirname, '../build')));

// Handle all GET requests
app.get('*', (req, res) => {
  const context = {};
  
  // Render the App component to string
  const appHtml = renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      React.createElement(App)
    )
  );
  
  // Read the HTML file from build
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    
    // Inject the rendered app into the HTML and send it
    const html = data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    
    // Add state data that will be used for hydration
    const finalHtml = html.replace(
      '</body>',
      `<script>window.__INITIAL_DATA__ = ${JSON.stringify({})}</script></body>`
    );
    
    return res.send(finalHtml);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});