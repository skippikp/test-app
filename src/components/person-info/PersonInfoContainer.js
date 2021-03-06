import React, { useState } from 'react';
import { setClientList } from '../../actions/actions';
import test from '../../services/test-api';
import { connect } from 'react-redux';
import PersonEditableCard from './person-editable-card/PersonEditableCard';
import ModalForm from '../modal-form/ModalForm';

const PersonInfo–°ardContainer = ({ person, selectedFlat, setClientList }) => {
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

	const handleChangePhone = (event) => {
		setEditedPerson((state) => {
			return {
				...state,
				phone: event.target.value,
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

	const submitPerson = () => {
		test.postPerson(editedPerson).then((res) => {
			if (res.data.id !== editedPerson.id) {
				test.bindPerson(selectedFlat.id, res.data.id).then(() => {
					removePerson(person.bindId);
				});
			}
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

	const validPhone = (phone) => {
		// eslint-disable-next-line no-useless-escape
		const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/;
		return phoneRegExp.test(phone);
	};

	const editPersonInputsProps = [
		{
			id: 'outlined-name',
			label: '–ė–ľ—Ź',
			sx: { m: 1, width: '25ch' },
			onChange: handleChangeName,
			value: editedPerson.name,
		},
		{
			id: 'outlined-basic',
			label: '–Ę–Ķ–Ľ–Ķ—Ą–ĺ–Ĺ',
			type: 'tel',
			required: true,
			variant: 'outlined',
			sx: { m: 1, width: '25ch' },
			error: !validPhone(editedPerson.phone),
			value: editedPerson.phone,
			onChange: handleChangePhone,
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
				title={'–ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć –ī–į–Ĺ–Ĺ—č–Ķ –∂–ł–Ľ—Ć—Ü–į'}
				disabled={!editedPerson.phone || !validPhone(editedPerson.phone)}
				submitButtonName={'–ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć'}
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
)(PersonInfo–°ardContainer);
