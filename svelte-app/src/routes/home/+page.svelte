<script>

    import  Library  from "$lib/pages/home/Library.svelte";
    import  Explore  from "$lib/pages/home/Explore.svelte";

    let selection = 0;


</script>

{#if selection == 0}
    <Library/>
{:else}
    <Explore/>
{/if}

<style>
    :root {
        background-color: #1f2937;
    }
</style>