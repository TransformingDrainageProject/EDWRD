import React from 'react';

const Checkbox = ({ field, type, label }) => (
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
  </div>
);

export default Checkbox;
