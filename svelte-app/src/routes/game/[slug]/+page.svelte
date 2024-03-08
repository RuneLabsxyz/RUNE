<script lang="ts">
  import { onMount } from 'svelte';
  import type { Game } from "$lib/types";
  import { Button } from "$lib/components/ui/button";
  import { goto } from '$app/navigation';
  import { url } from '$lib/api';

  const back = '/svgs/back.svg'

  function openInNewTab(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  export let data;
  let gameData: Game;

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
      console.log(gameData);
  });

</script>
{#if gameData}

<div class="flex flex-col h-screen bg-slate-700">

  <!-- Content -->
  <div class="w-full flex-1 flex justify-between text-white">
      <div class="w-1/4 bg-slate-700">
          <div class="flex pt-10 pb-4 px-20 text-2xl uppercase items-center">
              <Button variant="link" size="icon" on:click={() => goto(`/home/explore`)}>
                <img src={back} alt="Company logo" class="h-[30px] px-3 mr-10">
              </Button>
              {gameData.name}
          </div>
          <div class="px-20 text-black">
          </div>
          <div>

          </div>
      </div>
      <div class="w-3/4 bg-slate-700 ">
          <div class="flex justify-between item-center border-b py-3 mr-10">
              <div></div>
              <div class="flex item-center ">
              </div>
          </div>
          <div>
              <div class="flex flex-wrap justify-between px-10 py-10">
                  <div class="w-1/2">
                      <div class="flex flex-col">
                          <div class="text-2xl font-bold">Description</div>
                          <div class="text-sm">{gameData.description}</div>
                      </div>
                  </div>
                  <div class="w-1/2">
                    <div>
                      <img src={gameData.image} alt="Game Image" class="w-full h-96 object-cover">
                    </div>
                      <div class="flex flex-col">
                          <div class="text-2xl font-bold">Game Details</div>
                          <div class="flex">
                            <div class="text-sm px-5">Chain: {gameData.blockchain}</div>
                            <div class="text-sm px-5">Genre: {gameData.game_category}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                <Button size="lg" on:click={() => goto(`/game/${gameData.id}/play`)}>
                  Add to Library
                </Button>
                <Button size="lg" on:click={() => openInNewTab(`/play/${gameData.id}/`)}>
                  Play Game
                </Button>
              </div>
          </div>
      </div>
  </div>

</div>
{/if}