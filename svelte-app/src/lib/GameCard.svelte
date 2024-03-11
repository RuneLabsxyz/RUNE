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

    async function play() {

    }

</script>

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
        <Button on:click={() => play()} variant="outline">Play</Button>
    </Card.Footer>
</Card.Root>

