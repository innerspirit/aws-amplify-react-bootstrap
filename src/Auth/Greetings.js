import { Auth, I18n } from 'aws-amplify';
import { Alert } from 'react-bootstrap';
import React from 'react';

export class Greetings extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			alertVisible: true,
			authData: this.props.authData,
			authState: this.props.authState,
		};
	}

	componentDidMount () {
		this._isMounted = true; // eslint-disable-line no-underscore-dangle
		this.checkUser();
	}

	componentWillUnmount () {
		this._isMounted = false; // eslint-disable-line no-underscore-dangle
	}

	checkUser () {
		const that = this;
		const { authState } = this.state;

		return Auth.currentAuthenticatedUser()
			.then((user) => {
				if (!that._isMounted) { // eslint-disable-line no-underscore-dangle
					return;
				}
				if (authState !== 'signedIn') {
					this.setState({
						alertVisible: true,
						authData: user,
						authState: 'signedIn',
					});
				}
			})
			.catch(() => {
				if (!that._isMounted) { // eslint-disable-line no-underscore-dangle
					return;
				}
				if (!authState || authState === 'signedIn') {
					this.setState({ authState: 'signIn' });
				}
			});
	}

	inGreeting (name) {
		return `${I18n.get('Hello')} ${name}`;
	}

	handleAlertDismiss () {
		this.setState({ alertVisible: false });
	}

	handleAlertShow () {
		this.setState({ alertVisible: true });
	}

	render () {
		const { hide } = this.props;
		const { alertVisible, authData, authState } = this.state;
		const greeting = this.props.inGreeting || this.inGreeting;
		const name = authData ? (authData.name || authData.username) : '';
		const message = (typeof greeting === 'function') ? greeting(name) : greeting;

		if (hide && hide.includes(Greetings)) {
			return null;
		}

		if (authState !== 'signedIn' || !message || !alertVisible) {
			return null;
		}

		return (
			<Alert bsStyle="success" onDismiss={() => this.handleAlertDismiss()}>
				{message}
			</Alert>
		);
	}
}

export default Greetings;