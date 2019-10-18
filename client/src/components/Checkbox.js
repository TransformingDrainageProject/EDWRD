import React from 'react';

function Checkbox({ field, type, label }) {
  return (
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
}

export default Checkbox;
