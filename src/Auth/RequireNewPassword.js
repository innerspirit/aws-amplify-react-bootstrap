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

const header = (<h3>{I18n.get('Confirm Sign In')}</h3>);

export class RequireNewPassword extends React.Component {
	state = {
		error: '',
		password: '',
	};

	onFormSubmit (event) {
		event.preventDefault();

		const { authData } = this.props;
		const { password } = this.state;
		const { requiredAttributes } = authData.challengeParam;

		Auth.completeNewPassword(authData, password, requiredAttributes)
			.then(() => this.changeState('signedIn'))
			.catch((error) => {
				this.setState({ error: error.message });
			});
	}

	handleAlertDismiss () {
		this.setState({ error: '' });
	}

	render () {
		const { authState, hide, onStateChange } = this.props;
		const { error, password } = this.state;

		if (authState !== 'requireNewPassword') {
			return null;
		}
		if (hide && hide.includes(RequireNewPassword)) {
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
								<FormGroup controlId="password">
									<InputGroup>
										<InputGroup.Addon>
											<Glyphicon glyph="lock" />
										</InputGroup.Addon>
										<FormControl
											onChange={(event) => this.setState({ password: event.target.value })}
											placeholder={I18n.get('Password')}
											type="text"
											value={password}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Button
										block
										bsStyle="primary"
										type="submit"
									>
										{I18n.get('Confirm')}
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

export default RequireNewPassword;