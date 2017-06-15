import * as ActionType from '../actions';

const initialState = {
	selectedId: null,
	isEditing: false,
};

export default function editor(state = initialState, action) {
	switch (action.type) {
		case ActionType.SELECT_ENTRY:
			return Object.assign({}, state, { selectedId: action.id });
		case ActionType.UPDATE_SAVED_ENTRY:
			return Object.assign({}, state, { selectedId: action.id, isEditing: false });
		case ActionType.CREATE_NEW_ENTRY: 
			return Object.assign({}, state, {selectedId: null, isEditing: true});
		case ActionType.EDIT_ENTRY:
			return Object.assign({}, state, {selectedId: null, isEditing: true});
		// case ActionType.FINISH_DELETE_ENTRY:
		// 	return Object.assign({}, state, {selectedId: null, isEditing: false});
		case ActionType.CANCEL_EDIT:
			return Object.assing({}, state, {isEditing: false});
		default:
			return state;
	}
}