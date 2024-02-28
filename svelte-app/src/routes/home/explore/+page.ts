export async function load() {
    const res = await fetch('http://localhost:3000/api/games');
    const games = await res.json();
    return { games };
}