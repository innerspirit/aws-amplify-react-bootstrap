import {
	FormControl,
	FormGroup,
	Glyphicon,
	InputGroup,
} from 'react-bootstrap';
import { I18n } from 'aws-amplify';
import React from 'react';

const emailInput = (props) => (
	<FormGroup controlId="email">
		{props.noIcons ? (
			<FormControl
				onChange={(event) => props.updateState('email', event.target.value)}
				placeholder={I18n.get('Email')}
				type="email"
				value={props.email}
			/>
		) : (
			<InputGroup>
				<InputGroup.Addon>
					{props.icons.email || <Glyphicon glyph="user" />}
				</InputGroup.Addon>
				<FormControl
					onChange={(event) => props.updateState('email', event.target.value)}
					placeholder={I18n.get('Email')}
					type="email"
					value={props.email}
				/>
			</InputGroup>
		)}
	</FormGroup>
);

export default emailInput;