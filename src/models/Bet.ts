import type { BetStatus } from "./BetStatus";
import type { Outcome } from "./Outcome";
import type { User } from "./User";

export interface Bet {
	id: number;
	name: string;
	description: string;
	creatorId: number;
	createdAt: Date;
	closedAt: Date;
	status: BetStatus;
	winOutcomeId: number;

	outcomes: Outcome[];
	participants: User[];
}
