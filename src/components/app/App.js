import React from 'react';
import Form from '../form/Form';
import './App.css';
import AddPersonModal from '../add-person-modal/AddPersonModal';

const App = () => {
	return (
		<div className="app">
			<Form />
			<AddPersonModal />
		</div>
	);
};

export default App;
