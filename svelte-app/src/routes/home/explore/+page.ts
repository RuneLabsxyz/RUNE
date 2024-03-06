import { url } from '$lib/api';

export async function load() {
    console.log('url', url);
    const res = await fetch(`${url}/games`);
    const games = await res.json();
    return { games };
}