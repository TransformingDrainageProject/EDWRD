import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const { name, msg } = props;

  if (msg) {
    return (
      <Alert className="mt-2" color="danger">
        {msg}
      </Alert>
    );
  } else {
    return (
      <FormikErrorMessage
        name={name}
        render={(msg) => {
          return (
            <Alert className="mt-2" color="danger">
              {msg}
            </Alert>
          );
        }}
      />
    );
  }
};

ErrorMessage.propTypes = {
  name: PropTypes.string,
};

export default ErrorMessage;
