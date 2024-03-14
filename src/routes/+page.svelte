<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    let isLoggedIn = false;

    onMount(() => {
        if (isLoggedIn) {
            goto('/home');
        } else {
            goto('/home');
        }
    });

    
</script>