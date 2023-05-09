<script lang="ts">
	import { JoinBetWithNewOutcome } from "../logic/betJoin";

	let outcomeName = "";

	export let betId: number;
	export let userId: number;

	function HandleClick() {
		JoinBetWithNewOutcome(betId, userId, outcomeName);
		location.reload();
	}
</script>

<div class="addOutcomeAndJoin">
	<input
		class="addOutcomeAndJoin__input"
		type="text"
		placeholder="Название исхода"
		bind:value={outcomeName}
	/>
	<button class="addOutcomeAndJoin__button" on:click={HandleClick}>Вступить</button>
</div>

<style lang="css">
	.addOutcomeAndJoin {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
	}

	.addOutcomeAndJoin__input {
		width: 300px;
		height: 40px;
		border-radius: 5px;
		border: 1px solid #ccc;
		padding: 0 10px;
		margin-right: 10px;

		background-color: var(--betme-black);
		color: var(--betme-yellow);

		font-family: "Montserrat", sans-serif;
	}

	.addOutcomeAndJoin__button {
		width: 100px;
		height: 40px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background-color: #fff;
		cursor: pointer;

		background-color: var(--betme-black);
		color: var(--betme-yellow);
		font-family: "Montserrat", sans-serif;
	}
</style>
