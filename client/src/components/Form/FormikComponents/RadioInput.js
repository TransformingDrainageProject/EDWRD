import React from 'react';
import PropTypes from 'prop-types';

export const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => (
  <div>
    <input
      name={name}
      id={id}
      type="radio"
      value={id}
      checked={id === value}
      onChange={onChange}
      onBlur={onBlur}
      className="form-check-input"
      {...props}
    />
    <label className="form-check-label" htmlFor={id}>
      {label}
    </label>
  </div>
);

RadioButton.propTypes = {
  field: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export const RadioButtonGroup = ({ children }) => (
  <div className="form-check">{children}</div>
);
