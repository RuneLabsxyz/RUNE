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

        await downloadWebsite(data.zip_file, downloadsDir, data.name);
        
        await logDownload(data, downloadsDir);

        // Respond with the received data (and possibly other actions taken)
        return new Response(JSON.stringify({ received: data, message: 'Content downloaded successfully.' }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

function downloadWebsite(zipPath: string, destination: string, gameName: string) {
    return new Promise((resolve, reject) => {
        // Ensure the destination directory exists or is created
        const ensureDirectoryCommand = `mkdir -p "${destination}"`;
    
        exec(ensureDirectoryCommand, (dirError) => {
          if (dirError) {
            reject(`Failed to ensure destination directory exists: ${dirError}`);
            return;
          }
    
          // Proceed with downloading the ZIP file
          const zipFilePath = path.join(destination, `${gameName}.zip`);
          const downloadCommand = `wget -O "${zipFilePath}" "${zipPath}"`;
    
          exec(downloadCommand, (downloadError) => {
            if (downloadError) {
              reject(`Download failed: ${downloadError}`);
              return;
            }
    
            // Unzip the file
            const unzipCommand = `unzip -o "${zipFilePath}" -d "${destination}"`;
    
            exec(unzipCommand, (unzipError) => {
              if (unzipError) {
                reject(`Unzip failed: ${unzipError}`);
                return;
              }
    
              // Remove the ZIP file after extraction
              exec(`rm "${zipFilePath}"`, (removeError) => {
                if (removeError) {
                  console.log(`Failed to remove ZIP file: ${removeError}`);
                  // Not critical, so we don't reject the promise here
                }
    
                // Rename the extracted directory to gameName
                fs.readdir(destination, (err, files) => {
                  if (err) {
                    reject(`Error reading the destination directory: ${err}`);
                    return;
                  }
                  
                  // Assuming the ZIP extracts into a single root directory
                  const extractedDir = files.find(file => fs.statSync(path.join(destination, file)).isDirectory());
                  if (!extractedDir) {
                    reject('No directory found after extraction');
                    return;
                  }
    
                  const oldPath = path.join(destination, extractedDir);
                  const newPath = path.join(destination, gameName);
    
                  if (oldPath !== newPath) {
                    fs.rename(oldPath, newPath, (renameError) => {
                      if (renameError) {
                        reject(`Error renaming the extracted directory: ${renameError}`);
                        return;
                      }
                      resolve(`Game '${gameName}' has been set up successfully in ${newPath}.`);
                    });
                  } else {
                    resolve(`Game '${gameName}' is already set up in ${newPath}.`);
                  }
                });
              });
            });
          });
        });
      });
    }
    

  async function logDownload(game: Game, downloadsDir: string) {
    const logFilePath = path.join(downloadsDir, 'downloadedGamesLog.json');

    try {
        let gamesLog = [];
        try {
            const logContent = await fsPromises.readFile(logFilePath, 'utf8');
            gamesLog = JSON.parse(logContent);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error; 
        }

        const existingIndex = gamesLog.findIndex((logEntry) => logEntry.game_id === game.game_id);

        if (existingIndex > -1) {
            gamesLog[existingIndex] = game;
        } else {
            gamesLog.push(game);
        }

        await fsPromises.writeFile(logFilePath, JSON.stringify(gamesLog, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to log download:', error);
        throw error; 
    }
}