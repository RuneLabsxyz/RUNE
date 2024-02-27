import express from 'express';
import { join, dirname } from 'path'; // Import dirname
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const app = express();
const port = 8000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'build' directory
app.use(express.static(join(__dirname, '../build'))); // Adjust the path as needed

// Catch-all handler for all other GET requests to serve index.html
app.get('*', async (req, res) => {
  try {
    const indexPath = join(__dirname, '../build', 'index.html'); // Adjust the path as needed
    const content = await fs.readFile(indexPath, 'utf-8');
    res.send(content);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
