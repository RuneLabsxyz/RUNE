<script>
    import { createEventDispatcher } from 'svelte';
    const logo = '/images/sigle.png';

    // Prop to control visibility
    export let isVisible = false;

    const dispatch = createEventDispatcher();

    // Function to close the modal
    function closeModal() {
        dispatch('close');
    }
</script>

{#if isVisible}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="bg-white p-4">
                <h1 class="text-2xl">Overlay</h1>
                <p>This is an overlay</p>
            </div>
        </div>
    </div>
{/if}

<div class="fixed top-0 left-0 z-50">
    <div class="">
        <button type="button" class="" on:click={() => isVisible = !isVisible} aria-label="Toggle visibility">
            <img src={logo} alt="Company logo" class="h-[4rem] p-2">
        </button>
    </div>
</div>
  