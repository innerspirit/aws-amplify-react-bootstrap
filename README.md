<h1 align="center">
	<br>
	<a href="https://github.com/Prefinem/aws-amplify-react-bootstrap">
		<svg xmlns="http://www.w3.org/2000/svg" id="svg" version="1.1" viewBox="0 0 100 100" x="0px" y="0px" width="200px"><style type="text/css">/* latin */
		@font-face {
			font-family: 'Allerta Stencil';
			font-style: normal;
			font-weight: 400;
			src: local('Allerta Stencil Regular'), local('AllertaStencil-Regular'), url(https://fonts.gstatic.com/s/allertastencil/v8/CdSZfRtHbQrBohqmzSdDYN4YkNTRySE62_JgwwLQLcQ.woff2) format('woff2');
			unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
		}
		</style><defs><clipPath id="circleClip"><circle cx="50" cy="50" r="50"/></clipPath><clipPath id="polygonClip"><polygon points=" 50,0 6.666666666666667,25 6.666666666666667,75 50,100 93.33333333333333,75 93.33333333333333,25 "/></clipPath></defs><polygon clip-path="url(#polygonClip)" fill="#003366" points=" 50,0 6.666666666666667,25 6.666666666666667,75 50,100 93.33333333333333,75 93.33333333333333,25 " stroke="#33e0ff" stroke-width="0"/><text fill="#33e0ff" font-family="Allerta Stencil" font-size="31" font-weight="600" text-anchor="middle" x="50" y="61"><tspan dy="0" x="50">AARB</tspan></text></svg>
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
