import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PersonEditableCard = ({
	name,
	phone,
	email,
	handleEdit,
	handleRemove,
}) => {
	return (
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
				<Button size="small" onClick={handleEdit}>
					Редактировать
				</Button>
				<Button size="small" onClick={handleRemove}>
					Удалить
				</Button>
			</CardActions>
		</Card>
	);
};

export default PersonEditableCard;
