import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
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
  advUSInitialValues,
  advMetricInitialValues
} from './AdvancedSettingsForm/initialValues';
import {
  userMetricInitialValues,
  userUSInitialValues
} from './UserDataForm/initialValues';
// validation schemas
import setYupLocale from './setYupLocale';
import { fieldReservoirFormSchema } from './FieldReservoirForm/validationSchema';
import { cropManagementFormSchema } from './CropManagementForm/validationSchema';
import { userDataFormSchema } from './UserDataForm/validationSchema';
import { advancedSettingsFormSchema } from './AdvancedSettingsForm/validationSchema';

import { Debug } from './utils/debug';

const metricInitialValues = {
  ...fieldMetricInitialValues,
  ...cropMetricInitialValues,
  ...userMetricInitialValues,
  ...advMetricInitialValues
};

const usInitialValues = {
  ...fieldUSInitialValues,
  ...cropUSInitialValues,
  ...userUSInitialValues,
  ...advUSInitialValues
};

const validationSchema = fieldReservoirFormSchema
  .concat(cropManagementFormSchema)
  .concat(advancedSettingsFormSchema)
  .concat(userDataFormSchema)
  .concat(advancedSettingsFormSchema);

const FormContainer = props => {
  const { origin, fieldState, frzThwDates, unitType } = props;

  return (
    <Container>
      <Formik
        initialValues={
          unitType === 'us'
            ? { unitType, ...usInitialValues }
            : { unitType, ...metricInitialValues }
        }
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          errors,
          status,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          touched,
          values
        }) => (
          <Form>
            <Row>
              <Col>
                <h1>2. Describe your field and reservoir</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <FieldReservoirForm unitType={unitType} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>3. Describe your crop and management</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <CropManagementForm
                  unitType={unitType}
                  fieldState={fieldState}
                  frzThwDates={frzThwDates}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>
                  4. Select your data source for daily weather, drain flow, and
                  nutrient concentrations.
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <UserDataForm origin={origin} />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button
                  className="mb-4"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#007cb3', height: '75px' }}
                >
                  <strong>CLICK HERE TO RUN EDWRD</strong>
                </Button>
              </Col>
            </Row>
            <Debug />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

FormContainer.propTypes = {
  origin: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number
  }),
  fieldState: PropTypes.string,
  frzThwDates: PropTypes.shape({
    freeze: PropTypes.number,
    thaw: PropTypes.number
  }),
  unitType: PropTypes.string
};

export default FormContainer;
