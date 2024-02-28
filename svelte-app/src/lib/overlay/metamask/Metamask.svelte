<script lang="ts">
    let hasMetaMask = false;
    let accounts = [];


    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        hasMetaMask = true;
    }

    async function connectMetaMask() {
        if (window.ethereum) {
        try {
            const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = _accounts;
        } catch (error) {
            console.error('Error connecting to MetaMask', error);
        }
        }
    }
        
</script>

{#if hasMetaMask}
  <button on:click={connectMetaMask}>Connect MetaMask</button>
  {#if accounts.length > 0}
    <p>Connected account: {accounts[0]}</p>
  {/if}
{:else}
  <p>Please install MetaMask.</p>
{/if}