<script lang="ts">
	import { colors } from './colors';
	export let loggedIn: boolean = false;
</script>

<div class="topbar">
	<h1>Bet Me</h1>
	{#if loggedIn}
		<button class="profile-button">Profile</button>
	{:else}
		<button class="profile-button">Login/Register</button>
	{/if}
</div>

<style>
	.topbar {
		background-color: #f7ce5b;
		color: white;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		border-radius: 10px;
	}

	.profile-button {
		background-color: white;
		color: #f7ce5b;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		font-weight: bold;
		cursor: pointer;
	}

	/* style for h1 */
	h1 {
		color: white;
		font-size: 30px;
		font-weight: bold;
		font-family: 'Monserat', sans-serif;
		display: flex;
	}
</style>
