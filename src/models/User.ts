import type { UserRole } from "./UserRole";

export interface User {
	id: number;
	name: string;
	email: string;
	passwordHash: string;
	registrationDate: string;
	role: UserRole;
	numberOfWins: number;
}

