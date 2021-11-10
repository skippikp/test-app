const setStreets = (streets) => {
	return { type: 'SET_STREETS', streets: streets };
};
const setHouses = (houses) => {
	return { type: 'SET_HOUSES', houses: houses };
};
const setFlats = (flats) => {
	return { type: 'SET_FLATS', flats: flats };
};
const setSelectedFlat = (flat) => {
	return { type: 'SET_SELECTED_FLAT', selectedFlat: flat };
};
const setClientList = (clientList) => {
	return { type: 'SET_CLIENT_LIST', clientList: clientList };
};

export { setStreets, setHouses, setFlats, setSelectedFlat, setClientList };
