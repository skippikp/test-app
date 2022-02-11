import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { setClientList } from '../../actions/actions';
import TestApi from '../../services/test-api';
import { connect } from 'react-redux';

const test = new TestApi();

const AddPersonModal = ({ selectedFlat, setClientList }) => {
	const [open, setOpen] = useState(false);
	const [person, setPerson] = useState({
		Id: 0,
		Name: '',
		Phone: '',
		Email: '',
		BindId: 0,
	});

	const handleChangeName = (event) => {
		setPerson((state) => {
			return {
				...state,
				Name: event.target.value,
			};
		});
	};

	const handleChangePhone = (event) => {
		setPerson((state) => {
			return { ...state, Phone: event.target.value };
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

	const submitPerson = (person) => {
		test.postPerson(person).then((result) => {
			bindPerson(selectedFlat.id, result.data.id);
		});
		setPerson({
			Id: 0,
			Name: '',
			Phone: '',
			Email: '',
			BindId: 0,
		});
		setOpen(false);
	};

	const bindPerson = (adressId, personId) => {
		test.bindPerson(adressId, personId).then(() => {
			test.getAllTenants(selectedFlat.id).then((res) => {
				setClientList(res.data);
			});
		});
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPerson({
			Id: 0,
			Name: '',
			Phone: '',
			Email: '',
			BindId: 0,
		});
		test.getAllTenants(selectedFlat.id).then((res) => {
			setClientList(res.data);
		});
	};

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				sx={{ position: 'absolute', top: 30, right: 100 }}
				disabled={selectedFlat ? false : true}
			>
				Добавить жильца
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Добавить жильца</DialogTitle>
				<DialogContent>
					<TextField
						id="outlined-name"
						label="Ф.И.О"
						sx={{ m: 1, width: '25ch' }}
						onChange={handleChangeName}
						value={person.Name}
					/>
					<TextField
						id="outlined-basic"
						label="Телефон"
						type="tel"
						required
						variant="outlined"
						sx={{ m: 1, width: '25ch' }}
						value={person.Phone}
						onChange={handleChangePhone}
					/>
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						sx={{ m: 1, width: '25ch' }}
						value={person.Email}
						onChange={handleChangeEmail}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button disabled={!person.Phone} onClick={() => submitPerson(person)}>
						Добавить
					</Button>
				</DialogActions>
			</Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonModal);
