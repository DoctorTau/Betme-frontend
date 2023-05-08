<script lang="ts">
	import { onMount } from "svelte";
	import Loginform from "../components/loginform.svelte";
	import { UserDto } from "../models/UserDto";
	import { tokenStore } from "../store";
	import BetsPage from "../components/betsPage.svelte";

	$: userDto = new UserDto(0, "", false);
	$: token = "";

	onMount(async () => {
		token = localStorage.getItem("token") ? "" : localStorage.getItem("token")!;

		tokenStore.useLocalStorage();
		tokenStore.subscribe(async (value) => {
			userDto = await UserDto.ParseFromJWT(value);
			token = value;
		});
		// console.log(token);

		userDto = await UserDto.ParseFromJWT(token);
	});
</script>

<div class="root">
	{#if !userDto.loggedIn}
		<Loginform />
	{:else}
		<BetsPage userDto={userDto} />
	{/if}
</div>
