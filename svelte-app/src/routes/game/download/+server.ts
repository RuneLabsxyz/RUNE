import type { RequestHandler } from '@sveltejs/kit';
import type { Game } from '$lib/types'; // Assuming you store the Game interface in $lib/types
import { exec } from 'child_process';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data: Game = await request.json();

        const response = await fetch(data.link);
        const content = await response.text();

        const downloadsDir = path.resolve('runedownloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        await downloadWebsite(data.link, downloadsDir);
        
        await logDownload(data, downloadsDir);

        // Respond with the received data (and possibly other actions taken)
        return new Response(JSON.stringify({ received: data, message: 'Content downloaded successfully.' }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // Handle errors, such as parsing errors or fetch errors
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

function downloadWebsite(url: string, destination: string) {
    return new Promise((resolve, reject) => {
      const command = `wget -mkEpnp -P ${destination} ${url}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  }

  async function logDownload(game: Game, downloadsDir: string) {
    const logFilePath = path.join(downloadsDir, 'downloadedGamesLog.json');

    try {
        // Read the existing log file or start with an empty array if the file does not exist
        let gamesLog = [];
        try {
            const logContent = await fsPromises.readFile(logFilePath, 'utf8');
            gamesLog = JSON.parse(logContent);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error; // Ignore file not found errors
        }

        // Check if the game is already logged
        const existingIndex = gamesLog.findIndex((logEntry) => logEntry.game_id === game.game_id);

        if (existingIndex > -1) {
            // Update existing entry
            gamesLog[existingIndex] = game;
        } else {
            // Add new entry
            gamesLog.push(game);
        }

        // Write the updated log back to the file
        await fsPromises.writeFile(logFilePath, JSON.stringify(gamesLog, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to log download:', error);
        throw error; // Rethrow the error to handle it in the calling context
    }
}