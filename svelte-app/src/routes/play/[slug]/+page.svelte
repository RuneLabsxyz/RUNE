<script lang="ts">

    import { onMount } from 'svelte';
    import type { Game } from "$lib/types";

    export let data;

    let gameData: Game;

    async function load(data: any) {
        const res = await fetch(`http://localhost:3000/api/games/${data.slug}`);
        const games = await res.json();
        return { games };
    }

    onMount(async () => {
        await load(data).then((res) => {
        gameData = res.games;
        }).catch((err) => {
            console.log(err);
        });
        console.log(gameData);
        console.log(gameData.link);
    });

  </script>

{#if gameData}
    <iframe src={gameData.link} class="w-full h-screen"></iframe>
{/if}