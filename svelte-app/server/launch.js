const { exec } = require('child_process');
const server = require('./server.js'); // Assuming your server file is named server.js

const openBrowser = () => {
  const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
  exec(`${start} http://localhost:3000`);
};

openBrowser();
