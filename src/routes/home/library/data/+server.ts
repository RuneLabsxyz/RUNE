import { promises as fsPromises } from 'fs';
import path from 'path';

export const GET: RequestHandler = async () => {
    const logFilePath = path.resolve('runedownloads', 'downloadedGamesLog.json');

    try {
        const logContent = await fsPromises.readFile(logFilePath, 'utf8');
        const gamesLog = JSON.parse(logContent);

        return new Response(JSON.stringify(gamesLog), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // Handle file not found or parsing errors
        return new Response(JSON.stringify({ error: 'Log file not found or corrupted' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
