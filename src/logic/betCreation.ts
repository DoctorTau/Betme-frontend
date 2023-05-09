import type { Bet } from "../models/Bet";
import type { Outcome } from "../models/Outcome";
import { GetAllBetsOutcomes } from "./getters";

function TrimQuotes(str: string): string {
	return str.replace(/"/g, "");
}

export async function StartBet(betId: number) {
	const response = await fetch(`http://localhost:5091/api/Bet/${betId}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TrimQuotes(localStorage.getItem("token")!),
			"Access-Control-Allow-Origin": "*"
		}
	});
	if (!response.ok) {
		throw new Error("Ошибка при старте пари");
	}
}

export async function CreateBet(name: string, description: string, closedAt: Date): Promise<Bet> {
	const response = await fetch("http://localhost:5091/api/Bet", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TrimQuotes(localStorage.getItem("token")!),
			"Access-Control-Allow-Origin": "*"
		},
		body: JSON.stringify({ name, description, closedAt })
	});

	if (!response.ok) {
		throw new Error("Ошибка при создании пари");
	}

	let createdBet: Bet = await response.json();
	return createdBet;
}

export async function CreateOutcome(name: string, betId: number): Promise<Outcome> {
	const response = await fetch(`http://localhost:5091/api/Bet/outcome`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + TrimQuotes(localStorage.getItem("token")!),
			"Access-Control-Allow-Origin": "*"
		},
		body: JSON.stringify({ name, betId })
	});

	if (!response.ok) {
		throw new Error("Ошибка при создании исхода");
	}

	return await response.json();
}

export async function CreateBetWithOutcomes(
	name: string,
	description: string,
	closedAt: Date,
	outcomesNames: string[]
): Promise<Bet> {
	const bet = await CreateBet(name, description, closedAt);
	for (let outcomeName of outcomesNames) {
		await CreateOutcome(outcomeName, bet.id);
	}

	// Add outcomes to bet
	bet.outcomes = await GetAllBetsOutcomes(bet.id);
	return bet;
}
