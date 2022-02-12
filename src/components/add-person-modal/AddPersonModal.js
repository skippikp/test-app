import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { setClientList } from '../../actions/actions';
import test from '../../services/test-api';
import { connect } from 'react-redux';
import { Tooltip } from '@mui/material';
import './AddPersonModal.css';

const AddPersonModal = ({
	selectedFlat,
	setClientList,
	selectedStreet,
	selectedHouse,
}) => {
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
				if (res.status !== 200) {
					setClientList([]);
					return;
				}
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

	const validPhone = (phone) => {
		const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/;
		return phoneRegExp.test(phone);
	};

	return (
		<div className="person_modal">
			{selectedStreet !== 'Федюнинского' || !selectedHouse.includes('30') ? (
				<Tooltip title="Вы можете добавлять жильцов только для улицы Федюнинского 30, для всех корпусов">
					<span>
						<Button variant="outlined" onClick={handleClickOpen} disabled>
							Добавить жильца
						</Button>
					</span>
				</Tooltip>
			) : (
				<Button
					variant="outlined"
					onClick={handleClickOpen}
					disabled={!selectedFlat}
				>
					Добавить жильца
				</Button>
			)}
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
						pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
						variant="outlined"
						sx={{ m: 1, width: '25ch' }}
						error={!validPhone(person.Phone)}
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
					<Button
						disabled={!person.Phone || !validPhone(person.Phone)}
						onClick={() => submitPerson(person)}
					>
						Добавить
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapStateToProps = ({ selectedFlat, selectedStreet, selectedHouse }) => {
	return {
		selectedFlat,
		selectedStreet,
		selectedHouse,
	};
};

const mapDispatchToProps = {
	setClientList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonModal);
