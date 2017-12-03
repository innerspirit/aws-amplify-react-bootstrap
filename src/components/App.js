import Content from './Content';
import Nav from './Nav';
import React from 'react';

const app = (props) => (props.authState === 'signedIn' ? [
	<Nav key="nav" />,
	<Content key="content" />
] : null);

export default app;