import { createStore } from 'redux';
import {
	SET_STREETS,
	SET_HOUSES,
	SET_FLATS,
	SET_SELECTED_FLAT,
	SET_CLIENT_LIST,
} from '../constants/constants';

const initialState = {
	streets: [],
	houses: [],
	flats: [],
	selectedFlat: null,
	clientList: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_STREETS:
			return { ...state, streets: action.streets };
		case SET_HOUSES:
			return { ...state, houses: action.houses };
		case SET_FLATS:
			return { ...state, flats: action.flats };
		case SET_SELECTED_FLAT:
			return { ...state, selectedFlat: action.selectedFlat };
		case SET_CLIENT_LIST:
			return { ...state, clientList: action.clientList };
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
