import React, { useEffect } from 'react';
import TestApi from '../../services/test-api';
import { connect } from 'react-redux';
import Form from '../form/Form';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
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

const mapStateToProps = (state) => {
	return {
		streets: state.streets,
		houses: state.houses,
		flats: state.flats,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { setStreets } = bindActionCreators(actions, dispatch);
	return {
		setStreets: (streets) => setStreets(streets),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
