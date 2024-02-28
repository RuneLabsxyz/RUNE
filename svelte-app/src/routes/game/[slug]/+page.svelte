<script lang="ts">
  import { onMount } from 'svelte';
  import type { Game } from "$lib/types";
  import { Button } from "$lib/components/ui/button";
  import { goto } from '$app/navigation';

  const back = '/svgs/back.svg'


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

              </div>
          </div>
      </div>
  </div>

</div>
{/if}