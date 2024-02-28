<script lang="ts">
  import { onMount } from 'svelte';
  import type { Game } from "$lib/types";


  export let data;
  let gameData: Game;

async function load(data) {
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
});

</script>

<h1>{gameData}</h1>
