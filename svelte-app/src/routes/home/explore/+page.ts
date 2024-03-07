import { url } from '$lib/api';

export async function load() {
    try {
        const res = await fetch(`${url}/games`);
        const games = await res.json();
        return { games };
    } catch (e) {
        return { };
    }
}