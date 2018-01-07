<div align="center">
	<h1>
		<br>
		<!-- http://prefinem.com/simple-icon-generator/#eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMDAzMzY2IiwiYm9yZGVyQ29sb3IiOiIjMzNlMGZmIiwiYm9yZGVyV2lkdGgiOiIwIiwiZXhwb3J0U2l6ZSI6NTEyLCJleHBvcnRpbmciOnRydWUsImZvbnRGYW1pbHkiOiJBbGxlcnRhIFN0ZW5jaWwiLCJmb250UG9zaXRpb24iOiI2MSIsImZvbnRTaXplIjoiMzEiLCJmb250V2VpZ2h0Ijo2MDAsImltYWdlIjoiIiwiaW1hZ2VNYXNrIjoiIiwiaW1hZ2VTaXplIjo1MCwic2hhcGUiOiJoZXhhZ29uMTIwIiwidGV4dCI6IkFBUkIifQ -->
		<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap">
			<img src="https://raw.githubusercontent.com/prefinem/aws-amplify-react-bootstrap/master/logo.png" alt="AWS Amplify React Bootstrap" width="200">
		</a>
		<br>
	</h1>
</div>

<div align="center">
	<h4 align="center">React Components for AWS Amplify using Bootstrap</h4>
</div>

<p align="center">
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap/stargazers">
		<img src="https://img.shields.io/github/stars/Prefinem/aws-amplify-react-bootstrap.svg" alt="Github Stars">
	</a>
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap/issues">
		<img src="https://img.shields.io/github/issues/Prefinem/aws-amplify-react-bootstrap.svg" alt="Github Issues">
	</a>
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap">
		<img src="https://img.shields.io/badge/version-0.0.2-green.svg" alt="Current Version">
	</a>
</p>

<br>

<br>

## Included Resources

Currently this just implements the authentication system.  As time progresses and I have more time to add features or need them for other projects, I will add them.  This is using the basic Bootstrap Theme but any theme that is build off of Bootstrap (and uses Bootstrap components) should work.

## Thanks To

Most of this is based off the work of [React Bootstrap](https://react-bootstrap.github.io/) and [AWS Amplify](https://github.com/aws/aws-amplify).  Without them, this wouldn't even exist.

## Installation

### NPM

	npm install aws-amplify-react-bootstrap --save

### Yarn

	yarn add aws-amplify-react-bootstrap

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
			<App />
		</Authenticator>
	);

	export default auth;

## Screenshots

### Basic Bootstrap Theme

<div align="center"><img src="https://raw.githubusercontent.com/prefinem/aws-amplify-react-bootstrap/master/screenshots/signIn.png" alt="Sign In" width="600"></div>
<div align="center"><img src="https://raw.githubusercontent.com/prefinem/aws-amplify-react-bootstrap/master/screenshots/signUp.png" alt="Sign Up" width="600"></div>
<div align="center"><img src="https://raw.githubusercontent.com/prefinem/aws-amplify-react-bootstrap/master/screenshots/forgotPassword.png" alt="Forgot Password" width="600"></div>
<div align="center"><img src="https://raw.githubusercontent.com/prefinem/aws-amplify-react-bootstrap/master/screenshots/confirmCode.png" alt="Confirm Code" width="600"></div>