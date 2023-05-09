export async function StartBet(betId: number) {
	const response = await fetch(`http://localhost:5091/api/Bet/${betId}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token") || ""
		}
	});
	if (!response.ok) {
		throw new Error("Ошибка при старте пари");
	}
}
