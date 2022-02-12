import React from 'react';
import './ErrorBoundry.css';

class ErrorBoundry extends React.Component {
	state = {
		hasError: false,
	};

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error">
					<h2>Sorry</h2>
					<h3>something goes wrong</h3>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundry;
