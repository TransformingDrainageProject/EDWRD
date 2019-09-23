import React from 'react';
import { Button } from 'reactstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';

import formFields from './formFields';
import initialValues from './formInitialValues';
import validationSchema from './formValidationSchema';

const Form = () => {
  return (
    <div style={{ marginTop: '15px', height: '500px' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, status, isSubmitting }) => (
          <FormikForm>
            {formFields.map(field => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.name}</label>
                <Field
                  className="form-control"
                  type={field.type}
                  name={field.name}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                />
                <ErrorMessage name={field.name} component="div" />
              </div>
            ))}
            {status && status.msg && <div>{status.msg}</div>}
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
