const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // You can choose any port

app.use(express.static(path.join(__dirname, 'build'))); // Serve files from the build directory

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // Fallback to index.html for SPA routing
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
