<script lang="ts">
	import { onMount } from "svelte";
	import { UserDto } from "../models/UserDto";
	import { tokenStore } from "../store";
	import BetsPage from "../components/betsPage.svelte";

	$: userDto = new UserDto(0, "", false);
	$: token = "";

	onMount(async () => {
		token = localStorage.getItem("token") ? "" : localStorage.getItem("token")!;

		tokenStore.useLocalStorage();
		tokenStore.subscribe(async (value) => {
			token = value;
		});

		userDto = await UserDto.ParseFromJWT(token);
	});
</script>

<div class="root">
	{#if userDto.id != 0}
		<BetsPage {userDto} />
	{/if}
</div>
