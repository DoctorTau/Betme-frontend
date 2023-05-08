export class UserDto {
	public id: number = 0;
	public username: string = "";
	public loggedIn: boolean = false;

	constructor(id: number, username: string, loggedIn: boolean) {
		this.id = id;
		this.username = username;
		this.loggedIn = loggedIn;
	}

	public static async ParseFromJWT(token: string): Promise<UserDto> {
		if (token == "") {
			return new UserDto(0, "", false);
		}

		// Read claims from JWT
		const claims = token.split(".")[1];
		const claimsJson = atob(claims);
		const claimsObj = await JSON.parse(claimsJson);

		const id = claimsObj["sub"];
		const username = claimsObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

		return new UserDto(id, username, true);
	}
}
