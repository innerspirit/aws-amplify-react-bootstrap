import {
	FormControl,
	FormGroup,
	Glyphicon,
	InputGroup,
} from 'react-bootstrap';
import { I18n } from 'aws-amplify';
import React from 'react';

const phoneInput = (props) => (
	<FormGroup controlId="phone">
		{props.noIcons ? (
			<FormControl
				onChange={(event) => props.updateState('phone', event.target.value)}
				placeholder={I18n.get('Phone')}
				type="phone"
				value={props.phone}
			/>
		) : (
			<InputGroup>
				<InputGroup.Addon>
					{props.icons.phone || <Glyphicon glyph="phone" />}
				</InputGroup.Addon>
				<FormControl
					onChange={(event) => props.updateState('phone', event.target.value)}
					placeholder={I18n.get('Phone')}
					type="phone"
					value={props.phone}
				/>
			</InputGroup>
		)}
	</FormGroup>
);

export default phoneInput;