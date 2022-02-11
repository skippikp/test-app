import React from 'react';
import TestApi from '../../services/test-api';
import PersonInfo from '../person-info/PersonInfo';
import { Stack } from '@mui/material';
import SelectComponent from '../SelectComponent/SelectComponent';
import {
	setHouses,
	setFlats,
	setSelectedFlat,
	setClientList,
	setAllStreets,
} from '../../actions/actions';
import { useState } from 'react';
import { connect } from 'react-redux';
import './Form.css';

const test = new TestApi();

const Form = ({
	streets,
	houses,
	setHouses,
	flats,
	setFlats,
	selectedFlat,
	setSelectedFlat,
	clientList,
	setClientList,
	setAllStreets,
}) => {
	const [street, setStreet] = useState('');
	const [house, setHouse] = useState('');
	const [flat, setFlat] = useState('');

	const loadStreets = () => {
		test.getStreets().then((data) => {
			setAllStreets(data);
		});
	};

	const loadHouses = (streetName) => {
		const street = streets.find((item) => item.name === streetName);
		if (street) {
			test.getHouses(street.id).then((data) => {
				setHouses(data);
			});
		}
	};

	const showAllPeople = (adressId) => {
		if (adressId) {
			test.getAllTenants(adressId).then((res) => {
				if (res.status === 200) {
					setClientList(res.data);
				} else setClientList([]);
			});
		}
	};

	const loadFlats = (houseName) => {
		const selectedHouse = houses.find((item) => item.name === houseName);

		if (selectedHouse) {
			test.getFlats(selectedHouse.id).then((data) => {
				setFlats(data);
			});
		}
	};

	const selectHouse = (house) => {
		setHouse(house?.label);
		setSelectedFlat(null);
		setFlat('');
		setClientList([]);
	};

	const selectStreet = (street) => {
		setStreet(street?.label);
		setSelectedFlat(null);
		setFlat('');
		setHouse('');
		setClientList([]);
	};

	const selectFlat = (flat) => {
		const selectedFlat = flats?.find((item) => item.name === flat.label);
		setSelectedFlat(selectedFlat);
		setFlat(flat.label);
		showAllPeople(selectedFlat?.id);
		if (!selectedFlat) {
			setClientList([]);
		}
	};

	const streetsSearchOptions = streets.map((item) => {
		return { label: item.name, id: item.id };
	});

	const housesSearchOptions = houses.map((item) => {
		return { label: item.name, id: item.id };
	});

	const flatsSearchOptions = flats.map((item) => {
		return { label: item.name, typeName: item.typeName, id: item.id };
	});

	const streetsLoadingIndicator = streets.length === 0;
	const housesLoadingIndicator = houses.length === 0;
	const flatsLoadingIndicator = flats.length === 0;

	const flatsRenderOptions = (props, options) => {
		if (options.typeName === 'Квартира') {
			return (
				<li {...props} key={options.id}>
					{options.label}
				</li>
			);
		}
	};

	return (
		<div className="form">
			<Stack direction="row" spacing={2}>
				<SelectComponent
					onOpen={loadStreets}
					loading={streetsLoadingIndicator}
					options={streetsSearchOptions}
					onSelect={selectStreet}
					label={'Улица'}
				/>
				<SelectComponent
					onOpen={() => loadHouses(street)}
					loading={housesLoadingIndicator}
					options={housesSearchOptions}
					onSelect={selectHouse}
					label={'Дом'}
					value={house}
				/>
				<SelectComponent
					onOpen={() => loadFlats(house)}
					loading={flatsLoadingIndicator}
					options={flatsSearchOptions}
					onSelect={selectFlat}
					renderOptions={flatsRenderOptions}
					label={'Квартира'}
					value={flat}
				/>
			</Stack>
			{selectedFlat ? (
				<h4
					style={{ fontWeight: 500, fontSize: 20 }}
				>{`Жильцы ${street} ${house} квартира: ${selectedFlat.name} :`}</h4>
			) : null}
			<div className="personInfo">
				{clientList.map(({ name, phone, email, bindId }, id) => {
					return (
						<PersonInfo
							key={id}
							bindId={bindId}
							name={name}
							phone={phone}
							email={email}
						/>
					);
				})}
			</div>
		</div>
	);
};

const mapStateToProps = ({
	streets,
	houses,
	flats,
	selectedFlat,
	clientList,
}) => {
	return {
		streets,
		houses,
		flats,
		selectedFlat,
		clientList,
	};
};

const mapDispatchToProps = {
	setHouses,
	setFlats,
	setSelectedFlat,
	setClientList,
	setAllStreets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
