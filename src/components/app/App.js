import React from 'react';
import Form from '../form/Form';
import './App.css';
import AddPersonModal from '../add-person-modal/AddPersonModal';
import ErrorBoundry from '../error-boundry/ErrorBoundry';

const App = () => {
	return (
		<div className="app">
			<ErrorBoundry>
				<Form />
				<AddPersonModal />
			</ErrorBoundry>
		</div>
	);
};

export default App;
