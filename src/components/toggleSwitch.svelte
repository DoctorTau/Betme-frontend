<!-- Create a toggle switch. The func should be passed from outside -->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let func: () => void;
	export let checked: boolean = false;

	let handleToggle = () => {
		func();
	};
</script>

<div class="toggle-switch">
	<input type="checkbox" id="toggle" {checked} on:change={handleToggle} />
	<label for="toggle" />
</div>

<style>
	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-switch label {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		cursor: pointer;
		border-radius: 34px;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.toggle-switch label:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 50%;
	}

	.toggle-switch input:checked + label {
		background-color: var(--betme-black);
	}

	.toggle-switch input:focus + label {
		box-shadow: 0 0 1px var(--betme-yellow);
	}

	.toggle-switch input:checked + label:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	.toggle-switch label:active:before {
		width: 45px;
	}
</style>
