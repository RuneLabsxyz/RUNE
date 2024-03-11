import type { RequestHandler } from '@sveltejs/kit';
import type { Game } from '$lib/types'; // Assuming you store the Game interface in $lib/types
import { exec } from 'child_process';
import fs from 'fs';
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

        downloadWebsite(data.link, downloadsDir);
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