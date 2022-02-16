import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { setClientList } from '../../actions/actions';
import test from '../../services/test-api';
import { connect } from 'react-redux';
import { Tooltip } from '@mui/material';
import './AddPersonModal.css';
import ModalForm from '../modal-form/ModalForm';

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
	const [numberIsUsed, setNumberIsUsed] = useState(false);

	const handleChangeName = (event) => {
		setPerson((state) => {
			return {
				...state,
				Name: event.target.value,
			};
		});
	};

	const handleChangePhone = (event) => {
		test.getPersonByPhone(event.target.value).then((res) => {
			if (res.id) {
				setNumberIsUsed(true);
				return;
			}
			setNumberIsUsed(false);
		});
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

	const bindPerson = (adressId, personId) => {
		test
			.bindPerson(adressId, personId)
			.then(() => {
				test.getAllTenants(selectedFlat.id).then((res) => {
					if (res.data !== '' && res.status === 200) {
						setClientList(res.data);
					} else setClientList([]);
				});
			})
			.catch((err) => console.log('Не удается загрузить данные ' + err));
	};

	const submitPerson = (person) => {
		test
			.postPerson(person)
			.then((result) => {
				bindPerson(selectedFlat.id, result.data.id);
			})
			.catch((err) => console.log('Не удается загрузить данные ' + err));
		setPerson({
			Id: 0,
			Name: '',
			Phone: '',
			Email: '',
			BindId: 0,
		});
		setNumberIsUsed(false);
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNumberIsUsed(false);
		setPerson({
			Id: 0,
			Name: '',
			Phone: '',
			Email: '',
			BindId: 0,
		});
		test
			.getAllTenants(selectedFlat.id)
			.then((res) => {
				if (res.data !== '' && res.status === 200) {
					setClientList(res.data);
				} else setClientList([]);
			})
			.catch((err) => console.log('Не удается загрузить данные ' + err));
	};

	const validPhone = (phone) => {
		// eslint-disable-next-line no-useless-escape
		const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/;
		return phoneRegExp.test(phone);
	};

	const error = !validPhone(person.Phone) || numberIsUsed;

	const addPersonModalInputsProps = [
		{
			id: 'outlined-name',
			label: 'Ф.И.О',
			sx: { m: 1, width: '25ch' },
			onChange: handleChangeName,
			value: person.Name,
		},
		{
			id: 'outlined-basic',
			label: 'Телефон',
			type: 'tel',
			required: true,
			variant: 'outlined',
			sx: { m: 1, width: '25ch' },
			error: error,
			helperText: numberIsUsed
				? 'Пользователь с данным номером уже существует.'
				: error
				? 'Некорректный номер'
				: false,
			value: person.Phone,
			onChange: handleChangePhone,
		},
		{
			id: 'outlined-basic',
			label: 'Email',
			variant: 'outlined',
			sx: { m: 1, width: '25ch' },
			value: person.Email,
			onChange: handleChangeEmail,
		},
	];

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
			<ModalForm
				open={open}
				onClose={handleClose}
				title={'Добавить жильца'}
				disabled={!person.Phone || error}
				handleSubmit={() => submitPerson(person)}
				submitButtonName={'Добавить'}
				inputs={addPersonModalInputsProps}
			/>
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
