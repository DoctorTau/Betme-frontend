import { tokenStore } from "../store";

export const login = async (email: string, password: string) => {
	const response = await fetch("http://localhost:5091/api/Auth/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: { "Content-Type": "application/json" }
	});

	if (response.ok) {
		console.log("Login successful");
		response.text().then((text) => {
			tokenStore.set(text);
		});
	} else {
		throw new Error("Ошибка при вводе email или пароля");
	}
};

export const register = async (name: string, email: string, password: string) => {
	const response = await fetch("http://localhost:5091/api/Auth/register", {
		method: "POST",
		body: JSON.stringify({ name, email, password }),
		headers: { "Content-Type": "application/json" }
	});

	if (!response.ok) {
		console.log(response.body);
		throw new Error("Ошибка при регистрации");
	}
};

export const logout = async () => {
	tokenStore.set("");
};
