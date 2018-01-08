import {
	Alert,
	Button,
	Col,
	FormGroup,
	Grid,
	Panel,
	Row,
} from 'react-bootstrap';
import { Auth, I18n } from 'aws-amplify';
import CodeInput from './Helpers/CodeInput';
import React from 'react';
import UsernameInput from './Helpers/UsernameInput';

const header = (<h3>{I18n.get('Confirm Code')}</h3>);
const defaultState = {
	code: '',
	error: '',
	message: '',
	username: '',
};

export class ConfirmSignUp extends React.Component {
	state = { ...defaultState };

	usernameFromAuthData () {
		const { authData } = this.props;
		let username = '';

		if (!authData) {
			return username;
		}

		if (typeof authData === 'object') {
			username = authData.user ? authData.user.username : authData.username;
		} else {
			username = authData;
		}

		return username;
	}

	onFormSubmit (event) {
		event.preventDefault();

		const { code, username } = this.state;
		const { onStateChange } = this.props;

		Auth.confirmSignUp(username, code)
			.then(() => {
				this.setState(defaultState);
				onStateChange('signedUp');
			})
			.catch((error) => this.setState({ error }));
	}

	resendCode (event) {
		event.preventDefault();

		const { username } = this.state;

		Auth.resendSignUp(username)
			.then(() => this.setState({ message: 'Resent Code' }))
			.catch((error) => this.setState({ error: error.message }));
	}

	handleAlertDismiss () {
		this.setState({
			error: '',
			message: '',
		});
	}

	render () {
		const { authState, onStateChange, noIcons, icons } = this.props;
		const { code, error, message, username } = this.state;

		if (authState !== 'confirmSignUp') {
			return null;
		}

		return (
			<Grid>
				<Row style={{ marginTop: '3em' }}>
					<Col
						lg={4}
						lgOffset={4}
						md={4}
						mdOffset={4}
						sm={6}
						smOffset={3}
					>
						<Panel header={header}>
							<form onSubmit={(event) => this.onFormSubmit(event)}>
								{error && (
									<Alert bsStyle="danger" onDismiss={() => this.handleAlertDismiss()}>
										{I18n.get(error)}
									</Alert>
								)}
								{message && (
									<Alert bsStyle="info" onDismiss={() => this.handleAlertDismiss()}>
										{I18n.get(message)}
									</Alert>
								)}
								<UsernameInput
									icons={icons}
									noIcons={noIcons}
									updateState={(name, value) => this.setState({ [name]: value })}
									username={username}
								/>
								<CodeInput
									code={code}
									icons={icons}
									noIcons={noIcons}
									updateState={(name, value) => this.setState({ [name]: value })}
								/>
								<FormGroup>
									<Button
										block
										bsStyle="primary"
										type="submit"
									>
										{I18n.get('Confirm')}
									</Button>
								</FormGroup>
								<FormGroup className="text-center">
									<em>- {I18n.get('or')} -</em>
								</FormGroup>
								<FormGroup>
									<Button
										block
										bsStyle="default"
										onClick={(event) => this.resendCode(event)}
										type="submit"
									>
										{I18n.get('Resend Code')}
									</Button>
								</FormGroup>
							</form>
							<hr />
							<Row>
								<Col className="text-right" sm={12}>
									<Button bsStyle="link" onClick={() => onStateChange('signIn')}>
										{I18n.get('Sign In')}
									</Button>
								</Col>
							</Row>
						</Panel>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default ConfirmSignUp;