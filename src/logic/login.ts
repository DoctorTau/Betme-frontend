import { goto } from "$app/navigation";
import { getJwt, getPrevPage, prevPage, tokenStore } from "../store";

export const LoginRedirection = () => {
	prevPage.set(window.location.href);
	console.log(window.location.href);
	const token = getJwt();

	if (token.length <= 2 && !window.location.href.includes("/login")) {
		console.log("Redirecting to login page");
		goto("/login");
	}
};

export const login = async (email: string, password: string) => {
	const response = await fetch("http://betme.pro/fetch/api/Auth/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: { "Content-Type": "application/json" }
	});

	if (response.ok) {
		console.log("Login successful");
		response.text().then((text) => {
			tokenStore.set(text);
		});
		try {
			// goto(getPrevPage().replace("http://localhost:5173", ""));
		} catch (error) {
			console.log(error);
		}
	} else {
		throw new Error("Ошибка при вводе email или пароля");
	}
};

export const register = async (name: string, email: string, password: string) => {
	const response = await fetch("http://betme.pro/fetch/api/Auth/register", {
		method: "POST",
		body: JSON.stringify({ name, email, password }),
		headers: { "Content-Type": "application/json" }
	});

	console.log("start reg");

	if (!response.ok) {
		console.log(response.body);
		throw new Error("Ошибка при регистрации");
	}
	console.log("reg success!");
};

export const logout = async () => {
	tokenStore.set("");
};
