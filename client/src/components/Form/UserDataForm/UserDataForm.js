import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import FileUpload from '../../FileUpload';
import MapContainer from '../../Map/MapContainer';
import FormCard from '../FormCard';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import { MyRadioField } from '../FormikComponents/MyFields';

const UserDataForm = (props) => {
  const { origin, stationId, stationName, unitType } = props;
  const { values } = useFormikContext();

  const userDataSelectionOptions = [
    {
      label: 'Choose existing data from a research site',
      value: 'false',
    },
    { label: 'Upload my own data file', value: 'true' },
  ];

  return (
    <Container fluid>
      <Row>
        <Col className="mb-4">
          <FormCard hideHelp={true}>
            <Row>
              <Col md="12">
                <h2>Instructions</h2>
                <p>
                  Daily measurements for weather, drain flow, and nutrient
                  concentrations are required. You may upload your own data as a
                  .txt file and formatted following this example data file (link
                  to example data file), or you may choose existing data from
                  one of our research sites across the region.
                </p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <MyRadioField
                  name="userInput"
                  options={userDataSelectionOptions}
                />
                <ErrorMessage name="userInput" />
              </Col>
              <Col md="8">
                {values.userInput === 'true' ? (
                  <FileUpload
                    name="userInputFile"
                    label="Upload your data"
                    type="input"
                  />
                ) : (
                  <MapContainer
                    origin={origin}
                    type="selectStationLocation"
                    stationId={stationId}
                    stationName={stationName}
                    unitType={unitType}
                  />
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
