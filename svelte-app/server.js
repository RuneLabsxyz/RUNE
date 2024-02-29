import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handler } from './build/handler.js'; // Adjust the path as necessary
import axios from 'axios';

const app = express();
const port = 3000;

// To simulate __dirname in ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'static' directory (if you have any)
app.use(express.static(path.join(__dirname, 'build', 'static')));

app.get('/download-game', async (req, res) => {
  // Extract the game URL from the query parameter
  const gameUrl = req.query.url;

  // Basic validation of the URL (Implement more robust validation based on your requirements)
  if (!gameUrl) {
    return res.status(400).send('Invalid URL');
  }

  try {
    const response = await axios({
      method: 'GET',
      url: gameUrl,
      responseType: 'stream'
    });

    // Set headers to indicate a file download
    res.setHeader('Content-Disposition', 'attachment; filename="game.zip"');
    res.setHeader('Content-Type', 'application/zip');

    // Pipe the download stream directly to the client
    response.data.pipe(res);
  } catch (error) {
    console.error('Error downloading the game:', error);
    res.status(500).send('Failed to download the game');
  }
});

// Use the SvelteKit handler to handle all other requests
app.all('*', (req, res) => {
  handler(req, res);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

