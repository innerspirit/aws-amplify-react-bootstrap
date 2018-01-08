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
import EmailInput from './Helpers/EmailInput';
import PasswordInput from './Helpers/PasswordInput';
import PhoneInput from './Helpers/PhoneInput';
import React from 'react';
import UsernameInput from './Helpers/UsernameInput';

const header = (<h3>{I18n.get('Sign Up')}</h3>);
const defaultState = {
	email: '',
	error: '',
	password: '',
	phone: '',
	username: '',
};

export class SignUp extends React.Component {
	state = { ...defaultState };

	onFormSubmit (event) {
		event.preventDefault();

		const { email, password, phone, username } = this.state;
		const { onStateChange } = this.props;

		Auth.signUp(username, password, email, phone)
			.then(() => {
				this.setState(defaultState);
				onStateChange('confirmSignUp', username);
			})
			.catch((error) => this.setState({ error: error.message }));
	}

	handleAlertDismiss () {
		this.setState({ error: '' });
	}

	render () {
		const { authState, onStateChange, noIcons, icons } = this.props;
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
								<EmailInput
									email={email}
									icons={icons}
									noIcons={noIcons}
									updateState={(name, value) => this.setState({ [name]: value })}
								/>
								<PhoneInput
									icons={icons}
									noIcons={noIcons}
									phone={phone}
									updateState={(name, value) => this.setState({ [name]: value })}
								/>
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
									<Button bsStyle="link" onClick={() => onStateChange('confirmSignUp')}>
										{I18n.get('Confirm a Code')}
									</Button>
								</Col>
								<Col className="text-right" sm={6}>
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

export default SignUp;