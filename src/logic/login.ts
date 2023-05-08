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
		throw new Error("Invalid credentials");
	}
};

export const register = async (username: string, email: string, password: string) => {
	const response = await fetch("http://localhost:5091/api/Auth/register", {
		method: "POST",
		body: JSON.stringify({ username, email, password }),
		headers: { "Content-Type": "application/json" }
	});

	if (!response.ok) {
		throw new Error("Invalid credentials");
	}
};

export const logout = async () => {
	tokenStore.set("");
};
