<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";

    import type { Game } from "$lib/types";

    export let cardData: Game;

    async function downloadGame(gameUrl: string) {
        if (!gameUrl) {
            alert('Please enter a valid URL');
            return;
        }
        // Redirect to the Express endpoint with the game URL as a query parameter
        window.location.href = `/download-game?url=${encodeURIComponent(gameUrl)}`;
    }


    const addToLibrary = () => {
        console.log('Added to Library', cardData.id);
        downloadGame(cardData.link);
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

            <p>{cardData.blockchain}</p>
        </Card.Content>
        <Card.Footer>
            <Button on:click={addToLibrary}>Add to Library</Button>
        </Card.Footer>
    </Card.Root>
</button>