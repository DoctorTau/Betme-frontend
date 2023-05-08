<script lang="ts">
	import { onMount } from "svelte";
	import Loginform from "../components/loginform.svelte";
	import { UserDto } from "../models/UserDto";
	import { tokenStore } from "../store";

	$: user = new UserDto("", false);
	let message: string;

	onMount(async () => {
		tokenStore.useLocalStorage();
		tokenStore.subscribe(async (value) => {
			user = await UserDto.ParseFromJWT(value);
		});

		user = await UserDto.ParseFromJWT(
			localStorage.getItem("token") ? "" : localStorage.getItem("token")!
		);
		console.log(user);
	});
</script>

<div class="root">
	{#if !user.loggedIn}
		<div id="loginform">
			<Loginform />
		</div>
	{:else}{/if}

	<div>{user.username == "" ? "kek" : user.username}</div>
</div>
