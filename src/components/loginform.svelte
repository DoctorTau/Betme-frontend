<!-- Create a simple login form in svelte kit  -->

<!-- Path: src/components/loginform.svelte -->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { login, register } from '../logic/login';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import ToggleSwitch from './toggleSwitch.svelte';

	const dispatch = createEventDispatcher();

	let regForm = false;

	let name = '';
	let email = '';
	let password = '';

	let handleLogin = async () => {
		try {
			await login(email, password);
		} catch (e) {
			console.log(e);
		}
	};

	let handleRegister = async () => {
		try {
			await register(name, email, password);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="form">
	<div class="loginform">
		{#if regForm}
			<h1 class="loginform__title">Register</h1>
			<input class="loginform__input" type="text" placeholder="Name" bind:value={name} />
			<input class="loginform__input" type="email" placeholder="Email" bind:value={email} />
			<input
				class="loginform__input"
				type="password"
				placeholder="Password"
				bind:value={password}
			/>
			<button class="loginform__button" on:click={handleRegister}> Register </button>
		{:else}
			<h1 class="loginform__title">Login</h1>
			<input class="loginform__input" type="email" placeholder="Email" bind:value={email} />
			<input
				class="loginform__input"
				type="password"
				placeholder="Password"
				bind:value={password}
			/>
			<button class="loginform__button" on:click={handleLogin}> Login </button>
		{/if}

		<ToggleSwitch
			func={() => {
				regForm = !regForm;
			}}
		/>
	</div>
</div>

<style>
	.form {
		/* set this to center of the page */
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.loginform {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: top;
		padding: 20px;
		border-radius: 10px;
		background-color: var(--betme-yellow);
		color: white;
		width: 300px;
		height: auto;
	}

	.loginform__title {
		font-size: 30px;
		font-weight: bold;
		font-family: 'Monserat', sans-serif;
		margin-bottom: 20px;
	}

	.loginform__input {
		padding: 8px 16px;
		border-radius: 4px;
		border: none;
		margin-bottom: 10px;
	}

	.loginform__button {
		padding: 8px 16px;
		border-radius: 4px;
		border: none;
		margin-bottom: 10px;
		background-color: white;
		color: var(--betme-yellow);
		font-weight: bold;
		cursor: pointer;
	}
</style>
