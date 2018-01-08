import {
	FormControl,
	FormGroup,
	Glyphicon,
	InputGroup,
} from 'react-bootstrap';
import { I18n } from 'aws-amplify';
import React from 'react';

const passwordInput = (props) => (
	<FormGroup controlId="password">
		{props.noIcons ? (
			<FormControl
				onChange={(event) => props.updateState('password', event.target.value)}
				placeholder={I18n.get('Password')}
				type="password"
				value={props.password}
			/>
		) : (
			<InputGroup>
				<InputGroup.Addon>
					{props.icons.password || <Glyphicon glyph="lock" />}
				</InputGroup.Addon>
				<FormControl
					onChange={(event) => props.updateState('password', event.target.value)}
					placeholder={I18n.get('Password')}
					type="password"
					value={props.password}
				/>
			</InputGroup>
		)}
	</FormGroup>
);

export default passwordInput;