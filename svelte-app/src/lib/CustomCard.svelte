<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";

    import type { Game } from "$lib/types";

    export let cardData: Game;

    const addToLibrary = () => {
        console.log('Added to Library', cardData.id);
    }
</script>
    <button on:click={() => goto(`/game/${cardData.id}/`)}>
    <Card.Root>
        <Card.Header>
        <Card.Title>{cardData.name}</Card.Title>
        <Card.Description>{cardData.description}</Card.Description>
        </Card.Header>
        <Card.Content>
        <p>Image</p>
        <p>{cardData.chain}</p>
        </Card.Content>
        <Card.Footer>
            <Button on:click={addToLibrary}>Add to Library</Button>
        </Card.Footer>
    </Card.Root>
</button>