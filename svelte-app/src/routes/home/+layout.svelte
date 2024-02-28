<script>
    import { goto } from "$app/navigation";
    import Overlay from "$lib/overlay/Overlay.svelte";
    const logo = '/images/logo.png';
</script>

<!-- Header -->
    <div class="w-full h-[4rem] bg-slate-600 text-white flex justify-between items-center">
        <div class="flex items-center">
            <img src={logo} alt="Company logo" class="h-[4rem] p-2">
        </div>  
        <div class="flex text-center items-center">
            <button class="p-3" on:click={() => goto('/home/library')}>Library</button>
            <button class="p-3" on:click={() => goto('/home/explore')}>Explore</button>
        </div>
        <div class="pr-5">
            Account
        </div>
    </div>

    <Overlay />

<slot />