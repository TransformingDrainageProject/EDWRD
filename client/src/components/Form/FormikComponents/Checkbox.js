import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Checkbox = ({ field, type, label, showHelp }) => (
  <div className="form-check mt-2">
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

Checkbox.propTypes = {
  field: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  showHelp: PropTypes.bool,
};

export default Checkbox;
