import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import axios from 'axios';
import { handler } from './build/handler.js'; // Adjust the path as necessary


const app = express();
const port = 3000;


// To simulate __dirname in ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOWNLOAD_DIR = path.join(__dirname, 'runedownloads');
const LOG_FILE_PATH = path.join(DOWNLOAD_DIR, 'downloadedGamesLog.json');

// Ensure the download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Ensure the log file exists
if (!fs.existsSync(LOG_FILE_PATH)) {
  fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([]), { encoding: 'utf8' });
}


// Serve static files from the 'static' directory (if you have any)
app.use(express.static(path.join(__dirname, 'build', 'static')));

app.get('/download-game', async (req, res) => {
  const gameUrl = req.query.url;

  if (!gameUrl) {
    return res.status(400).send('Invalid URL');
  }

  const timestamp = Date.now();
  const fileName = `game_${timestamp}.zip`;

  try {
    const response = await axios({
      method: 'GET',
      url: gameUrl,
      responseType: 'stream'
    });

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/zip');

    response.data.pipe(res);

    // Log the download
    logDownload(gameUrl, fileName);
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

