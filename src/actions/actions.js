import {
	SET_STREETS,
	SET_HOUSES,
	SET_FLATS,
	SET_SELECTED_FLAT,
	SET_SELECTED_STREET,
	SET_CLIENT_LIST,
	SET_SELECTED_HOUSE,
} from '../constants/constants';

const setAllStreets = (streets) => {
	return { type: SET_STREETS, streets: streets };
};
const setAllHouses = (houses) => {
	return { type: SET_HOUSES, houses: houses };
};
const setAllFlats = (flats) => {
	return { type: SET_FLATS, flats: flats };
};
const setSelectedFlat = (flat) => {
	return { type: SET_SELECTED_FLAT, selectedFlat: flat };
};
const setSelectedStreet = (street) => {
	return { type: SET_SELECTED_STREET, selectedStreet: street };
};
const setClientList = (clientList) => {
	return { type: SET_CLIENT_LIST, clientList: clientList };
};
const setSelectedHouse = (house) => {
	return { type: SET_SELECTED_HOUSE, selectedHouse: house };
};

export {
	setAllStreets,
	setAllHouses,
	setAllFlats,
	setSelectedFlat,
	setSelectedStreet,
	setClientList,
	setSelectedHouse,
};
