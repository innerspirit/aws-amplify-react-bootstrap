import Amplify from 'aws-amplify';
import App from './App';
import { Authenticator } from 'aws-amplify-react';
import BlankTheme from './BlankTheme';
import ConfirmSignUp from './Auth/ConfirmSignUp';
import React from 'react';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import awsExports from './../aws-exports';

Amplify.configure(awsExports);

const federated = {
	facebook: '260166844513594',
	google: '630078833972-sn0sfsd3oiesleaspc5o35tt5st97tes.apps.googleusercontent.com'
};

const auth = () => (
	<Authenticator hideDefault={true} theme={BlankTheme}>
		<SignIn federated={federated} />
		<SignUp />
		<ConfirmSignUp />
		<App />
	</Authenticator>
);

export default auth;