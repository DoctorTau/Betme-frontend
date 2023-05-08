export class User {
	public username: string = "";
	public loggedIn: boolean = false;

	constructor(username: string, loggedIn: boolean) {
		this.username = username;
		this.loggedIn = loggedIn;
	}

	public static async ParseFromJWT(token: string): Promise<User> {
		if (token == "") {
			return new User("", false);
		}

		// Read claims from JWT
		const claims = token.split(".")[1];
		const claimsJson = atob(claims);
		const claimsObj = await JSON.parse(claimsJson);

		const username = claimsObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

        return new User(username, true);
	}
}
