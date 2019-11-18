import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
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
import {
  advUSInitialValues,
  advMetricInitialValues
} from './AdvancedSettings/initialValues';

let metricInitialValues = {
  ...fieldMetricInitialValues,
  ...cropMetricInitialValues,
  ...userMetricInitialValues,
  ...advMetricInitialValues
};

let usInitialValues = {
  ...fieldUSInitialValues,
  ...cropUSInitialValues,
  ...userUSInitialValues,
  ...advUSInitialValues
};

const FormContainer = props => {
  const { unitType } = props;

  return (
    <Container>
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
            <Row>
              <Col>
                <h1>2. Describe your field and reservoir:</h1>
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

export default FormContainer;
