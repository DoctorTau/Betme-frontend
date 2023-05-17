import type { Bet } from "../models/Bet";
import type { Outcome } from "../models/Outcome";
import type { User } from "../models/User";
import type { UserBet } from "../models/UserBet";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function GetIdFromJwt(jwt: string): Promise<number> {
	if (jwt == "") {
		throw new Error("Invalid credentials");
	}

	// Read claims from JWT
	const claims = jwt.split(".")[1];
	const claimsJson = atob(claims);
	const claimsObj = await JSON.parse(claimsJson);

	const id = claimsObj["sub"];
	return id;
}

export async function GetUserById(userId: number): Promise<User> {
	const response = await fetch(`${API_URL}/api/User/${userId}`);
	if (!response.ok) {
		throw new Error("Invalid credentials");
	}

	const user = await response.json();
	return user;
}

export async function GetAllUsersBets(userId: number): Promise<Bet[]> {
	const response = await fetch(`${API_URL}/api/User/${userId}/bets`);
	if (!response.ok) {
		throw new Error("Invalid credentials");
	}

	const bets = await response.json();
	return bets;
}

export async function GetBetById(betId: number): Promise<Bet> {
	const response = await fetch(`${API_URL}/api/Bet/${betId}`);
	if (!response.ok) {
		throw new Error("Invalid credentials");
	}

	const bet = await response.json();

	bet.outcomes = await GetAllBetsOutcomes(betId);
	bet.participants = await GetAllBetParticipants(betId);
	return bet;
}

export async function GetAllBetsOutcomes(betId: number): Promise<Outcome[]> {
	const response = await fetch(`${API_URL}/api/Bet/${betId}/outcomes`);
	if (!response.ok) {
		throw new Error("Invalid credentials");
	}

	const outcomes = await response.json();
	const allBetUsers = await GetAllBetParticipants(betId);
	for (let i = 0; i < outcomes.length; i++) {
		outcomes[i].users = [];
		for (let j = 0; j < allBetUsers.length; j++) {
			if (allBetUsers[j].outcomeId == outcomes[i].id) {
				outcomes[i].users.push(await GetUserById(allBetUsers[j].userId));
			}
		}
	}
	return outcomes;
}

export async function GetAllBetParticipants(betId: number): Promise<UserBet[]> {
	const response = await fetch(`${API_URL}/api/Bet/${betId}/participants`);
	if (!response.ok) {
		throw new Error("Invalid credentials");
	}

	const users = await response.json();
	return users;
}

export async function GetUserOutcome(betId: number, userId: number): Promise<string> {
	let betOutcomes = await GetAllBetsOutcomes(betId);
	let participants = await GetAllBetParticipants(betId);

	let userOutcome: string = "";
	for (let i = 0; i < participants.length; i++) {
		if (participants[i].userId == userId) {
			let outcome = betOutcomes.find((outcome) => outcome.id == participants[i].outcomeId);
			if (outcome == undefined) {
				throw new Error("Ошибка в получении исхода пользователя");
			}
			userOutcome = outcome.name;
		}
	}

	return userOutcome;
}
