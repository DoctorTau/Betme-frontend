import { writable } from "svelte/store";

const createWritableStore = (key: string, startValue: string) => {
	const { subscribe, set } = writable(startValue);

	return {
		subscribe,
		set,
		useLocalStorage: () => {
			const json = localStorage.getItem(key);
			if (json) {
				set(JSON.parse(json));
			}

			subscribe((current) => {
				localStorage.setItem(key, JSON.stringify(current));
			});
		}
	};
};

export const tokenStore = createWritableStore("token", "");
export let prevPage = createWritableStore("prevPage", "");

export function getJwt() {
	const token = localStorage.getItem("token");
	if (token === null) {
		return "";
	}
	return token;
}

export function getPrevPage() {
	let page: string = "";
	prevPage.subscribe((value) => {
		page = value;
	});

	return page;
}
