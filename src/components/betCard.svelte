<script lang="ts">
	import { onMount } from "svelte";
	import type { Bet } from "../models/Bet";
	import { GetUserOutcome } from "../logic/getters";
	import { goto } from "$app/navigation";

	export let bet: Bet;
	export let userId: number;
	let usersOutcome: string;

	onMount(async () => {
		usersOutcome = await GetUserOutcome(bet.id, userId);
	});

	function HandleClick() {
		goto("/bet/" + bet.id);
	}
</script>

<div class="root">
	<div class="betCard">
		<div class="betCard__header">
			<div class="betCard__header__title">{bet.name}</div>
		</div>

		<span />

		<div class="betCard__body">
			<div class="betCard__body__description">{bet.description}</div>
		</div>

		<span />

		<div class="betCard__outcome">
			<div class="betCard__outcome__title">Ваше предсказание: {usersOutcome}</div>
		</div>

		<span />

		<div class="redirect">
			<button class="redirect__button" on:click={HandleClick}> Перейти </button>
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
		margin: 0 10px 0 10px;
	}

	.betCard {
		width: 100%;
		max-width: 250px;
		height: max-content;
		background-color: var(--betme-yellow);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		padding: 10px;

		border-width: 5px;
		border-color: var(--betme-black);
	}

	.betCard span {
		height: 10px;
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

	.betCard__outcome__title {
		font-family: "Montserrat", sans-serif;
		font-size: 18px;
		font-weight: 400;
		color: var(--betme-gray);
	}

	.redirect {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.redirect__button {
		width: 100%;
		max-width: 200px;
		height: 50px;
		background-color: var(--betme-black);
		border-radius: 10px;
		font-family: "Montserrat", sans-serif;
		font-size: 18px;
		font-weight: 400;
		color: var(--betme-yellow);

		border-width: 0px;
	}
</style>
