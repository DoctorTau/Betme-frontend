<script lang="ts">
	import { onMount } from "svelte";
	import { logout } from "../logic/login";
	import { UserDto } from "../models/UserDto";
	import { getJwt, tokenStore } from "../store";
	import { goto } from "$app/navigation";
	import { GetUserById } from "../logic/getters";
	import type { User } from "../models/User";

	$: userDto = new UserDto(0, "", false);
	let user: User | null = null;

	onMount(async () => {
		tokenStore.useLocalStorage();
		tokenStore.subscribe(async (value) => {
			userDto = await UserDto.ParseFromJWT(value);
		});

		userDto = await UserDto.ParseFromJWT(getJwt());

		user = await GetUserById(userDto.id);
	});

	function GoToMainPage() {
		window.location.href = "/";
	}
</script>

<div class="topbar">
	<h1 on:click={GoToMainPage} on:keydown={GoToMainPage}>Bet Me | open Alpha</h1>
	{#if userDto.loggedIn && user != null}
		<h2>{user.name} {user.numberOfWins}</h2>

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
		color: var(--betme-black);
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
		color: var(--betme-black);
	}

	.topbar h2 {
		color: var(--betme-black);
		font-size: 20px;
		font-weight: bold;
		font-family: "Monserat", sans-serif;
		margin-left: auto;
		margin-right: 10px;
	}

	/* for mobile */
	@media (max-width: 768px) {
		.topbar h1 {
			color: white;
			font-size: 20px;
			font-weight: bold;
			font-family: "Monserat", sans-serif;
			display: flex;
			cursor: pointer;
			color: var(--betme-black);
		}

		.topbar h2 {
			color: var(--betme-black);
			font-size: 15px;
			font-weight: bold;
			font-family: "Monserat", sans-serif;
			margin-left: auto;
			margin-right: 5px;
		}
	}
</style>
