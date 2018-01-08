import {
	Alert,
	Button,
	Col,
	FormGroup,
	Grid,
	Panel,
	Row,
} from 'react-bootstrap';
import { Auth, I18n, JS } from 'aws-amplify';
import FederatedButtons from './FederatedButtons';
import PasswordInput from './Helpers/PasswordInput';
import React from 'react';
import UsernameInput from './Helpers/UsernameInput';

const header = (<h3>{I18n.get('Sign In')}</h3>);

const defaultState = {
	error: '',
	password: '',
	username: '',
};

export class SignIn extends React.Component {
	state = { ...defaultState }

	checkContact (user) {
		const { onStateChange } = this.props;

		Auth.verifiedContact(user)
			.then((data) => {
				this.setState(defaultState);
				if (JS.isEmpty(data.verified)) {
					const updatedUser = Object.assign(user, data);

					onStateChange('verifyContact', updatedUser);
				} else {
					onStateChange('signedIn', user);
				}
			});
	}

	onFormSubmit (event) {
		event.preventDefault();

		const { username, password } = this.state;
		const { onStateChange } = this.props;

		Auth.signIn(username, password)
			.then((user) => {
				const requireMFA = (user.Session !== null);

				if (requireMFA) {
					onStateChange('confirmSignIn', user);
				} else {
					this.checkContact(user);
				}
			})
			.catch((error) => this.setState({ error: error.message }));
	}

	handleAlertDismiss () {
		this.setState({ error: '' });
	}

	render () {
		const { authState, federated, onStateChange, noIcons, icons } = this.props;
		const { error, password, username } = this.state;

		if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) {
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
								<UsernameInput
									icons={icons}
									noIcons={noIcons}
									updateState={(name, value) => this.setState({ [name]: value })}
									username={username}
								/>
								<PasswordInput
									icons={icons}
									noIcons={noIcons}
									password={password}
									updateState={(name, value) => this.setState({ [name]: value })}
								/>
								<FormGroup>
									<Button
										block
										bsStyle="primary"
										disabled={!this.state.username || !this.state.password}
										type="submit"
									>
										{I18n.get('Sign In')}
									</Button>
								</FormGroup>
								<FederatedButtons
									authState={authState}
									federated={federated}
									onStateChange={onStateChange}
								/>
							</form>
							<hr />
							<Row>
								<Col sm={6}>
									<Button bsStyle="link" onClick={() => onStateChange('forgotPassword')}>
										{I18n.get('Forgot Password?')}
									</Button>
								</Col>
								<Col className="text-right" sm={6}>
									<Button bsStyle="link" onClick={() => onStateChange('signUp')}>
										{I18n.get('Sign Up')}
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

export default SignIn;