import axios from 'axios';

export default class TestApi {
	_apiBase = 'https://dispex.org/api/vtest';

	getResource = async (url) => {
		const response = await axios.get(`${this._apiBase}${url}`);

		if (response.status >= 400) {
			throw new Error(`Could not fetch ${url}, received ${response.status}`);
		}

		return await response;
	};

	getStreets = async () => {
		const res = await this.getResource('/Request/streets');
		return res.data;
	};

	getHouses = async (id) => {
		const res = await this.getResource(`/Request/houses/${id}`);
		return res.data;
	};

	getFlats = async (id) => {
		const res = await this.getResource(`/Request/house_flats/${id}`);
		return res.data;
	};

	postPerson = async (person) => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'text/json', accept: 'text/plain' },
			data: person,
			url: 'https://dispex.org/api/vtest/HousingStock/client',
		};
		const res = await axios(options);
		return res;
	};

	getAllTenants = async (adressId) => {
		const res = await axios.get(
			'https://dispex.org/api/vtest/HousingStock/clients?addressId=' + adressId
		);
		return res;
	};

	bindPerson = async (adressId, personId) => {
		const options = {
			method: 'PUT',
			headers: { 'Content-Type': 'text/json', accept: '*/*' },
			data: { AddressId: adressId, ClientId: personId },
			url: 'https://dispex.org/api/vtest/HousingStock/bind_client',
		};
		const res = await axios(options);
		return res;
	};

	removePerson = async (bindId) => {
		const res = await axios.delete(
			`https://dispex.org/api/vtest/HousingStock/bind_client/${bindId}`
		);
		return res;
	};
}
