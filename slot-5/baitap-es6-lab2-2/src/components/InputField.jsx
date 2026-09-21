import Form from 'react-bootstrap/Form';

const InputField = ({ id, label, helpText, ...inputProps }) => (
	<Form.Group controlId={id} className="mb-3">
		<Form.Label>
			{label}
			{inputProps.required && <span className="text-danger"> *</span>}
		</Form.Label>
		<Form.Control {...inputProps} />
		{helpText && <Form.Text>{helpText}</Form.Text>}
	</Form.Group>
);

export default InputField;