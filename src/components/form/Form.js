import React from 'react';
import test from '../../services/test-api';
import { Stack } from '@mui/material';
import SelectComponent from '../select-component/SelectComponent';
import {
	setAllHouses,
	setAllFlats,
	setSelectedFlat,
	setClientList,
	setAllStreets,
	setSelectedStreet,
	setSelectedHouse,
} from '../../actions/actions';
import { useState } from 'react';
import { connect } from 'react-redux';
import './Form.css';
import PersonInfoCardContainer from '../person-info/PersonInfoContainer';

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
	setSelectedStreet,
	selectedStreet,
	setSelectedHouse,
	selectedHouse,
}) => {
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
				if (res.status !== 200) {
					setClientList([]);
					return;
				}
				setClientList(res.data);
			});
		}
	};

	const selectStreet = (street) => {
		if (street === null) {
			setSelectedStreet('');
		} else {
			setSelectedStreet(street.label);
		}
		loadHouses(street);
		setSelectedFlat('');
		setFlatNumber('');
		setSelectedHouse('');
		setClientList([]);
	};

	const selectHouse = (house) => {
		if (house === null) {
			setSelectedHouse('');
		} else {
			setSelectedHouse(house.label);
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
					value={selectedHouse}
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
				<React.Fragment>
					<h4
						style={{ fontWeight: 500, fontSize: 20 }}
					>{`Жильцы ${selectedStreet} ${selectedHouse} квартира: ${selectedFlat.label} :`}</h4>
					<div className="personInfo">
						{clientList.map(({ name, phone, email, bindId }, id) => {
							return (
								<PersonInfoCardContainer
									key={id}
									bindId={bindId}
									name={name}
									phone={phone}
									email={email}
								/>
							);
						})}
					</div>
				</React.Fragment>
			) : null}
		</div>
	);
};

const mapStateToProps = ({
	streets,
	houses,
	flats,
	selectedFlat,
	selectedStreet,
	clientList,
	selectedHouse,
}) => {
	return {
		streets,
		houses,
		flats,
		selectedFlat,
		clientList,
		selectedStreet,
		selectedHouse,
	};
};

const mapDispatchToProps = {
	setAllHouses,
	setAllFlats,
	setSelectedFlat,
	setClientList,
	setAllStreets,
	setSelectedStreet,
	setSelectedHouse,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
