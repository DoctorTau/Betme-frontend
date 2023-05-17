import { CreateOutcome, TrimQuotes } from "./betCreation";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function JoinBet(betId: number, userId: number, outcomeId: number) {
	if (betId < 1 || userId < 1 || outcomeId < 1) {
		throw new Error("Неверные параметры");
	}
	const response = await fetch(`${API_URL}/api/Bet/${betId}/join`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TrimQuotes(localStorage.getItem("token")!),
			"Access-Control-Allow-Origin": "*"
		},
		body: JSON.stringify({ betId, userId, outcomeId })
	});

	if (!response.ok) {
		throw new Error("Ошибка при присоединении к пари");
	}
}

export async function JoinBetWithNewOutcome(betId: number, userId: number, newOutcomeName: string) {
	let newOutcome = await CreateOutcome(newOutcomeName, betId);
	await JoinBet(betId, userId, newOutcome.id);
}
