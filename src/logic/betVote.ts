import { TrimQuotes } from "./betCreation";

export async function CheckIfThisUserVote(betId: number, userId: number): Promise<boolean> {
	const response = await fetch(`http://localhost:5091/api/Vote/${betId}/checkVote/${userId}`, {
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
	const response = await fetch(`http://localhost:5091/api/Vote/vote`, {
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
