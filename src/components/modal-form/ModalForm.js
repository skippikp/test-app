import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ModalForm = ({
	open,
	onClose,
	title,
	disabled,
	handleSubmit,
	submitButtonName,
	inputs,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{inputs.map((inputProps, id) => {
					return <TextField key={id} {...inputProps} />;
				})}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button disabled={disabled} onClick={handleSubmit}>
					{submitButtonName}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalForm;
