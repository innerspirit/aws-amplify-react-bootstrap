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
	Row,
} from 'react-bootstrap';
import { Auth, I18n } from 'aws-amplify';
import React from 'react';

const header = (<h3>{I18n.get('Forgot Password')}</h3>);

export class ForgotPassword extends React.Component {
	state = {
		code: '',
		delivery: null,
		error: '',
		password: '',
		success: '',
		username: '',
	};

	onFormSubmit (event) {
		event.preventDefault();
		if (this.state.delivery) {
			const { code, password, username } = this.state;
			const { onStateChange } = this.props;

			Auth.forgotPasswordSubmit(username, code, password)
				.then(() => {
					onStateChange('signIn');
					this.setState({ delivery: null });
				})
				.catch((error) => {
					this.setState({ error: error.message });
				});
		} else {
			const { username } = this.state;

			Auth.forgotPassword(username)
				.then((data) => {
					this.setState({
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
		const { authState, onStateChange } = this.props;
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
									<FormGroup controlId="password" key="password">
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
									</FormGroup>,
									<FormGroup controlId="code" key="code">
										<InputGroup>
											<InputGroup.Addon>
												<Glyphicon glyph="envelope" />
											</InputGroup.Addon>
											<FormControl
												onChange={(event) => this.setState({ code: event.target.value })}
												placeholder={I18n.get('Code')}
												type="text"
												value={code}
											/>
										</InputGroup>
									</FormGroup>,
								]) : (
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