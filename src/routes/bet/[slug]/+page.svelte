<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import type { Bet } from "../../../models/Bet";
	import type { User } from "../../../models/User";
	import { GetBetById, GetUserById } from "../../../logic/getters";
	import type { UserBet } from "../../../models/UserBet";
	import { BetStatus } from "../../../models/BetStatus";
	import { StartBet } from "../../../logic/betCreation";
	import { UserDto } from "../../../models/UserDto";
	import { JoinBet, JoinBetWithNewOutcome } from "../../../logic/betJoin";
	import AddOutcomeAndJoin from "../../../components/addOutcomeAndJoin.svelte";
	import { CheckIfThisUserVote, Vote } from "../../../logic/betVote";

	const betId: number = Number($page.params.slug);
	let bet: Bet;
	let outcomeUsers: Map<number, Array<UserBet>> = new Map<number, Array<UserBet>>();
	let users: User[] = [];
	let currentUser: UserDto | null = null;

	let isParticipant: boolean = false;
	let selectedOutcomeId: number = -1;

	let showVote: boolean = false;

	$: newOutcomeField = false;
	$: canJoin = !isParticipant && currentUser != null && bet.status == BetStatus.Creating;
	$: errorMessage = "";
	async function initBet() {
		bet = await GetBetById(betId);

		// create a dict with key = outcomeId, value = list of users
		// who have chosen this outcome
		for (let outcome of bet.outcomes) {
			outcomeUsers.set(outcome.id, []);
			for (let user of bet.participants) {
				if (user.outcomeId == outcome.id) {
					outcomeUsers.get(outcome.id)!.push(user);
					users.push(await GetUserById(user.userId));
				}
			}
		}
	}

	onMount(async () => {
		await initBet();
		currentUser = await UserDto.ParseFromJWT(localStorage.getItem("token")!);
		if (currentUser != null) {
			for (let user of bet.participants) {
				if (user.userId == currentUser.id) {
					isParticipant = true;
					break;
				}
			}
		}

		showVote =
			!(await CheckIfThisUserVote(betId, currentUser?.id!)) &&
			(bet.status == BetStatus.Open || bet.status == BetStatus.Voting) &&
			isParticipant;
	});
</script>

<!-- On the page center should be the name of the bet
then comes description, and then the possible outcomes in column,
 under each outcome should be the list of users, who have chousen it. 
 -->
{#await GetBetById(betId) then bet}
	<div class="root">
		<div class="betCard">
			<div class="title">{bet.name}</div>
			<div class="description">{bet.description}</div>
			<!-- <div class="till__date"><b>До</b> {new Date(bet.closedAt).toLocaleString()}</div> -->
			<div class="outcomes">
				{#each bet.outcomes as outcome}
					<div class="outcome__row">
						<div class="outcome">
							<div class="outcome__title">{outcome.name}</div>
							<div class="outcome__users">
								{#each outcome.users as user}
									<div class="outcome__users__user">{user.name}</div>
								{/each}
							</div>
						</div>
						{#if canJoin || showVote}
							<input
								type="radio"
								name="outcome"
								bind:group={selectedOutcomeId}
								value={outcome.id}
							/>
						{/if}
					</div>
				{/each}
			</div>

			<!--separator  -->
			<hr />

			{#if bet.status == BetStatus.Closed}
				<div class="winner__section">
					<div class="outcome__row">
						<div class="outcome">
							<div class="outcome__title">Победители</div>
							<div class="winner__section">
								<div class="outcome__users">
									{#each bet.outcomes as outcome}
										{#if outcome.id == bet.winOutcomeId}
											<div class="outcome__title__centered">{outcome.name}</div>
											{#each outcome.users as user}
												<div class="outcome__users__user">{user.name}</div>
											{/each}
										{/if}
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
		{#if bet.status == BetStatus.Creating && currentUser != null && isParticipant && bet.creatorId == currentUser.id}
			<button
				class="button__bet"
				on:click={() => {
					StartBet(betId);
					location.reload();
				}}>Начать пари</button
			>
		{:else if canJoin}
			<div class="button__stack">
				<button
					class="button__bet"
					on:click={async () => {
						await JoinBet(betId, currentUser == null ? -1 : currentUser.id, selectedOutcomeId);
						location.reload();
					}}>Присоединиться</button
				>
				{#if newOutcomeField == false}
					<button
						class="button__bet"
						on:click={() => {
							newOutcomeField = true;
						}}>Свой вариант</button
					>
				{:else}
					<div class="add__outcome__menu">
						<AddOutcomeAndJoin {betId} userId={currentUser == null ? 0 : currentUser.id} />
					</div>
				{/if}
			</div>
		{:else if showVote}
			<button
				class="button__bet"
				on:click={async () => {
					if (selectedOutcomeId != -1) {
						await Vote(betId, currentUser == null ? -1 : currentUser.id, selectedOutcomeId);
						location.reload();
					} else {
						errorMessage = "Выберите исход";
					}
				}}>Проголосовать</button
			>
		{/if}
		{#if errorMessage != ""}
			<div class="error">{errorMessage}</div>
		{/if}
	</div>
{:catch error}
	<div class="error">{error.message}</div>
{/await}

<style>
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
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

	.outcome__row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.outcome__row input {
		width: 20px;
		height: 20px;
		margin-top: 10%;

		background-color: var(--betme-yellow);
		color: var(--betme-black);
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

	.button__bet {
		width: 100%;
		max-width: 200px;
		height: 50px;
		background-color: var(--betme-black);
		color: var(--betme-yellow);
		border-radius: 10px;
		border: none;
		font-family: "Montserrat", sans-serif;
		font-size: 16px;
		font-weight: bold;
		margin-top: 5px;
		cursor: pointer;
	}

	.button__stack {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.add__outcome__menu {
		width: 100%;
		height: 100%;
	}

	.error {
		font-family: "Montserrat", sans-serif;
		font-size: 16px;
		text-align: center;
		color: var(--betme-red);
	}

	.winner__section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.outcome__title__centered{
		font-family: "Montserrat", sans-serif;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		color: var(--betme-black);

		display: flex;
		align-self: center;
	}
</style>
