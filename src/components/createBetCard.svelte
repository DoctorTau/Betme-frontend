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
		width: 250px;
		height: auto;
		background-color: var(--betme-yellow);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10px;
		cursor: pointer;

		margin: 0 10px 10px 10px;
		border-width: 5px;
		border-color: var(--betme-black);
	}

	.plus_sign {
		font-size: 100px;
		font-weight: bold;
		color: var(--betme-black);
	}
</style>
