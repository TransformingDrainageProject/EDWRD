import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Checkbox = ({ field, type, label, showHelp }) => (
  <div className="form-check">
    <input
      className="form-check-input"
      {...field}
      type={type}
      id={field.name}
    />
    <label className="form-check-label" htmlFor={field.name}>
      {label}
    </label>
    {showHelp ? (
      <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '5px' }} />
    ) : null}
  </div>
);

export default Checkbox;
