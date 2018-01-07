/* eslint camelcase: 0 */

import { I18n, JS } from 'aws-amplify';
import FacebookButton from './Provider/FacebookButton';
import { FormGroup } from 'react-bootstrap';
import GoogleButton from './Provider/GoogleButton';
import React from 'react';

export class FederatedButtons extends React.Component {
	render () {
		const { federated, authState, onStateChange } = this.props;

		if (JS.isEmpty(federated)) {
			return null;
		}

		if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) {
			return null;
		}

		const { google: google_client_id, facebook: facebook_app_id } = federated;

		return (
			<div>
				<FormGroup className="text-center">
					<em>- {I18n.get('or')} -</em>
				</FormGroup>
				<GoogleButton google_client_id={google_client_id} onStateChange={onStateChange} />
				<FacebookButton facebook_app_id={facebook_app_id} onStateChange={onStateChange} />
			</div>
		);
	}
}

export default FederatedButtons;