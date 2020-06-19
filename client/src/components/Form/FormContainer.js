import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Col, Row, Spinner } from 'reactstrap';
import FileDownload from 'js-file-download';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

// forms
import FieldReservoirForm from './FieldReservoirForm';
import CropManagementForm from './CropManagementForm';
import UserDataForm from './UserDataForm';

// initial values
import {
  fieldMetricInitialValues,
  fieldUSInitialValues,
} from './FieldReservoirForm/initialValues';
import {
  cropMetricInitialValues,
  cropUSInitialValues,
} from './CropManagementForm/initialValues';
import {
  advUSInitialValues,
  advMetricInitialValues,
} from './AdvancedSettingsForm/initialValues';
import { userInitialValues } from './UserDataForm/initialValues';

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
  ...userInitialValues,
  ...advMetricInitialValues,
};

const usInitialValues = {
  ...fieldUSInitialValues,
  ...cropUSInitialValues,
  ...userInitialValues,
  ...advUSInitialValues,
};

const validationSchema = fieldReservoirFormSchema
  .concat(cropManagementFormSchema)
  .concat(advancedSettingsFormSchema)
  .concat(userDataFormSchema)
  .concat(advancedSettingsFormSchema);

const FormContainer = (props) => {
  const { origin, fieldState, frzThwDates, markerCoords, unitType } = props;

  const [processingStatus, updateProcessingStatus] = useState('');
  const [results, setResults] = useState(null);
  const [showModifyInputs, toggleShowModifyInputs] = useState(false);
  const [showReset, toggleShowReset] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('processing', (data) => {
      updateProcessingStatus(data.msg);
    });
  }, []);

  return (
    <>
      <Formik
        initialValues={
          unitType === 'us'
            ? { unitType, ...usInitialValues }
            : { unitType, ...metricInitialValues }
        }
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError, setSubmitting, setStatus }) => {
          axios
            .post(
              '/api/form',
              { ...markerCoords, ...frzThwDates, ...values },
              { responseType: 'blob' }
            )
            .then((response) => {
              console.log(response);
              if (response && response.data) {
                FileDownload(response.data, 'data.xlsx');
                setSubmitting(false);
                toggleShowReset(true);
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.response && err.response.status === 422) {
                err.response.data.errors.forEach((fieldError) =>
                  setFieldError(fieldError.param, fieldError.msg)
                );
              } else {
                setStatus('Unable to process form submission at this time.');
              }
              setSubmitting(false);
              toggleShowReset(true);
            });
        }}
      >
        {({
          dirty,
          handleReset,
          isSubmitting,
          setFieldTouched,
          setFieldValue,
          status,
        }) => (
          <Form>
            {showModifyInputs ? (
              <>
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
                      4. Select your data source for daily weather, drain flow,
                      and nutrient concentrations.
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <UserDataForm origin={origin} />
                  </Col>
                </Row>
              </>
            ) : null}
            <Row style={{ padding: '0 15px 0 15px' }}>
              <Col className="text-center">
                <Button
                  className="mb-4"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#007cb3',
                    height: '75px',
                    width: '150px',
                    marginLeft: '150px',
                  }}
                >
                  {isSubmitting ? (
                    <Spinner
                      style={{
                        width: '3rem',
                        height: '3rem',
                      }}
                    />
                  ) : (
                    <strong>Run EDWRD</strong>
                  )}
                </Button>
                {!showReset ? (
                  <Button
                    className="mb-4"
                    type="button"
                    disabled={isSubmitting}
                    outline
                    color="secondary"
                    onClick={() => {
                      if (!showModifyInputs) {
                        setFieldValue('userInput', 'true');
                        setFieldTouched('userInput', true);
                        setFieldValue('userSelectedStation', 2);
                        setFieldTouched('userSelectedStation', true);
                      } else {
                        setFieldValue('userInput', 'false');
                        setFieldTouched('userInput', true);
                        setFieldValue('userSelectedStation', -1);
                        setFieldTouched('userSelectedStation', true);
                      }

                      toggleShowModifyInputs(!showModifyInputs);
                    }}
                    style={{
                      height: '75px',
                      width: '150px',
                      float: 'right',
                    }}
                  >
                    {!showModifyInputs ? (
                      <strong>Modify Inputs</strong>
                    ) : (
                      <strong>Return to Quick Analysis</strong>
                    )}
                  </Button>
                ) : null}
                {showReset ? (
                  <Button
                    className="mb-4"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      const inputUpload = document.getElementsByName(
                        'input-upload'
                      );
                      const paramUpload = document.getElementsByName(
                        'param-upload'
                      );

                      if (inputUpload && inputUpload.length > 0) {
                        inputUpload[0].value = '';
                      }
                      if (paramUpload && paramUpload.length > 0) {
                        paramUpload[0].value = '';
                      }

                      updateProcessingStatus('');
                      handleReset();
                      toggleShowReset(false);
                    }}
                    style={{
                      backgroundColor: '#edb229',
                      height: '75px',
                      width: '150px',
                      float: 'right',
                    }}
                  >
                    <strong>Reset</strong>
                  </Button>
                ) : null}
              </Col>
            </Row>
            {status ? (
              <Row>
                <Col className="text-center">
                  <span style={{ color: 'red' }}>{status}</span>
                </Col>
              </Row>
            ) : null}
            {processingStatus ? (
              <Row>
                <Col className="text-center">
                  <Alert color="light">{processingStatus}</Alert>
                </Col>
              </Row>
            ) : null}
            {results ? (
              <div className="mb-3">
                <div
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 11,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    fontWeight: 500,
                    padding: '.5rem',
                    background: '#555',
                    color: '#fff',
                    letterSpacing: '1px',
                  }}
                >
                  Results
                </div>
                <pre
                  style={{
                    fontSize: '.65rem',
                    padding: '.25rem .5rem',
                    overflowX: 'scroll',
                  }}
                >
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            ) : null}
            <Debug />
          </Form>
        )}
      </Formik>
    </>
  );
};

FormContainer.propTypes = {
  origin: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number,
  }),
  fieldState: PropTypes.string,
  frzThwDates: PropTypes.shape({
    freeze: PropTypes.number,
    thaw: PropTypes.number,
  }),
  unitType: PropTypes.string,
};

export default FormContainer;
