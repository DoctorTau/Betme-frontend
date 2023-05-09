<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import type { Bet } from "../../../models/Bet";
	import type { User } from "../../../models/User";
	import type { Outcome } from "../../../models/Outcome";
	import { GetBetById, GetUserById } from "../../../logic/getters";
	import type { UserBet } from "../../../models/UserBet";
	import { get } from "svelte/store";

	const betId: number = Number($page.params.slug);
	console.log(betId);
	let bet: Bet;
	let outcomeUsers: Map<number, Array<UserBet>> = new Map<number, Array<UserBet>>();
	let users: User[] = [];

	onMount(async () => {
		bet = await GetBetById(betId);
		console.log(bet);

		// create a dict with key = outcomeId, value = list of users
		// who have chosen this outcome
		for (let outcome of bet.outcomes) {
			outcomeUsers.set(outcome.id, []);
			for (let user of bet.participants) {
				if (user.outcomeId == outcome.id) {
					outcomeUsers.get(outcome.id)!.push(user);
					users.push(await GetUserById(user.userId));
					console.log(user);
				}
			}
		}

		console.log(outcomeUsers);
	});

	function getUsers(outcomeId: number): User[] {
		let usersToReturn: User[] = [];
		for (let user of outcomeUsers.get(outcomeId)!) {
			usersToReturn.push(users.find((u) => u.id == user.userId)!);
		}
		return usersToReturn;
	}
</script>

<!-- On the page center should be the name of the bet
then comes description, and then the possible outcomes in column,
 under each outcome should be the list of users, who have chousen it. 
 -->
<div class="root">
	{#await GetBetById(betId) then bet}
		<div class="betCard">
			<div class="title">{bet.name}</div>
			<div class="description">{bet.description}</div>
			<div class="outcomes">
				{#each bet.outcomes as outcome}
					<div class="outcome">
						<div class="outcome__title">{outcome.name}</div>
						<div class="outcome__users">
							{#each outcome.users as user}
								<div class="outcome__users__user">{user.name}</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:catch error}
		<div class="error">{error.message}</div>
	{/await}
</div>

<style>
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
		margin: 20px;

		border-width: 5px;
		border-color: var(--betme-black);
	}

	.title {
		font-family: "Montserrat", sans-serif;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		color: var(--betme-black);
	}

	.description {
		font-family: "Montserrat", sans-serif;
		font-size: 16px;
		text-align: center;
		color: var(--betme-black);
	}

	.outcomes {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.outcome {
		display: flex;
		flex-direction: column;
		margin-top: 10px;
	}

	.outcome__title {
		font-family: "Montserrat", sans-serif;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		color: var(--betme-black);
	}

	.outcome__users {
		display: flex;
		flex-direction: column;
		align-items: first baseline;
	}

	.outcome__users__user {
		font-family: "Montserrat", sans-serif;
		font-size: 14px;
		text-align: center;
		color: var(--betme-black);
	}
</style>
