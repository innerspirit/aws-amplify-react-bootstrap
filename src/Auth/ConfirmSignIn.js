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

const header = (<h3>{I18n.get('Confirm Sign In')}</h3>);
const defaultState = {
	code: '',
	error: '',
};

export class ConfirmSignIn extends React.Component {
	state = { ...defaultState };

	onFormSubmit (event) {
		event.preventDefault();

		const { authData } = this.props;
		const { code } = this.state;

		Auth.confirmSignIn(authData, code)
			.then(() => {
				this.setState(defaultState);
				this.changeState('signedIn');
			})
			.catch((error) => {
				this.setState({ error: error.message });
			});
	}

	handleAlertDismiss () {
		this.setState({ error: '' });
	}

	render () {
		const { authState, onStateChange, noIcons, icons } = this.props;
		const { error, code } = this.state;

		if (authState !== 'confirmSignIn') {
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

export default ConfirmSignIn;