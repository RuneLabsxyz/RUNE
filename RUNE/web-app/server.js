import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 8000; // You can choose any port that's available

// __dirname is not defined in ES module scope, so we need to create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from a specified directory
app.use(express.static(join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
