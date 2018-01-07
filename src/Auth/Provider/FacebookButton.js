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

		this.fbAsyncInit = this.fbAsyncInit.bind(this);
		this.initClient = this.initClient.bind(this);
		this.federatedSignIn = this.federatedSignIn.bind(this);

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
		if (this._isMounted) {
			this.setState({ loaded: true });
		}
	}

	handleSignInClick () {
		if (this.state.loaded) {
			window.FB.getLoginStatus((response) => {
				if (response.status === 'connected') {
					this.federatedSignIn(response.authResponse);
				} else {
					window.FB.login((response) => {
						if (!response || !response.authResponse) {
							return;
						}
						this.federatedSignIn(response.authResponse);
					}, { scope: 'public_profile,email' });
				}
			});
		}
	}

	fbAsyncInit () {
		const { facebook_app_id } = this.props;

		window.FB.init({
			appId: facebook_app_id,
			cookie: true,
			version: 'v2.11',
			xfbml: true,
		});
	}

	createScript () {
		window.fbAsyncInit = this.fbAsyncInit;

		const script = document.createElement('script');

		script.src = 'https://connect.facebook.net/en_US/sdk.js';
		script.async = true;
		script.onload = this.initClient;
		document.body.appendChild(script);
	}

	federatedSignIn (response) {
		const { onStateChange } = this.props;
		const { accessToken, expiresIn } = response;
		const date = new Date();
		const expires_at = (expiresIn * 1000) + date.getTime();

		if (!accessToken) {
			return;
		}

		window.FB.api('/me', (response) => {
			const user = { name: response.name };

			Auth.federatedSignIn('facebook', {
				expires_at,
				token: accessToken,
			}, user).then(() => {
				if (onStateChange) {
					onStateChange('signedIn');
				}
			});
		});
	}

	render () {
		const { facebook_app_id } = this.props;

		if (!facebook_app_id) {
			return null;
		}


		return (
			<FormGroup>
				<Button
					block
					bsStyle="default"
					onClick={() => this.handleSignInClick()}
				>
					{I18n.get('Sign in with Facebook')}
				</Button>
			</FormGroup>
		);
	}
}

export default GoogleButton;