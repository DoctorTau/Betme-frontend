<script lang="ts">
	import { login, register } from "../logic/login";
	import ToggleSwitch from "./toggleSwitch.svelte";

	let regForm = false;

	let name = "";
	let email = "";
	let password = "";

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

		<div class="toggler">
			<label> Вход </label>
			<ToggleSwitch
				func={() => {
					regForm = !regForm;
				}}
			/>
			<label> Регистрация </label>
		</div>
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
		font-family: "Monserat", sans-serif;
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
		color: var(--betme-black);
		font-weight: bold;
		cursor: pointer;
	}

	.toggler {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggler label {
		font-size: 20px;
		font-weight: bold;
		font-family: "Monserat", sans-serif;
		margin: 0 10px;
	}
</style>
