import React, { useState } from 'react';
import { setClientList } from '../../actions/actions';
import TestApi from '../../services/test-api';
import { connect } from 'react-redux';
import PersonEditableCard from './PersonEditableCard/PersonEditableCard';
import PersonEditDialog from './PersoEditDialog/PersonEditDialog';

const test = new TestApi();

const PersonInfoСardContainer = ({
	name,
	phone,
	email,
	bindId,
	selectedFlat,
	setClientList,
}) => {
	const initialState = {
		Id: 0,
		Name: name,
		Phone: phone,
		Email: email,
		BindId: 0,
	};
	const [open, setOpen] = useState(false);
	const [person, setPerson] = useState(initialState);

	const handleChangeName = (event) => {
		setPerson((state) => {
			return {
				...state,
				Name: event.target.value,
			};
		});
	};

	const handleChangeEmail = (event) => {
		setPerson((state) => {
			return {
				...state,
				Email: event.target.value,
			};
		});
	};

	const handleClose = () => {
		setOpen(false);
		test.getAllTenants(selectedFlat.id).then((res) => {
			setClientList(res.data);
		});
	};

	const handleEdit = () => {
		setOpen(true);
		setPerson(initialState);
	};

	const submitPerson = (person) => {
		test.postPerson(person).then(() => {
			test.getAllTenants(selectedFlat.id).then((res) => {
				setClientList(res.data);
			});
		});
		setOpen(false);
	};

	const removePerson = (personId) => {
		test.removePerson(personId).then(() => {
			test.getAllTenants(selectedFlat.id).then((res) => {
				if (res.data !== '') {
					setClientList(res.data);
				} else setClientList([]);
			});
		});
	};

	return (
		<div className="personInfo">
			<PersonEditableCard
				name={name}
				phone={phone}
				email={email}
				handleEdit={handleEdit}
				handleRemove={() => removePerson(bindId)}
			/>
			<PersonEditDialog
				person={person}
				open={open}
				handleClose={handleClose}
				handleChangeName={handleChangeName}
				handleChangeEmail={handleChangeEmail}
				handleSubmit={submitPerson}
			/>
		</div>
	);
};

const mapStateToProps = ({ selectedFlat }) => {
	return {
		selectedFlat,
	};
};

const mapDispatchToProps = {
	setClientList,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonInfoСardContainer);
