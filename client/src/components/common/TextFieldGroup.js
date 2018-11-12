import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disable,
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error,
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disable}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
			{info && <small className="form-text text-muted">{info}</small>}
		</div>
	)
}

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	error: PropTypes.string,
	info: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disable: PropTypes.string,
}

TextFieldGroup.defaultProps = {
	type: 'text',
}

export default TextFieldGroup
