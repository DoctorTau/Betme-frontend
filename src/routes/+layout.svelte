<script lang="ts">
	import { onMount } from "svelte";
	import Header from "../components/header.svelte";
	import { LoginRedirection } from "../logic/login";

	onMount(() => {
		LoginRedirection();
	});
</script>

<Header />
<slot />
