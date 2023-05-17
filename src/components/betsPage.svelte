<script lang="ts">
	import { onMount } from "svelte";
	import type { UserDto } from "../models/UserDto";
	import type { User } from "../models/User";
	import { GetAllUsersBets, GetUserById } from "../logic/getters";
	import type { Bet } from "../models/Bet";
	import BetCard from "./betCard.svelte";
	import CreateBetCard from "./createBetCard.svelte";

	export let userDto: UserDto;
	let user: User;
	let bets: Bet[] = [];

	onMount(async () => {
		user = await GetUserById(userDto.id);
		bets = await GetAllUsersBets(user.id);

		console.log(bets.length);
	});
</script>

<div class="bets-page">
	<h1 class="title">Пари</h1>
	<div class="bets">
		{#each bets as bet}
			<BetCard {bet} userId={userDto.id} />
		{/each}

		<CreateBetCard />
	</div>
</div>

<style>
	/* Cards should start from left side and be addaptive to the monitore */
	/* Cards should have 10px margin between each other */
	/* Cards should have 10px padding */
	/* Cards should have 10px border-radius */

	.bets-page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bets {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding-left: 5%;
	}

	.title {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 20px;
		font-family: "Montserrat", sans-serif;
	}

	/* for mobile */
	@media (max-width: 768px) {
		.bets {
			height: fit-content;
			padding-left: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		/* .bet {
			margin-bottom: 15px;
		} */
	}
</style>
