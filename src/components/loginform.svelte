<script lang="ts">
	import { login, register } from "../logic/login";
	import ToggleSwitch from "./toggleSwitch.svelte";

	let regForm = false;

	let name = "";
	let email = "";
	let password = "";

	let hasError: boolean = false;
	let errorMessage: string = "";

	function setError(message: string) {
		hasError = true;
		errorMessage = message;
	}

	let handleLogin = async () => {
		try {
			await login(email, password);
		} catch (e) {
			setError("Неверный email или пароль");
			console.log(e);
		}
	};

	let handleRegister = async () => {
		try {
			await register(name, email, password);
		} catch (e) {
			setError("Неверный email или пароль или пользователь с таким email уже существует");
			console.log(e);
		}
	};
</script>

<div class="form">
	<div class="loginform">
		{#if regForm}
			<h1 class="loginform__title">Регистрация</h1>
			<input
				class="loginform__input"
				type="text"
				placeholder="Имя пользователя"
				bind:value={name}
			/>
			<input class="loginform__input" type="email" placeholder="Email" bind:value={email} />
			<input class="loginform__input" type="password" placeholder="Пароль" bind:value={password} />
			<button class="loginform__button" on:click={handleRegister}>Зарегестрироваться</button>
		{:else}
			<h1 class="loginform__title">Вход</h1>
			<input class="loginform__input" type="email" placeholder="Email" bind:value={email} />
			<input class="loginform__input" type="password" placeholder="Пароль" bind:value={password} />
			<button class="loginform__button" on:click={handleLogin}>Войти</button>
		{/if}

		{#if hasError}
			<p style="color: red;">{errorMessage}</p>
		{/if}

		<div class="toggler">
			Вход
			<ToggleSwitch
				func={() => {
					regForm = !regForm;
				}}
			/>
			Регистрация
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
		color: var(--betme-black);
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
		background-color: var(--betme-black);
		color: var(--betme-yellow);
		font-weight: bold;
		cursor: pointer;
	}

	.toggler {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		font-family: "Monserat", sans-serif;
		font-weight: bold;
		color: var(--betme-black);
		gap: 10px;
	}

	.loginform > p {
		color: red;
		font-family: "Monserat", sans-serif;
	}
</style>
