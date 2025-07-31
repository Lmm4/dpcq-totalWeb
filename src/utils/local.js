
export function localSet(key,info) {
	return localStorage.setItem(key,JSON.stringify(info));
}
export function localGet(key) {
	return JSON.parse(localStorage.getItem(key));
}
export function localRemove(key) {
	return localStorage.removeItem(key);
}

export function sessSet(key,info) {
	return sessionStorage.setItem(key,JSON.stringify(info));
}
export function sessGet(key) {
	return JSON.parse(sessionStorage.getItem(key));
}
export function sessRemove(key) {
	return sessionStorage.removeItem(key);
}