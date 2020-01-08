import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Field, useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import MapContainer from '../../Map/MapContainer';
import UserDataFileUpload from './UserDataFileUpload';
import FormCard from '../FormCard';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import { RadioButton, RadioButtonGroup } from '../FormikComponents/RadioInput';

const UserDataForm = props => {
  const { origin } = props;
  const { values, touched, errors } = useFormikContext();
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
                  <MapContainer origin={origin} type="selectStationLocation" />
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
  origin: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number,
  }),
};

export default UserDataForm;
