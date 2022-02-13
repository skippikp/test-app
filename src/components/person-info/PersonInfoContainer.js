import React, { useState } from 'react';
import { setClientList } from '../../actions/actions';
import test from '../../services/test-api';
import { connect } from 'react-redux';
import PersonEditableCard from './person-editable-card/PersonEditableCard';
import ModalForm from '../modal-form/ModalForm';

const PersonInfoСardContainer = ({ person, selectedFlat, setClientList }) => {
	const { name, phone, email, bindId } = person;
	const [open, setOpen] = useState(false);
	const [editedPerson, setEditedPerson] = useState(person);

	const handleChangeName = (event) => {
		setEditedPerson((state) => {
			return {
				...state,
				name: event.target.value,
			};
		});
	};

	const handleChangeEmail = (event) => {
		setEditedPerson((state) => {
			return {
				...state,
				email: event.target.value,
			};
		});
	};

	const handleClose = () => {
		setOpen(false);
		test.getAllTenants(selectedFlat.id).then((res) => {
			if (res.data !== '' && res.status === 200) {
				setClientList(res.data);
			} else setClientList([]);
		});
	};

	const handleEdit = () => {
		setOpen(true);
		setEditedPerson(person);
	};

	const submitPerson = (person) => {
		test.postPerson(person).then(() => {
			test.getAllTenants(selectedFlat.id).then((res) => {
				if (res.data !== '' && res.status === 200) {
					setClientList(res.data);
				} else setClientList([]);
			});
		});
		setOpen(false);
	};

	const removePerson = (personId) => {
		test.removePerson(personId).then(() => {
			test.getAllTenants(selectedFlat.id).then((res) => {
				if (res.data !== '' && res.status === 200) {
					setClientList(res.data);
				} else setClientList([]);
			});
		});
	};

	const editPersonInputsProps = [
		{
			id: 'outlined-name',
			label: 'Имя',
			sx: { m: 1, width: '25ch' },
			onChange: handleChangeName,
			value: editedPerson.name,
		},
		{
			id: 'outlined-basic',
			label: 'Email',
			sx: { m: 1, width: '25ch' },
			variant: 'outlined',
			value: editedPerson.email,
			onChange: handleChangeEmail,
		},
	];

	return (
		<div className="personInfo">
			<PersonEditableCard
				name={name}
				phone={phone}
				email={email}
				handleEdit={handleEdit}
				handleRemove={() => removePerson(bindId)}
			/>
			<ModalForm
				open={open}
				onClose={handleClose}
				title={'Изменить данные жильца'}
				disabled={false}
				submitButtonName={'Изменить'}
				handleSubmit={() => submitPerson(editedPerson)}
				inputs={editPersonInputsProps}
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
