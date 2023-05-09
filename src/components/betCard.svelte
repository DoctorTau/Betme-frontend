<script lang="ts">
	import { onMount } from "svelte";
	import type { Bet } from "../models/Bet";
	import { GetUserOutcome } from "../logic/getters";

	export let bet: Bet;
	export let userId: number;
	let usersOutcome: string;

	onMount(async () => {
		usersOutcome = await GetUserOutcome(bet.id, userId);
	});
</script>

<div class="root">
	<div class="betCard">
		<div class="betCard__header">
			<div class="betCard__header__title">{bet.name}</div>
		</div>
		<div class="betCard__body">
			<div class="betCard__body__description">{bet.description}</div>
		</div>

		<div class="betCard__footer">
			<div class="betCard__footer__date">До: {new Date(bet.closedAt).toLocaleString()}</div>
		</div>

		<div class="betCard__outcome">
			<div class="betCard__outcome__title">Ваше предсказание: {usersOutcome}</div>
		</div>
	</div>
</div>

<style>
	/* The background should have the var(--betme-yellow) color
	All text have Monserat font and right alligment.
	Text color is var(--betme-black) */

	.root {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.betCard {
		width: 100%;
		max-width: 500px;
		background-color: var(--betme-yellow);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		padding: 10px;

		border-width: 5px;
		border-color: var(--betme-black);
	}

	.betCard__header {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.betCard__header__title {
		font-family: "Montserrat", sans-serif;
		font-size: 24px;
		font-weight: 700;
		text-orientation: sideways;
		color: var(--betme-black);
	}

	.betCard__body {
		width: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.betCard__body__description {
		font-family: "Montserrat", sans-serif;
		font-size: 18px;
		font-weight: 400;
		color: var(--betme-black);
	}

	.betCard__footer__date {
		font-family: "Montserrat", sans-serif;
		font-size: 18px;
		font-weight: 400;
		color: var(--betme-gray);
	}

	.betCard__outcome__title {
		font-family: "Montserrat", sans-serif;
		font-size: 18px;
		font-weight: 400;
		color: var(--betme-gray);
	}
</style>
