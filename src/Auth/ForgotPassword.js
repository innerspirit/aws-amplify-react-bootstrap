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
import PasswordInput from './Helpers/PasswordInput';
import React from 'react';
import UsernameInput from './Helpers/UsernameInput';

const header = (<h3>{I18n.get('Forgot Password')}</h3>);
const defaultState = {
	code: '',
	delivery: null,
	error: '',
	password: '',
	success: '',
	username: '',
};

export class ForgotPassword extends React.Component {
	state = { ...defaultState };

	onFormSubmit (event) {
		event.preventDefault();
		if (this.state.delivery) {
			const { code, password, username } = this.state;
			const { onStateChange } = this.props;

			Auth.forgotPasswordSubmit(username, code, password)
				.then(() => {
					onStateChange('signIn');
					this.setState(defaultState);
				})
				.catch((error) => {
					this.setState({ error: error.message });
				});
		} else {
			const { username } = this.state;

			Auth.forgotPassword(username)
				.then((data) => {
					this.setState({
						...defaultState,
						delivery: data.CodeDeliveryDetails,
						success: 'Please get your email for verification code',
					});
				})
				.catch((error) => {
					this.setState({ error: error.message });
				});
		}

	}

	handleAlertDismiss () {
		this.setState({
			error: '',
			success: '',
		});
	}

	render () {
		const { authState, onStateChange, noIcons, icons } = this.props;
		const { error, code, password, success, username } = this.state;

		if (authState !== 'forgotPassword') {
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
								{success && (
									<Alert bsStyle="success" onDismiss={() => this.handleAlertDismiss()}>
										{I18n.get(success)}
									</Alert>
								)}
								{this.state.delivery ? ([
									<PasswordInput
										icons={icons}
										key="password"
										noIcons={noIcons}
										password={password}
										updateState={(name, value) => this.setState({ [name]: value })}
									/>,
									<CodeInput
										code={code}
										icons={icons}
										key="code"
										noIcons={noIcons}
										updateState={(name, value) => this.setState({ [name]: value })}
									/>,
								]) : (
									<UsernameInput
										icons={icons}
										noIcons={noIcons}
										updateState={(name, value) => this.setState({ [name]: value })}
										username={username}
									/>
								)}
								<FormGroup>
									<Button
										block
										bsStyle="primary"
										type="submit"
									>
										{I18n.get('Submit')}
									</Button>
								</FormGroup>
							</form>
							<hr />
							<Row>
								<Col className="text-right" sm={6} smOffset={6}>
									<Button bsStyle="link" onClick={() => onStateChange('signIn')}>
										{I18n.get('Back to Sign In')}
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

export default ForgotPassword;