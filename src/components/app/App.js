import React, { useEffect } from 'react';
import TestApi from '../../services/test-api';
import { connect } from 'react-redux';
import Form from '../form/Form';
import { setStreets } from '../../actions/actions';
import './App.css';
import AddPersonModal from '../add-person-modal/AddPersonModal';

const test = new TestApi();

const App = ({ setStreets }) => {
	useEffect(() => {
		updateStreet();
	}, []);

	const updateStreet = () => {
		test.getStreets().then((data) => {
			setStreets(data);
		});
	};

	return (
		<div className="app">
			<Form />
			<AddPersonModal />
		</div>
	);
};

const mapStateToProps = ({ streets, houses, flats }) => {
	return {
		streets,
		houses,
		flats,
	};
};

const mapDispatchToProps = {
	setStreets,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
