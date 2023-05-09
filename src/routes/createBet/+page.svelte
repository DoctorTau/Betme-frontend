<script lang="ts">
	import { goto } from "$app/navigation";
	import { CreateBetWithOutcomes } from "../../logic/betCreation";
	import { DateInput } from "date-picker-svelte";

	let betName = "";
	let betDescription = "";
	let closedAt: Date = new Date();
	let outcomes: string[] = [];

	let visibleOutcomes = 1;

	let errorMessage: string = "";

	function checkInput(): boolean {
		if (betName == "") {
			errorMessage = "Нужно заполнить наименование";
			return false;
		}
		if (outcomes.length < 2) {
			errorMessage = "Нужно добавить хотя бы два исхода";
			return false;
		}

		for (let i = 0; i < outcomes.length; i++) {
			if (outcomes[i] == "") {
				errorMessage = "Нужно заполнить все исходы";
				return false;
			}
		}

		return true;
	}

	let handleCreateBet = async () => {
		try {
			if (!checkInput()) return;
			let bet = await CreateBetWithOutcomes(betName, betDescription, closedAt, outcomes);
			errorMessage = "";
			// Go to bet page
			goto(`/bet/${bet.id}`);
		} catch (e) {
			("Неверно заполнены поля");
			console.log(e);
		}
	};
</script>

<div class="form">
	<div class="loginform">
		<h1 class="loginform__title">Create Bet</h1>
		<input class="loginform__input" type="text" placeholder="Наименование" bind:value={betName} />
		<input
			class="loginform__input"
			type="text"
			placeholder="Описание"
			bind:value={betDescription}
		/>

		{#each Array(visibleOutcomes) as _, i}
			<div class="outcome__input">
				<input
					class="outcome__input__field"
					type="text"
					placeholder="Outcome"
					bind:value={outcomes[i]}
				/>
				{#if i != 0}
					<button class="outcome__deletion__button" on:click={() => visibleOutcomes--}> x </button>
				{:else}
					<div class="outcome__deletion__button" />
				{/if}
			</div>
		{/each}
		<button class="loginform__button" on:click={() => visibleOutcomes++}> Добавить исход </button>

		<button class="loginform__button" on:click={handleCreateBet}>Создать</button>

		{#if errorMessage != ""}
			<p class="loginform__error">{errorMessage}</p>
		{/if}
	</div>
</div>

<style>
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.loginform {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 10px;

		background-color: var(--betme-yellow);
		margin-top: 2%;
	}

	.loginform__title {
		font-size: 2rem;
		font-family: "Montserrat", sans-serif;
	}

	.loginform__input {
		width: 20rem;
		height: 2rem;
		margin: 0.5rem;
	}

	.loginform__button {
		width: 20rem;
		height: 2rem;
		margin: 0.5rem;

		background-color: var(--betme-black);
		color: var(--betme-yellow);
		border-radius: 10px;
		border: none;

		font-family: "Montserrat", sans-serif;
	}

	.outcome__input {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.outcome__input__field {
		width: 18rem;
		height: 2rem;
		margin: 0.5rem;
	}

	.outcome__deletion__button {
		width: 2rem;
		height: 2rem;
	}

	.loginform__error {
		color: red;
		font-family: "Montserrat", sans-serif;
	}
</style>
