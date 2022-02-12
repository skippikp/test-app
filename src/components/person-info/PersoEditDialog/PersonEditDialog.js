import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const PersonEditDialog = ({
	person,
	open,
	handleClose,
	handleChangeName,
	handleChangeEmail,
	handleSubmit,
}) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Изменить данные жильца</DialogTitle>
			<DialogContent>
				<TextField
					id="outlined-name"
					label="Имя"
					sx={{ m: 1, width: '25ch' }}
					onChange={handleChangeName}
					value={person.Name}
				/>
				<TextField
					id="outlined-basic"
					label="Email"
					sx={{ m: 1, width: '25ch' }}
					variant="outlined"
					value={person.Email}
					onChange={handleChangeEmail}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={() => handleSubmit(person)}>Изменить</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PersonEditDialog;
