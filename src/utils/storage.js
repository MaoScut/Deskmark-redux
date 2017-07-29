// this module used at actions, provide method to access or store data in localStorage
import uuid from 'uuid';

const STORAGE = window.localStorage;
const STORAGE_KEY = 'deskmark';

export function getAll() {
	return new Promise((resolve)=>{
		// this may be not correct, need async code but getItem is sync
		// but we can change it into mongodb later
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
	// we use map to change a certain id obj, others remain the same and than save all
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