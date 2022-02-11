import {
	SET_STREETS,
	SET_HOUSES,
	SET_FLATS,
	SET_SELECTED_FLAT,
	SET_CLIENT_LIST,
} from '../constants/constants';

const setAllStreets = (streets) => {
	return { type: SET_STREETS, streets: streets };
};
const setHouses = (houses) => {
	return { type: SET_HOUSES, houses: houses };
};
const setFlats = (flats) => {
	return { type: SET_FLATS, flats: flats };
};
const setSelectedFlat = (flat) => {
	return { type: SET_SELECTED_FLAT, selectedFlat: flat };
};
const setClientList = (clientList) => {
	return { type: SET_CLIENT_LIST, clientList: clientList };
};

export { setAllStreets, setHouses, setFlats, setSelectedFlat, setClientList };
