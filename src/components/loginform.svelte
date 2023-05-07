<!-- Create a simple login form in svelte kit  -->

<!-- Path: src/components/loginform.svelte -->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { login } from '../logic/login';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';

	let handleLogin = async () => {
		const res = await login(email, password);
		if (res) {
			dispatch('login');
			goto('/');
		}
	};

	// let handleRegister = async () => {
	// 	const res = await login(email, password, true);
	// 	if (res) {
	// 		dispatch('login');
	// 		goto('/');
	// 	}
	// };
</script>

<div class="loginform">
	<div class="loginform__container">
		<h1 class="loginform__title">Login</h1>
		<input class="loginform__input" type="email" placeholder="Email" bind:value={email} />
		<input class="loginform__input" type="password" placeholder="Password" bind:value={password} />
		<button class="loginform__button" on:click={handleLogin}> Login </button>
		<!-- <button class="loginform__button" on:click={handleRegister}> Register </button> -->
	</div>
</div>

<style>
	.loginform {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.loginform__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		border-radius: 10px;
		background-color: #f7ce5b;
		color: white;
		width: 300px;
		height: 300px;
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
		color: #f7ce5b;
		font-weight: bold;
		cursor: pointer;
	}
</style>
