<script lang="ts">

    import { onMount} from 'svelte';
    import Overlay from '$lib/overlay/Overlay.svelte';
    import type { Game } from "$lib/types";
    const logo = '/images/sigle.png';
    import { url } from '$lib/api';


    export let data;
    let gameData: Game;
    let overlayActive = false;



    async function load(data: any) {
        const res = await fetch(`${url}/games/${data.slug}`);
        const games = await res.json();
        return { games };
    }

    onMount(async () => {
        await load(data).then((res) => {
        gameData = res.games;
        }).catch((err) => {
            console.log(err);
        });
    });
  </script>
<Overlay isVisible={overlayActive}/>

<div class="relative w-full h-screen">
    {#if gameData}
        <iframe title="game" src={gameData.link} class="absolute w-full h-screen"></iframe>
    {/if}
</div>