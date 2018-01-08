import {
	FormControl,
	FormGroup,
	Glyphicon,
	InputGroup,
} from 'react-bootstrap';
import { I18n } from 'aws-amplify';
import React from 'react';

const codeInput = (props) => (
	<FormGroup controlId="code">
		{props.noIcons ? (
			<FormControl
				onChange={(event) => props.updateState('code', event.target.value)}
				placeholder={I18n.get('Code')}
				type="code"
				value={props.code}
			/>
		) : (
			<InputGroup>
				<InputGroup.Addon>
					{props.icons.code || <Glyphicon glyph="lock" />}
				</InputGroup.Addon>
				<FormControl
					onChange={(event) => props.updateState('code', event.target.value)}
					placeholder={I18n.get('Code')}
					type="code"
					value={props.code}
				/>
			</InputGroup>
		)}
	</FormGroup>
);

export default codeInput;