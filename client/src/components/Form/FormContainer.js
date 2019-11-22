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
  const { fieldState, unitType } = props;

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
        {({ errors, status, isSubmitting, touched, values }) => (
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
                  errors={errors}
                  touched={touched}
                  values={values}
                  unitType={unitType}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>
                  4. Do you have your own daily weather, tile drain flow, and
                  nutrient concentration data to upload?
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <UserDataForm
                  errors={errors}
                  touched={touched}
                  values={values}
                />
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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

FormContainer.propTypes = {
  fieldState: PropTypes.string,
  unitType: PropTypes.string
};

export default FormContainer;
