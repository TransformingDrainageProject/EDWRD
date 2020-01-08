import React, { useState } from 'react';
import { Field } from 'formik';
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';

import AdvancedLabel from './AdvancedLabel';
import AdvancedSeasonTable from './AdvancedSeasonTable';
import ErrorMessage from '../FormikComponents/ErrorMessage';

import { usePrevious } from '../../../utils/customHooks';

import updateGrowingSeasonFields from '../utils/updateGrowingSeasonFields';

const AdvancedSettings = props => {
  const {
    fieldState,
    frzThwDates,
    setFieldTouched,
    setFieldValue,
    unitType,
    values,
  } = props;
  const [modal, toggleModal] = useState(props.open ? props.open : false);

  const prevState = usePrevious(fieldState);
  const prevFrzThwDates = usePrevious(frzThwDates);

  const toggle = () => {
    // update growing season dates if the state or
    // freeze and/or thaw dates have changed
    if (!modal && prevState && prevFrzThwDates) {
      if (
        fieldState !== prevState ||
        frzThwDates.freeze !== prevFrzThwDates.freeze ||
        frzThwDates.thaw !== prevFrzThwDates.thaw
      ) {
        updateGrowingSeasonFields(
          { setFieldValue, setFieldTouched },
          values.cropSelection,
          unitType,
          fieldState,
          frzThwDates
        );
      }
    }
    toggleModal(!modal);
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: '#edb229', height: '75px' }}
        size="lg"
        onClick={toggle}
      >
        <strong>Open Advanced Settings</strong>
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Advanced Settings</ModalHeader>
        <ModalBody>
          <Container>
            <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
              <Col>
                <Row>
                  <Col>
                    <h4>
                      <u>Reservoir Settings</u>
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <AdvancedLabel
                      name="rseep"
                      text="Reservoir seepage rate"
                      unit="inchDay"
                      unitType={unitType}
                    >
                      <Field
                        className="form-control"
                        type="number"
                        name="rseep"
                        step="0.01"
                      />
                    </AdvancedLabel>
                    <ErrorMessage name="rseep" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
              <Col>
                <Row>
                  <Col>
                    <h4>
                      <u>Soil Profile Settings</u>
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <AdvancedLabel
                      name="zrfc"
                      text="Soil profile field capacity"
                    >
                      <Field
                        className="form-control"
                        type="number"
                        name="zrfc"
                        step="0.01"
                      />
                    </AdvancedLabel>
                    <ErrorMessage name="zrfc" />
                  </Col>
                  <Col>
                    <AdvancedLabel
                      name="zrwp"
                      text="Soil profile wilting point"
                    >
                      <Field
                        className="form-control"
                        type="number"
                        name="zrwp"
                        step="0.01"
                      />
                    </AdvancedLabel>
                    <ErrorMessage name="zrwp" />
                  </Col>
                  <Col>
                    <AdvancedLabel
                      name="ze"
                      text="Depth of soil evaporation layer"
                      unit="feet"
                      unitType={unitType}
                    >
                      <Field
                        className="form-control"
                        type="number"
                        name="ze"
                        step="0.01"
                      />
                    </AdvancedLabel>
                    <ErrorMessage name="ze" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <AdvancedLabel name="zefc" text="Surface field capacity">
                      <Field
                        className="form-control"
                        type="number"
                        name="zefc"
                        step="0.01"
                      />
                    </AdvancedLabel>
                    <ErrorMessage name="zefc" />
                  </Col>
                  <Col>
                    <AdvancedLabel name="zewp" text="Surface wilting point">
                      <Field
                        className="form-control"
                        type="number"
                        name="zewp"
                        step="0.01"
                      />
                    </AdvancedLabel>
                    <ErrorMessage name="zewp" />
                  </Col>
                  <Col>
                    <AdvancedLabel
                      name="rew"
                      text="Readily evaporable water"
                      unit="inches"
                      unitType={unitType}
                    >
                      <Field
                        className="form-control"
                        type="number"
                        name="rew"
                        step="0.1"
                      />
                    </AdvancedLabel>
                    <ErrorMessage name="rew" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <AdvancedSeasonTable fieldState={fieldState} unitType={unitType} />
            <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
              <Col>
                <AdvancedLabel
                  name="dep29"
                  text="Upload .txt file with your own custom input settings"
                >
                  <input className="form-control" name="dep29" type="file" />
                </AdvancedLabel>
                <a
                  href="https://drainage.agriculture.purdue.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download template input file
                </a>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

AdvancedSettings.propTypes = {
  fieldState: PropTypes.string,
  frzThwDates: PropTypes.shape({
    freeze: PropTypes.number,
    thaw: PropTypes.number,
  }),
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  unitType: PropTypes.string,
  values: PropTypes.object,
};

export default AdvancedSettings;
