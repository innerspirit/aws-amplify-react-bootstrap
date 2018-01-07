/* eslint camelcase: 0 */

import {
	Button,
	FormGroup,
} from 'react-bootstrap';
import { I18n, JS } from 'aws-amplify';
import FacebookButton from './Provider/FacebookButton';
import GoogleButton from './Provider/GoogleButton';
import React from 'react';

export class FederatedButtons extends React.Component {
	facebook (facebook_app_id) {
		if (!facebook_app_id) {
			return null;
		}

		return (
			<FormGroup>
				<Button block bsStyle="default">
					{I18n.get('Sign in with Facebook')}
				</Button>
			</FormGroup>
		);
	}

	amazon (amazon_client_id) {
		if (!amazon_client_id) {
			return null;
		}

		return (
			<FormGroup>
				<Button block bsStyle="default">
					{I18n.get('Sign in with Amazon')}
				</Button>
			</FormGroup>
		);
	}

	render () {
		const { federated, authState, onStateChange } = this.props;

		if (JS.isEmpty(federated)) {
			return null;
		}

		if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) {
			return null;
		}

		const { google: google_client_id, facebook: facebook_app_id, amazon: amazon_client_id } = federated;

		return (
			<div>
				<FormGroup className="text-center">
					<em>- {I18n.get('or')} -</em>
				</FormGroup>
				<GoogleButton google_client_id={google_client_id} onStateChange={onStateChange} />
				<FacebookButton facebook_app_id={facebook_app_id} onStateChange={onStateChange} />
				{this.amazon(amazon_client_id)}
			</div>
		);
	}
}

export default FederatedButtons;