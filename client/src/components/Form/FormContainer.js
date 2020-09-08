import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Col, Row, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import * as yup from 'yup';

import FileSummary from './FileSummary';

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

const metricInitialValues = {
  ...fieldMetricInitialValues,
  ...cropMetricInitialValues,
  ...userInitialValues,
  ...advMetricInitialValues,
  quickAnalysis: 'true',
};

const usInitialValues = {
  ...fieldUSInitialValues,
  ...cropUSInitialValues,
  ...userInitialValues,
  ...advUSInitialValues,
  quickAnalysis: 'true',
};

const validationSchema = fieldReservoirFormSchema
  .concat(cropManagementFormSchema)
  .concat(advancedSettingsFormSchema)
  .concat(userDataFormSchema)
  .concat(advancedSettingsFormSchema)
  .concat(
    yup.object().shape({
      quickAnalysis: yup.boolean().required(),
    })
  );

const FormContainer = (props) => {
  const {
    origin,
    fieldState,
    frzThwDates,
    markerCoords,
    setChartData,
    unitType,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const [processingStatus, updateProcessingStatus] = useState('');
  const [showModifyInputs, toggleShowModifyInputs] = useState(false);
  const [showReset, toggleShowReset] = useState(false);

  function makeSocketConnection(setSubmitting, setStatus) {
    const socket = io('http://localhost:3000');
    socket.on('processing', (data) => {
      updateProcessingStatus(data.msg);
    });
    socket.on('error', (err) => {
      setStatus('');
      updateProcessingStatus('');

      if (typeof err === 'object' && err.msg) {
        setErrorMsg(err.msg);
      } else {
        setErrorMsg(
          'An unexpected error has occurred. Please contact support if this issue persists.'
        );
      }
      setSubmitting(false);
      toggleShowReset(true);
    });
    socket.on('chartDataReady', (chartData) => {
      setChartData(chartData);
      setStatus('');
      setSubmitting(false);
      toggleShowReset(true);
    });
  }

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
          setStatus('');
          setErrorMsg('');
          setChartData(null);
          updateProcessingStatus('');
          axios
            .post('/api/form', { ...markerCoords, ...frzThwDates, ...values })
            .then((response) => {
              if (response && response.data) {
                setStatus(response.data);
                makeSocketConnection(setSubmitting, setStatus);
              }
            })
            .catch(async (err) => {
              updateProcessingStatus('');
              if (err.response && err.response.status === 422) {
                err.response.data.errors.forEach((fieldError) =>
                  setFieldError(fieldError.param, fieldError.msg)
                );
              } else if (err.response && err.response.data) {
                if (typeof err.response.data === 'string') {
                  setErrorMsg(await err.response.data);
                } else {
                  setErrorMsg(await err.response.data.text());
                }
              } else {
                setErrorMsg('Unable to process form submission at this time.');
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
          values,
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
            {(values.userInput === 'true' && values.userInputFile) ||
            (values.userParam && values.userParamFile) ? (
              <FileSummary
                inputFile={
                  values.userInput === 'true' ? values.userInputFile : null
                }
                paramFile={values.userParam ? values.userParamFile : null}
              />
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
                        setFieldValue('quickAnalysis', 'false');
                        setFieldTouched('quickAnalysis', true);
                        setFieldValue('userInput', 'false');
                        setFieldTouched('userInput', false);
                        setFieldValue('userSelectedStation', 4);
                        setFieldTouched('userSelectedStation', true);
                      } else {
                        setFieldValue('quickAnalysis', 'true');
                        setFieldTouched('quickAnalysis', true);
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
                    <strong>Restore Default Values</strong>
                  </Button>
                ) : null}
              </Col>
            </Row>
            {status ? (
              <Row>
                <Col className="text-center">
                  <span style={{ color: '#007cb3' }}>{status}</span>
                </Col>
              </Row>
            ) : null}
            {errorMsg ? (
              <Row>
                <Col className="text-center">
                  <span style={{ color: 'red' }}>{errorMsg}</span>
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
