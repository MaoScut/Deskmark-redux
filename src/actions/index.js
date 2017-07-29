import * as storage from '../utils/storage';

export const SELECT_ENTRY = 'SELECT_ENTRY';
export const CREATE_NEW_ENTRY = 'CREATE_NEW_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const UPDATE_ENTRY_LIST = 'UPDATE_ENTRY_LIST';
export const UPDATE_SAVED_ENTRY = 'UPDATE_SAVED_ENTRY';

/**
 * @param  {string} id selected article's id
 * @return {actionObj}
 */
export function selectEntry(id) {
	return {
		type: SELECT_ENTRY,
		id,
	};
}

/**
 * createNewEntry create a new article, show ItemEditor
 * @return {actionObj}
 */
export function createNewEntry() {
	return {
		type: CREATE_NEW_ENTRY,
	};
}

/**
 * cancelEdit close ItemEditor
 * @return {actionObj}
 */
export function cancelEdit() {
	return {
		type: CANCEL_EDIT,
	};
}

//updateEntryList is used at three timing.
//when after firstly render the deskmark component, fetch all items.
//when delete an item, refetch all items
//when save new entry (modify or create), refetch all items
//it can be reuse, so it is sense to separate.
function updateEntryList(items) {
	return {
		type: UPDATE_ENTRY_LIST,
		items,
	};
}

/**
 * deleteEntry delete an article
 * @param  {string} id the id of article to be deleted
 * @return {function} use dispatch when finish deleting article
 */
export function deleteEntry(id) {
	return dispatch => {
		storage.deleteEntry(id)
		.then(() => storage.getAll())
		.then(items => dispatch(updateEntryList(items)));
	};
}

/**
 * fetchEntryList get all data
 * @return {function} use dispatch when get all article objects
 */
export function fetchEntryList() {
	return dispatch => {
		storage.getAll()
		.then(items => dispatch(updateEntryList(items)))
	};
}

/**
 * updateSavedEntry show the article updated just
 * @param  {string} id the id of article to be updated
 * @return {actionObj}
 */
function updateSavedEntry(id) {
	debugger;
	return {
		type: UPDATE_SAVED_ENTRY,
		id,
	};
}

// decide create or update at this place not at the component, just pass on save action but not
// create action and update action
export function saveEntry(item) {
	const { title, content, id } = item;
	return dispatch => {
		if (id) {
			storage.updateEntry(id, title, content)
			.then(() => storage.getAll())
			.then(items => dispatch(updateEntryList(items)));
		} else {
			storage.insertEntry(title, content)
			.then(inserted => dispatch(updateSavedEntry(inserted.id)))
			.then(() => storage.getAll())
			.then(items => dispatch(updateEntryList(items)))
		}
	}
}