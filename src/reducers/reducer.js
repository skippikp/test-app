import {
	SET_STREETS,
	SET_HOUSES,
	SET_FLATS,
	SET_SELECTED_FLAT,
	SET_SELECTED_STREET,
	SET_CLIENT_LIST,
	SET_SELECTED_HOUSE,
} from '../constants/constants';

const initialState = {
	streets: [],
	houses: [],
	flats: [],
	selectedFlat: '',
	clientList: [],
	selectedStreet: '',
	selectedHouse: '',
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
		case SET_SELECTED_HOUSE:
			return { ...state, selectedHouse: action.selectedHouse };
		case SET_CLIENT_LIST:
			return { ...state, clientList: action.clientList };
		case SET_SELECTED_STREET:
			return { ...state, selectedStreet: action.selectedStreet };
		default:
			return state;
	}
};

export default reducer;
