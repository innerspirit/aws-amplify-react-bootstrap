import Auth from './components/Auth';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';

render(
	<BrowserRouter>
		<Auth />
	</BrowserRouter>,
	document.getElementById('app')
);
