import React from 'react';
import { useField } from 'formik';
import { Input } from 'reactstrap';

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
