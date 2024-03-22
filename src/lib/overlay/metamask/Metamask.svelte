<script lang="ts">
    import { onMount } from "svelte";
    let hasMetaMask = false;
    let connectedToMetaMask = false;
    let accounts: string[] = [];
    


    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        hasMetaMask = true;
    }

    async function connectMetaMask() {
        if (window.ethereum) {
        try {
            const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = _accounts;
            connectedToMetaMask = true;
        } catch (error) {
            console.error('Error connecting to MetaMask', error);
        }
        }
    }

    onMount(async () => {
      if (hasMetaMask) {
        await connectMetaMask();
      }
    });

</script>

<div class="text-white">
{#if hasMetaMask}
  {#if connectedToMetaMask}
    {#if accounts.length > 0}
      <p>Connected account: {accounts[0]}</p>
    {/if}
    {:else}
    <button on:click={connectMetaMask}>Connect MetaMask</button>
  {/if}

{:else}
  <p>Please install MetaMask.</p>
{/if}
</div>