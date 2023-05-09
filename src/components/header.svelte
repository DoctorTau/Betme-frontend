<script lang="ts">
	import { onMount } from "svelte";
	import { logout } from "../logic/login";
	import { UserDto } from "../models/UserDto";
	import { tokenStore } from "../store";

	$: user = new UserDto(0, "", false);
	onMount(async () => {
		tokenStore.useLocalStorage();
		tokenStore.subscribe(async (value) => {
			user = await UserDto.ParseFromJWT(value);
		});

		user = await UserDto.ParseFromJWT(
			localStorage.getItem("token") ? "" : localStorage.getItem("token")!
		);
	});

	function GoToMainPage() {
		window.location.href = "/";
	}
</script>

<div class="topbar">
	<h1 on:click={GoToMainPage} on:keydown={GoToMainPage}>Bet Me</h1>
	{#if user.loggedIn}
		<button
			class="profile-button"
			on:click={() => {
				logout();
			}}>Выход</button
		>
	{/if}
</div>

<style>
	.topbar {
		background-color: var(--betme-yellow);
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
		color: var(--betme-yellow);
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		font-weight: bold;
		cursor: pointer;
	}

	.topbar h1 {
		color: white;
		font-size: 30px;
		font-weight: bold;
		font-family: "Monserat", sans-serif;
		display: flex;
		cursor: pointer;
	}
</style>
