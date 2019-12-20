import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import MapContainer from '../../Map/MapContainer';
import UserDataFileUpload from './UserDataFileUpload';
import FormCard from '../FormCard';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import { RadioButton, RadioButtonGroup } from '../FormikComponents/RadioInput';

const UserDataForm = props => {
  const { errors, touched, values } = props;

  return (
    <Container>
      <Row>
        <Col className="mb-4">
          <FormCard label="Select one" hideHelp={true}>
            <Row>
              <Col md="4">
                <RadioButtonGroup
                  id="userData"
                  label="Select one"
                  value={values.radioGroup}
                  error={errors.radioGroup}
                  touched={touched.radioGroup}
                >
                  <Field
                    component={RadioButton}
                    name="userData"
                    id="false"
                    label="No, I would like to choose example data from a different site"
                  />
                  <Field
                    component={RadioButton}
                    name="userData"
                    id="true"
                    label="Yes, I wil upload a file"
                  />
                </RadioButtonGroup>
                <ErrorMessage name="userData" />
              </Col>
              <Col md="8">
                {values.userData === 'true' ? (
                  <UserDataFileUpload />
                ) : (
                  <MapContainer type="selectStationLocation" />
                )}
              </Col>
            </Row>
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

UserDataForm.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default UserDataForm;
