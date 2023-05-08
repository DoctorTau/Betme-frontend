<script lang="ts">
	import Header from "../components/header.svelte";
	import { onMount } from "svelte";
	import { User } from "../logic/user";
	import { tokenStore } from "../store";

	let user: User = new User("", false);
	let token: string = "";

	onMount(() => {
		tokenStore.useLocalStorage();
		tokenStore.subscribe((value) => {
			user.ParseFromJWT(value);
			token = value;
		});

		token = localStorage.getItem("token") == null ? "" : localStorage.getItem("token")!;
		user.ParseFromJWT(token);
	});
</script>

<Header {user} />
<slot />
