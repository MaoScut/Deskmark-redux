import uuid from 'uuid';

const STORAGE = window.localStorage;
const STORAGE_KEY = 'deskmark';

export function getAll() {
	return new Promise((resolve)=>{
		let result = STORAGE.getItem(STORAGE_KEY);
		try {
			resolve(result ? JSON.parse(result) : []);
		} catch (e) {
			resolve([]);
		}
	})
}

export function saveAll(results) {
	return new Promise((resolve) => {
		STORAGE.setItem(STORAGE_KEY, JSON.stringify(results));

		resolve();
	});
}

export function insertEntry(title, content) {
	let entry = {
		title,
		content,
		id: uuid(),
		time: new Date().getTime(),
	};
	return getAll()
	.then(results => [...results, entry])
	.then(saveAll)
	.then(() => entry);
}

export function deleteEntry(id) {
	return getAll()
	.then(results => results.filter(result => result.id !== id))
	.then(saveAll);
}

export function updateEntry(id, title, content) {
	let entry;
	return getAll()
	.then(results => results.map(result => result.id === id 
		? entry = {
		...result,
		title,
		content,
	} : result))
	.then(saveAll)
	.then(() => entry);
}