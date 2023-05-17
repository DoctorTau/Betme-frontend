import { goto } from "$app/navigation";
import { getJwt, getPrevPage, prevPage, tokenStore } from "../store";

const apiURL = import.meta.env.VITE_API_URL as string;

const SavePrevPage = () => {
	prevPage.useLocalStorage();
	if (!window.location.href.includes("/login")) {
		prevPage.set(location.pathname);
		console.log("Saved prev page: " + getPrevPage());
	}
};

export const LoginRedirection = () => {
	SavePrevPage();
	const token = getJwt();

	if (token.length <= 2 && !window.location.href.includes("/login")) {
		console.log("Redirecting to login page");
		goto("/login");
	}
};

export const login = async (email: string, password: string) => {
	const response = await fetch(`${apiURL}/api/Auth/login`, {
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
			console.log("Redirecting to prev page: " + getPrevPage());
			goto("/");
		} catch (error) {
			console.log(error);
		}
	} else {
		console.log(response.body);
		throw new Error("Ошибка при вводе email или пароля");
	}
};

export const register = async (name: string, email: string, password: string) => {
	const response = await fetch(`${apiURL}/api/Auth/register`, {
		method: "POST",
		body: JSON.stringify({ name, email, password }),
		headers: { "Content-Type": "application/json" }
	});

	console.log("start reg");

	if (!response.ok) {
		console.log(response.body);
		throw new Error("Ошибка при регистрации");
	}
};

export const logout = async () => {
	tokenStore.set("");
};
