import type { BetStatus } from "./BetStatus";

export interface Bet {
	id: number;
	name: string;
	description: string;
	creatorId: number;
	createdAt: string;
	closedAt: string;
	status: BetStatus;
	winOutcomeId: number;
}
