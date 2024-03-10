<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";

    import type { Game } from "$lib/types";

    export let cardData: Game;

    let hasInstallZip = false;
    
    $: { if (cardData.zip_file) {
        hasInstallZip = true;
        } 
    }

    async function downloadGameZip(zip: string) {
    }

    async function downloadGameUrl(gameData: Game) {
    try {
        const response = await fetch('/download-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });

        if (response.ok) {
            // Handle successful download initiation here
            // You might need to adjust this part based on how you want to trigger the download
            alert('Download initiated successfully');
        } else {
            // Handle server errors or invalid responses
            alert('Failed to initiate download');
        }
    } catch (error) {
        console.error('Error sending download request:', error);
        alert('Error initiating download');
    }
}

</script>

<button on:click={() => goto(`/game/${cardData.id}/`)}>
    <Card.Root>
        <Card.Header>
        <Card.Title>{cardData.name}</Card.Title>
        <Card.Description>{cardData.description}</Card.Description>
        </Card.Header>
        <Card.Content>
            <img src={cardData.image} alt={cardData.name} />
            <div class="flex ">
                <p class="px-5">{cardData.blockchain}</p> 
                <p>{cardData.game_category}</p>
            </div>
        </Card.Content>
        <Card.Footer>
            {#if hasInstallZip}
                <Button on:click={() => downloadGameZip(cardData.zip_file)} variant="outline">Install</Button>
            {:else}
                <AlertDialog.Root>
                    <AlertDialog.Trigger asChild let:builder>
                    <Button builders={[builder]} on:click={(e) => {e.stopPropagation()}}  variant="outline">Install</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content>
                    <AlertDialog.Header>
                        <AlertDialog.Title>Warning</AlertDialog.Title>
                        <AlertDialog.Description>
                            This game doesn't come with a prepackaged zip file that we have verified. If you want to continue, Rune will directly download the game via the url: {cardData.link}
                        </AlertDialog.Description>
                    </AlertDialog.Header>
                        <AlertDialog.Footer>
                            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                            <AlertDialog.Action on:click={() => {
                                downloadGameUrl(cardData);
                            }}>Continue</AlertDialog.Action>                    
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog.Root>
              {/if}
        </Card.Footer>
    </Card.Root>
</button>

