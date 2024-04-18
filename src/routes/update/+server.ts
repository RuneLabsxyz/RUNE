import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async () => {
    const GITHUB_API_TAGS_URL = 'https://api.github.com/repos/RuneLabsxyz/RUNE/tags';
    try {
        const response = await fetch(GITHUB_API_TAGS_URL);
        const tags = await response.json();
        console.log(tags);
        if (response.status !== 200) {
            throw new Error('Unrespon');
        }
        const latestTag = tags[0].name;
        
        return new Response(JSON.stringify({ latestTag }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
    catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch ' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}