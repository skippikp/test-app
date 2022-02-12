import React from 'react';
import TestApi from '../../services/test-api';
import PersonInfo from '../person-info/PersonInfo';
import { Stack } from '@mui/material';
import SelectComponent from '../SelectComponent/SelectComponent';
import {
	setAllHouses,
	setAllFlats,
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
	setAllHouses,
	flats,
	setAllFlats,
	selectedFlat,
	setSelectedFlat,
	clientList,
	setClientList,
	setAllStreets,
}) => {
	const [street, setStreet] = useState('');
	const [house, setHouse] = useState('');
	const [flatNumber, setFlatNumber] = useState('');

	const loadStreets = () => {
		test.getStreets().then((data) => {
			setAllStreets(data);
		});
	};

	const loadHouses = (street) => {
		if (street) {
			test.getHouses(street.id).then((data) => {
				setAllHouses(data);
			});
		}
	};

	const loadFlats = (house) => {
		if (house) {
			test.getFlats(house.id).then((data) => {
				setAllFlats(data);
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

	const selectStreet = (street) => {
		if (street === null) {
			setStreet('');
		} else {
			setStreet(street.label);
		}
		loadHouses(street);
		setSelectedFlat('');
		setFlatNumber('');
		setHouse('');
		setClientList([]);
	};

	const selectHouse = (house) => {
		if (house === null) {
			setHouse('');
		} else {
			setHouse(house.label);
		}
		loadFlats(house);
		setSelectedFlat('');
		setFlatNumber('');
		setClientList([]);
	};

	const selectFlat = (flat) => {
		if (flat === null) {
			setSelectedFlat('');
			setFlatNumber('');
			setClientList([]);
			return;
		}
		setSelectedFlat(flat);
		setFlatNumber(flat.label);
		showAllPeople(flat.id);
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
					onChange={selectStreet}
					label={'Улица'}
				/>
				<SelectComponent
					loading={housesLoadingIndicator}
					options={housesSearchOptions}
					onChange={selectHouse}
					label={'Дом'}
					value={house}
				/>
				<SelectComponent
					loading={flatsLoadingIndicator}
					options={flatsSearchOptions}
					onChange={selectFlat}
					renderOptions={flatsRenderOptions}
					label={'Квартира'}
					value={flatNumber}
				/>
			</Stack>
			{selectedFlat ? (
				<h4
					style={{ fontWeight: 500, fontSize: 20 }}
				>{`Жильцы ${street} ${house} квартира: ${selectedFlat.label} :`}</h4>
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
	setAllHouses,
	setAllFlats,
	setSelectedFlat,
	setClientList,
	setAllStreets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
