import { TrimQuotes } from "./betCreation";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function CheckIfThisUserVote(betId: number, userId: number): Promise<boolean> {
	const response = await fetch(`${API_URL}/api/Vote/${betId}/checkVote/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TrimQuotes(localStorage.getItem("token")!),
			"Access-Control-Allow-Origin": "*"
		}
	});
	if (!response.ok) {
		throw new Error("Invalid credentials");
	}
	return response.json();
}

export async function Vote(betId: number, userId: number, outcomeId: number) {
	const response = await fetch(`${API_URL}/api/Vote/vote`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TrimQuotes(localStorage.getItem("token")!),
			"Access-Control-Allow-Origin": "*"
		},
		body: JSON.stringify({ betId, userId, outcomeId })
	});

	if (!response.ok) {
		throw new Error("Ошибка при голосовании");
	}
}
