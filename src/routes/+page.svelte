<script lang="ts">
	import Loginform from '../components/loginform.svelte';

	let showModal = true;
	let handleDone = () => {
		showModal = false;
	};
</script>

<div class="root" />
<div id="loginform" class:showed={showModal}>
	<Loginform on:login={handleDone} on:register={handleDone} />
</div>

