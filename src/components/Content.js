import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';
import React from 'react';
import { Route } from 'react-router';

const app = () => (
	<div className="container">
		<Route component={Home} path="/" />
		<Route component={About} path="/about" />
		<Route component={Contact} path="/contact" />
	</div>
);

export default app;