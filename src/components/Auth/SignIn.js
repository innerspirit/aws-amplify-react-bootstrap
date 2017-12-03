import {
	Alert,
	Button,
	Col,
	FormControl,
	FormGroup,
	Glyphicon,
	Grid,
	InputGroup,
	Panel,
	Row
} from 'react-bootstrap';
import { Auth, I18n, JS } from 'aws-amplify';
import React from 'react';

const header = (<h3>{I18n.get('Sign In')}</h3>);

class SignIn extends React.Component {
	state = {
		error: '',
		password: '',
		username: ''
	};

	checkContact (user) {
		Auth.verifiedContact(user)
			.then((data) => {
				if (JS.isEmpty(data.verified)) {
					const updatedUser = Object.assign(user, data);

					this.props.onStateChange('verifyContact', updatedUser);
				} else {
					this.props.onStateChange('signedIn', user);
				}
			});
	}

	onFormSubmit (event) {
		event.preventDefault();

		const { username, password } = this.state;

		Auth.signIn(username, password)
			.then((user) => {
				const requireMFA = (user.Session !== null);

				if (requireMFA) {
					this.props.onStateChange('confirmSignIn', user);
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
		const { authState, federated } = this.props;
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
								<FormGroup controlId="username">
									<InputGroup>
										<InputGroup.Addon>
											<Glyphicon glyph="user" />
										</InputGroup.Addon>
										<FormControl
											onChange={(event) => this.setState({ username: event.target.value })}
											placeholder={I18n.get('Username')}
											type="text"
											value={username}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup controlId="password">
									<InputGroup>
										<InputGroup.Addon>
											<Glyphicon glyph="lock" />
										</InputGroup.Addon>
										<FormControl
											onChange={(event) => this.setState({ password: event.target.value })}
											placeholder={I18n.get('Password')}
											type="password"
											value={password}
										/>
									</InputGroup>
								</FormGroup>
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
								{federated && (
									<FormGroup className="text-center">
										<em>- {I18n.get('or')} -</em>
									</FormGroup>
								)}
								{federated && federated.facebook && (
									<FormGroup>
										<Button block bsStyle="default">
											{I18n.get('Sign in with Facebook')}
										</Button>
									</FormGroup>
								)}
								{federated && federated.google && (
									<FormGroup>
										<Button block bsStyle="default">
											{I18n.get('Sign in with Google')}
										</Button>
									</FormGroup>
								)}
							</form>
							<hr />
							<Row>
								<Col sm={6}>
									<Button bsStyle="link" onClick={() => this.props.onStateChange('forgotPassword')}>
										{I18n.get('Forgot Password?')}
									</Button>
								</Col>
								<Col className="text-right" sm={6}>
									<Button bsStyle="link" onClick={() => this.props.onStateChange('signUp')}>
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