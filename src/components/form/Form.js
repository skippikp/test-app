import React from 'react';
import TestApi from '../../services/test-api';
import PersonInfo from '../person-info/PersonInfo';
import { Stack, TextField, Autocomplete } from '@mui/material';
import {
	setHouses,
	setFlats,
	setSelectedFlat,
	setClientList,
} from '../../actions/actions';
import { useState, useEffect } from 'react';
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
}) => {
	const [street, setStreet] = useState('');
	const [house, setHouse] = useState('');

	useEffect(() => {
		findHouses(street);
		findFlats(house);
	}, [street, house]);

	const findHouses = (streetName) => {
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

	const findFlats = (houseName) => {
		const house = houses.find((item) => item.name === houseName);
		if (house) {
			test.getFlats(house.id).then((data) => {
				setFlats(data);
			});
		}
	};

	const selectHouse = (event) => {
		setHouse(event.target.value);
	};

	const selectStreet = (event) => {
		setStreet(event.target.value);
	};

	const selectFlat = (event) => {
		const flat = flats?.find((item) => item.name === event.target.value);
		setSelectedFlat(flat);
		showAllPeople(flat?.id);
		if (!flat) {
			setClientList([]);
		}
	};

	const searchOption = streets.map((item) => {
		return { label: item.name, id: item.id };
	});

	const loading = streets.length === 0;

	return (
		<div className="form">
			<Stack direction="row" spacing={2}>
				<Autocomplete
					disablePortal
					id="combo-box"
					isOptionEqualToValue={(option, value) => option.label === value.label}
					loading={loading}
					options={searchOption}
					sx={{ width: 300 }}
					renderOption={(props, options) => {
						return (
							<li {...props} key={options.id}>
								{options.label}
							</li>
						);
					}}
					renderInput={(params) => (
						<TextField {...params} onSelect={selectStreet} label="Улица" />
					)}
				/>
				<Autocomplete
					disablePortal
					id="combo-box"
					isOptionEqualToValue={(option, value) => option.label === value.label}
					options={houses.map((item) => {
						return { label: item.name, id: item.id };
					})}
					sx={{ width: 300 }}
					renderOption={(props, options) => {
						return (
							<li {...props} key={options.id}>
								{options.label}
							</li>
						);
					}}
					renderInput={(params) => (
						<TextField {...params} onSelect={selectHouse} label="Дом" />
					)}
				/>
				<Autocomplete
					disablePortal
					id="combo-box"
					isOptionEqualToValue={(option, value) => option.label === value.label}
					options={flats.map((item) => {
						return { label: item.name, typeName: item.typeName, id: item.id };
					})}
					sx={{ width: 300 }}
					renderOption={(props, options) => {
						if (options.typeName === 'Квартира') {
							return (
								<li {...props} key={options.id}>
									{options.label}
								</li>
							);
						}
					}}
					renderInput={(params) => (
						<TextField {...params} onSelect={selectFlat} label="Квартира" />
					)}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
