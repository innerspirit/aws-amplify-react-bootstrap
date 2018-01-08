import {
	FormControl,
	FormGroup,
	Glyphicon,
	InputGroup,
} from 'react-bootstrap';
import { I18n } from 'aws-amplify';
import React from 'react';

const usernameInput = (props) => (
	<FormGroup controlId="username">
		{props.noIcons ? (
			<FormControl
				onChange={(event) => props.updateState('username', event.target.value)}
				placeholder={I18n.get('Username')}
				type="text"
				value={props.username}
			/>
		) : (
			<InputGroup>
				<InputGroup.Addon>
					{props.icons.username || <Glyphicon glyph="user" />}
				</InputGroup.Addon>
				<FormControl
					onChange={(event) => props.updateState('username', event.target.value)}
					placeholder={I18n.get('Username')}
					type="text"
					value={props.username}
				/>
			</InputGroup>
		)}
	</FormGroup>
);

export default usernameInput;