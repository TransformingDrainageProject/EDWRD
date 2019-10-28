import React from 'react';
import { Button } from 'reactstrap';
import { Formik, Form } from 'formik';
// forms
import FieldReservoirForm from './FieldReservoirForm';
import CropManagementForm from './CropManagementForm';
import UserDataForm from './UserDataForm';
// initial values
import {
  fieldMetricInitialValues,
  fieldUSInitialValues
} from './FieldReservoirForm/initialValues';
import {
  cropMetricInitialValues,
  cropUSInitialValues
} from './CropManagementForm/initialValues';
import {
  userMetricInitialValues,
  userUSInitialValues
} from './UserDataForm/initialValues';

let metricInitialValues = {
  ...fieldMetricInitialValues,
  ...cropMetricInitialValues,
  ...userMetricInitialValues
};

let usInitialValues = {
  ...fieldUSInitialValues,
  ...cropUSInitialValues,
  ...userUSInitialValues
};

const FormContainer = props => {
  const { unitType } = props;

  return (
    <div className="container">
      <Formik
        initialValues={
          unitType === 'us'
            ? { unitType, ...usInitialValues }
            : { unitType, ...metricInitialValues }
        }
        enableReinitialize={true}
        validationSchema={{}}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, status, isSubmitting, touched, values }) => (
          <Form>
            <div className="row">
              <h1>2. Describe your field and reservoir:</h1>
            </div>
            <div className="row">
              <FieldReservoirForm unitType={unitType} />
            </div>
            <div className="row">
              <h1>3. Describe your crop and management</h1>
            </div>
            <div className="row">
              <CropManagementForm
                errors={errors}
                touched={touched}
                values={values}
                unitType={unitType}
              />
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
                className="mb-4"
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
