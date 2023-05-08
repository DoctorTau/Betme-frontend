export class User {
	public username: string = "";
	public loggedIn: boolean = false;

	constructor(username: string, loggedIn: boolean) {
		this.username = username;
		this.loggedIn = loggedIn;
	}

	public ParseFromJWT(token: string): void {
		if (token == "") {
			this.username = "";
			this.loggedIn = false;
			return;
		}

		// Read claims from JWT
		const claims = token.split(".")[1];
		const claimsJson = atob(claims);
		const claimsObj = JSON.parse(claimsJson);

		this.username = claimsObj["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
		this.loggedIn = true;
	}
}
