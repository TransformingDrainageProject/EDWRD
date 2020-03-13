import React from 'react';
import { Field, useField } from 'formik';
import { Input, FormGroup, Label } from 'reactstrap';

export const MyInputField = ({ ...props }) => {
  const [field] = useField(props);
  return <Input {...field} {...props} />;
};

export const MySelectField = ({ ...props }) => {
  const [field] = useField(props);
  const { options, ...updatedProps } = { ...props };
  return (
    <Input type="select" {...field} {...updatedProps}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Input>
  );
};

export const MyCustomField = ({ ...props }) => {
  return <Field {...props} />;
};

export const MyRadioField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const { label, name, onChange, options, required } = props;

  const isRequired = required === undefined || required ? 'required' : null;

  return (
    <FormGroup>
      <Label className={isRequired} for={name}>
        {label}
      </Label>
      <div>
        {options.map(option => (
          <div key={option.value}>
            <Input
              {...field}
              type="radio"
              id={option.value}
              checked={value === option.value}
              onBlur={() => setTouched(true)}
              onChange={e => {
                if (onChange) {
                  onChange(option.value);
                }
                setValue(option.value);
              }}
            />
            {option.label}
          </div>
        ))}
      </div>
    </FormGroup>
  );
};
