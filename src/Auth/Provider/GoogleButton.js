/* eslint camelcase: 0, no-underscore-dangle: 0 */

import { Auth, I18n } from 'aws-amplify';
import {
	Button,
	FormGroup,
} from 'react-bootstrap';
import React from 'react';

export class GoogleButton extends React.Component {
	constructor (props) {
		super(props);

		this.federatedSignIn = this.federatedSignIn.bind(this);
		this.initClient = this.initClient.bind(this);

		this.state = { loaded: false };
	}

	componentDidMount () {
		this.createScript();
		this._isMounted = true;
	}

	componentWillUnmount () {
		this._isMounted = false;
	}

	initClient () {
		const { google_client_id } = this.props;
		const gaConfig = {
			client_id: google_client_id,
			scope: 'profile email openid',
		};

		window.gapi.load('client:auth2', () => {
			window.gapi.client.init(gaConfig).then(() => {
				if (this._isMounted) {
					this.setState({ loaded: true });
				}
			});
		});
	}

	handleSignInClick () {
		window.gapi.auth2.getAuthInstance().signIn()
			.then((googleUser) => this.federatedSignIn(googleUser));
	}

	createScript () {
		const script = document.createElement('script');

		script.src = 'https://apis.google.com/js/api.js';
		script.async = true;
		script.onload = this.initClient;
		document.body.appendChild(script);
	}

	federatedSignIn (signedIn) {
		if (!signedIn || !this.state.loaded) {
			return null;
		}

		const GoogleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
		const { id_token, expires_at } = GoogleUser.getAuthResponse();
		const profile = GoogleUser.getBasicProfile();
		const { onStateChange } = this.props;

		return Auth.federatedSignIn('google', {
			expires_at,
			token: id_token,
		}, {
			email: profile.getEmail(),
			name: profile.getName(),
		}).then(() => {
			if (onStateChange) {
				onStateChange('signedIn');
			}
		});

	}

	render () {
		const { google_client_id } = this.props;

		if (!google_client_id) {
			return null;
		}


		return (
			<FormGroup>
				<Button
					block
					bsStyle="default"
					onClick={() => this.handleSignInClick()}
				>
					{I18n.get('Sign in with Google')}
				</Button>
			</FormGroup>
		);
	}
}

export default GoogleButton;