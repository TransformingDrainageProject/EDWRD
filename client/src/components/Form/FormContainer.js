import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Row, Spinner } from 'reactstrap';
import FileDownload from 'js-file-download';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
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

  const [results, setResults] = useState(null);
  const [showModifyInputs, toggleShowModifyInputs] = useState(false);
  const [showReset, toggleShowReset] = useState(false);

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
            <Row>
              <Col className="text-center">
                <Button
                  className="mb-4"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#007cb3',
                    height: '75px',
                    width: '150px',
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
              {showReset ? (
                <Col className="text-center">
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

                      handleReset();
                    }}
                    style={{
                      backgroundColor: '#edb229',
                      height: '75px',
                      width: '150px',
                    }}
                  >
                    <strong>Reset</strong>
                  </Button>
                </Col>
              ) : null}
              {!showModifyInputs ? (
                <Col className="text-center">
                  <Button
                    className="mb-4"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setFieldValue('userInput', 'true');
                      setFieldTouched('userInput', true);
                      toggleShowModifyInputs(true);
                    }}
                    style={{
                      backgroundColor: '#007cb3',
                      height: '75px',
                      width: '150px',
                    }}
                  >
                    <strong>Modify Inputs</strong>
                  </Button>
                </Col>
              ) : null}
            </Row>
            {status ? (
              <Row>
                <Col className="text-center">
                  <span style={{ color: 'red' }}>{status}</span>
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
