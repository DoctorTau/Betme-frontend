import type { User } from "./User";

export interface Outcome {
	id: number;
	name: string;
	betId: number;
	selections: number;
	votes: number;

	users: User[];
}
