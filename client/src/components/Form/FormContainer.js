import React from 'react';
import { Button } from 'reactstrap';
import { Formik, Form } from 'formik';
// forms
import FieldReservoirForm from './FieldReservoirForm';
import CropManagementForm from './CropManagementForm';
import UserDataForm from './UserDataForm';
// initial values
import fieldReservoirInitialValues from './FieldReservoirForm/initialValues';

const initialValues = { ...fieldReservoirInitialValues };

const FormContainer = () => {
  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={{}}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, status, isSubmitting, values }) => (
          <Form>
            <div className="row">
              <h1>2. Describe your field and reservoir:</h1>
            </div>
            <div className="row">
              <FieldReservoirForm />
            </div>
            <div className="row">
              <h1>3. Describe your crop and management</h1>
            </div>
            <div className="row">
              <CropManagementForm />
            </div>
            <div className="row">
              <h1>
                4. Do you have your own daily weather, tile drain flow, and
                nutrient concentration data to upload?
              </h1>
            </div>
            <div className="row">
              <UserDataForm />
            </div>
            <div className="row justify-content-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: '#007cb3', height: '75px' }}
              >
                <strong>CLICK HERE TO RUN EDWRD</strong>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormContainer;
