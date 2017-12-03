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
import { Auth, I18n } from 'aws-amplify';
import React from 'react';

const header = (<h3>{I18n.get('Sign Up')}</h3>);

class SignIn extends React.Component {
	state = {
		email: '',
		error: '',
		password: '',
		phone: '',
		username: ''
	};

	onFormSubmit (event) {
		event.preventDefault();

		const { email, password, phone, username } = this.state;

		Auth.signUp(username, password, email, phone)
			.then(() => this.onStateChange('confirmSignUp', username))
			.catch((error) => this.setState({ error: error.message }));
	}

	handleAlertDismiss () {
		this.setState({ error: '' });
	}

	render () {
		const { authState } = this.props;
		const { email, error, password, phone, username } = this.state;

		if (authState !== 'signUp') {
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
								<FormGroup controlId="email">
									<InputGroup>
										<InputGroup.Addon>
											<Glyphicon glyph="envelope" />
										</InputGroup.Addon>
										<FormControl
											onChange={(event) => this.setState({ email: event.target.value })}
											placeholder={I18n.get('Email')}
											type="email"
											value={email}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup controlId="phone">
									<InputGroup>
										<InputGroup.Addon>
											<Glyphicon glyph="phone" />
										</InputGroup.Addon>
										<FormControl
											onChange={(event) => this.setState({ phone: event.target.value })}
											placeholder={I18n.get('Phone')}
											type="phone"
											value={phone}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Button
										block
										bsStyle="primary"
										type="submit"
									>
										{I18n.get('Sign Up')}
									</Button>
								</FormGroup>
							</form>
							<hr />
							<Row>
								<Col sm={6}>
									<Button bsStyle="link" onClick={() => this.props.onStateChange('confirmSignUp')}>
										{I18n.get('Confirm a Code')}
									</Button>
								</Col>
								<Col className="text-right" sm={6}>
									<Button bsStyle="link" onClick={() => this.props.onStateChange('signIn')}>
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

export default SignIn;