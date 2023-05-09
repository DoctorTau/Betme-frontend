<script lang="ts">
	function GoToCreatePage() {
		window.location.href = "/createBet";
	}
</script>

<div class="betCard" on:click={GoToCreatePage} on:keydown={GoToCreatePage}>
	<div class="plus_sign">+</div>
</div>

<style>
	.betCard {
		width: 100%;
		height: 100px;
		max-width: 200px;
		background-color: var(--betme-yellow);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10px;
		margin: 20px;
		cursor: pointer;

		border-width: 5px;
		border-color: var(--betme-black);
	}

	.plus_sign {
		font-size: 50px;
		font-weight: bold;
		color: var(--betme-black);
	}
</style>
