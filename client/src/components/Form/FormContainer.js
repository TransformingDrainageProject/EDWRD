import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Col, Row, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import * as yup from 'yup';

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
    analysisType,
    executeScroll,
    origin,
    fieldState,
    frzThwDates,
    markerCoords,
    nearestStation,
    setChartData,
    unitType,
  } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const [processingStatus, updateProcessingStatus] = useState('');

  function makeSocketConnection(setSubmitting, setStatus) {
    const socket = io('https://drainage.agriculture.purdue.edu');
    socket.on('processing', (data) => {
      updateProcessingStatus(data.msg);
    });
    socket.on('error', (err) => {
      setStatus('');
      updateProcessingStatus('');

      if (typeof err === 'object' && err.msg) {
        setErrorMsg(err.msg);
      }
      setSubmitting(false);
    });
    socket.on('chartDataReady', (chartData) => {
      setChartData(chartData);
      setStatus('');
      setSubmitting(false);
      executeScroll();
    });
  }

  let formValues =
    unitType === 'us'
      ? { unitType, ...usInitialValues }
      : { unitType, ...metricInitialValues };

  return (
    <>
      <Formik
        initialValues={
          nearestStation
            ? {
                ...formValues,
                ...nearestStation,
                userSelectedStation: nearestStation.stationId,
              }
            : formValues
        }
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError, setSubmitting, setStatus }) => {
          setStatus('');
          setErrorMsg('');
          setChartData(null);
          updateProcessingStatus('');

          values['quickAnalysis'] = analysisType === 'quick';

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
            });
        }}
      >
        {({ isSubmitting, status, values }) => (
          <Form>
            {analysisType === 'indepth' ? (
              <>
                <Row>
                  <Col>
                    <h1>A. Describe your field and reservoir</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FieldReservoirForm unitType={unitType} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h1>B. Describe your crop and management</h1>
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
                      C. Select your data source for daily weather, drain flow,
                      and nutrient concentrations
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {values.stationId && values.stationName ? (
                      <UserDataForm
                        origin={origin}
                        stationId={values.stationId ? values.stationId : null}
                        stationName={
                          values.stationName ? values.stationName : null
                        }
                        unitType={unitType}
                      />
                    ) : null}
                  </Col>
                </Row>
              </>
            ) : null}
            <Row>
              <Col>
                <h1>Step 3: Run EDWRD</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Chosen location:{' '}
                  <strong>
                    {markerCoords.location.longitude.toFixed(3)},{' '}
                    {markerCoords.location.latitude.toFixed(3)}
                  </strong>
                  <br />
                  Chosen units:{' '}
                  {unitType === 'us' ? (
                    <strong>U.S. Standard</strong>
                  ) : (
                    <strong>Metric</strong>
                  )}
                  <br />
                  Chosen analysis:{' '}
                  {analysisType === 'quick' ? (
                    <strong>Quick Analysis</strong>
                  ) : (
                    <strong>In-depth Analysis</strong>
                  )}
                  <br />
                  Daily weather, drain flow, and nutrient concentrations:{' '}
                  {values.userInput === 'false' ? (
                    values.userSelectedStation ? (
                      values.userSelectedStation === 4 ? (
                        <strong>Randolph County, IN</strong>
                      ) : (
                        <strong>Washington County, IA</strong>
                      )
                    ) : null
                  ) : (
                    <strong>{values.userInputFile}</strong>
                  )}
                  {(values.userInput === 'true' && values.userInputFile) ||
                  (values.userParam && values.userParamFile) ? (
                    <>
                      <br />
                      File summary:
                      <br />
                      {values.userInputFile ? (
                        <strong>{values.userInputFile} (input)</strong>
                      ) : null}
                      {values.userInputFile && values.userParamFile ? (
                        <br />
                      ) : null}
                      {values.userParamFile ? (
                        <strong>{values.userParamFile} (param)</strong>
                      ) : null}
                    </>
                  ) : null}
                </p>
              </Col>
            </Row>
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
                    // marginLeft: '150px',
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
