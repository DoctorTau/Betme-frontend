<script lang="ts">
	import { onMount } from "svelte";
	import Loginform from "../../components/loginform.svelte";
	import { UserDto } from "../../models/UserDto";

	$: showLogin = true;
	let user: UserDto;
	onMount(async () => {
		const token = localStorage.getItem("token");

		if (token != null && token.length > 3) {
			showLogin = false;
			user = await UserDto.ParseFromJWT(token);
		}
	});
</script>

<div class="root">
	{#if showLogin}
		<Loginform {showLogin} />
	{:else if user == null}
		<h1>Something went wrong</h1>
	{:else}
		<h1>Вы вошли как {user.username}</h1>
	{/if}
</div>

<style>
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.root h1 {
		font-size: 3rem;
		font-family: "Montserrat", sans-serif;
		color: var(--betme-black);
	}
</style>
