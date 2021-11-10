import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './reducers/reducer';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
