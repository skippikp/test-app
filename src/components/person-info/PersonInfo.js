import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import TestApi from '../../services/test-api';
import './PersonInfo.css';
import { connect } from 'react-redux';

const test = new TestApi();

const PersonInfo = ({
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

	const handleOpen = () => {
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
			<Card sx={{ minWidth: 275, maxWidth: 500, minHeight: 200 }}>
				<CardContent>
					<Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
						{name}
					</Typography>
					<Typography sx={{ fontSize: 20 }} color="green">
						{phone}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{email}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={handleOpen}>
						Редактировать
					</Button>
					<Button size="small" onClick={() => removePerson(bindId)}>
						Удалить
					</Button>
				</CardActions>
			</Card>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Добавить жильца</DialogTitle>
				<DialogContent>
					<TextField
						id="outlined-name"
						label="Name"
						onChange={handleChangeName}
						value={person.Name}
					/>
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						value={person.Email}
						onChange={handleChangeEmail}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={() => submitPerson(person)}>Изменить</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedFlat: state.selectedFlat,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { setClientList } = bindActionCreators(actions, dispatch);
	return {
		setClientList: (clientList) => setClientList(clientList),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonInfo);
