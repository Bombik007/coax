import { actionTypes } from './actionTypes';

const initialState = {
	userList: [],
	activeUser: {},
};

export const reducer = (state = initialState, action) => {
	const { SET_USER, SET_LIST } = actionTypes;
	switch (action.type) {
		case SET_LIST: {
			return { ...state, userList: action.userList };
		}
		case SET_USER: {
			return { ...state, activeUser: action.activeUser };
		}
		default: {
			return state;
		}
	}
};
