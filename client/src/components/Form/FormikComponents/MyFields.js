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
    <Input {...field} {...updatedProps}>
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
  const { setValue } = helpers;

  return (
    <FormGroup>
      <Label for={props.name}>Crop Selection</Label>
      <div>
        {props.options.map(option => (
          <div key={option.value}>
            <Input
              {...field}
              type="radio"
              id={option.value}
              name={props.name}
              checked={value === option.value}
              onChange={e => {
                setValue(option.value);
                props.onChange(e);
              }}
            />
            {option.label}
          </div>
        ))}
      </div>
    </FormGroup>
  );
};
