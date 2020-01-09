import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import MapContainer from '../../Map/MapContainer';
import UserDataFileUpload from './UserDataFileUpload';
import FormCard from '../FormCard';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import { MyRadioField } from '../FormikComponents/MyFields';

const UserDataForm = props => {
  const { origin } = props;
  const { values } = useFormikContext();

  const userDataSelectionOptions = [
    {
      label: 'No, I would like to choose example data from a different site',
      value: 'false',
    },
    { label: 'Yes, I will upload a file', value: 'true' },
  ];

  return (
    <Container>
      <Row>
        <Col className="mb-4">
          <FormCard label="Select one" hideHelp={true}>
            <Row>
              <Col md="4">
                <MyRadioField
                  name="userData"
                  options={userDataSelectionOptions}
                />
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
