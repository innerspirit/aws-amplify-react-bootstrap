<h1 align="center">
	<br>
	<!-- http://prefinem.com/simple-icon-generator/#eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMDAzMzY2IiwiYm9yZGVyQ29sb3IiOiIjMzNlMGZmIiwiYm9yZGVyV2lkdGgiOiIwIiwiZXhwb3J0U2l6ZSI6NTEyLCJleHBvcnRpbmciOnRydWUsImZvbnRGYW1pbHkiOiJBbGxlcnRhIFN0ZW5jaWwiLCJmb250UG9zaXRpb24iOiI2MSIsImZvbnRTaXplIjoiMzEiLCJmb250V2VpZ2h0Ijo2MDAsImltYWdlIjoiIiwiaW1hZ2VNYXNrIjoiIiwiaW1hZ2VTaXplIjo1MCwic2hhcGUiOiJoZXhhZ29uMTIwIiwidGV4dCI6IkFBUkIifQ -->
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap">
		<img src="https://raw.githubusercontent.com/prefinem/aws-amplify-react-bootstrap/master/logo.png" alt="AWS Amplify React Bootstrap" width="200">
	</a>
	<br>
</h1>

<h4 align="center">React Components for AWS Amplify using Bootstrap</h4>

<p align="center">
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap/stargazers">
		<img src="https://img.shields.io/github/stars/Prefinem/aws-amplify-react-bootstrap.svg" alt="Github Stars">
	</a>
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap/issues">
		<img src="https://img.shields.io/github/issues/Prefinem/aws-amplify-react-bootstrap.svg" alt="Github Issues">
	</a>
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap">
		<img src="https://img.shields.io/badge/version-1.0.1-green.svg" alt="Current Version">
	</a>
</p>

<br>

<br>

## Usage

	import {
		ConfirmSignIn,
		ConfirmSignUp,
		ForgotPassword,
		Greetings,
		RequireNewPassword,
		SignIn,
		SignUp,
		Theme,
		VerifyContact,
	} from 'aws-amplify-react-bootstrap';
	import Amplify from 'aws-amplify';
	import App from './App';
	import { Authenticator } from 'aws-amplify-react';
	import React from 'react';
	import awsExports from './../aws-exports';

	Amplify.configure(awsExports);

	const federated = {
		facebook: facebook_app_id,
		google: google_client_id,
	};

	const auth = () => (
		<Authenticator hideDefault={true} theme={Theme}>
			<Greetings />
			<SignIn federated={federated} />
			<ConfirmSignIn />
			<RequireNewPassword />
			<SignUp />
			<ConfirmSignUp />
			<ForgotPassword />
			<VerifyContact />
			<App />
		</Authenticator>
	);

	export default auth;
