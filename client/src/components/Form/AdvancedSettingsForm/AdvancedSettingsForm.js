import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik';
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
import FileUpload from '../../FileUpload';
import HelpPopover from '../HelpPopover';

import { usePrevious } from '../../../utils/customHooks';

import { advancedSettingsHelp } from './advancedSettingsHelp';
import updateGrowingSeasonFields from '../utils/updateGrowingSeasonFields';

const AdvancedSettings = (props) => {
  const { fieldState, frzThwDates, unitType } = props;
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const [modal, toggleModal] = useState(props.open ? props.open : false);

  const prevState = usePrevious(fieldState);
  const prevFrzThwDates = usePrevious(frzThwDates);

  const toggle = () => {
    if (!modal && prevState && prevFrzThwDates) {
      updateGrowingSeasonFields(
        { setFieldValue, setFieldTouched },
        values.cropSelection,
        unitType,
        fieldState,
        frzThwDates
      );
    }
    toggleModal(!modal);
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: '#edb229', height: '75px', width: '100%' }}
        size="lg"
        onClick={toggle}
      >
        <strong>Open Advanced Settings</strong>
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Advanced Settings</ModalHeader>
        <ModalBody>
          <Container>
            <Row className="mb-3">
              <Col md={12} lg={8}>
                <Row
                  className="mr-xl-3 mr-lg-3 mb-lg-0 mb-sm-3 mb-3"
                  style={{ border: '1px solid #c8ced5' }}
                >
                  <Col>
                    <Row>
                      <Col>
                        <h4>
                          <u>Soil Profile Settings</u>
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <AdvancedLabel
                          name="zrfc"
                          text="Soil profile field capacity"
                        >
                          <HelpPopover
                            key="zrfc"
                            helpText={advancedSettingsHelp.zrfc}
                            label="Soil profile field capacity"
                            name="zrfc"
                            position="top"
                          />
                          <Field
                            className="form-control"
                            type="number"
                            name="zrfc"
                            step="0.01"
                          />
                        </AdvancedLabel>
                        <ErrorMessage name="zrfc" />
                      </Col>
                      <Col md={6}>
                        <AdvancedLabel
                          name="zrwp"
                          text="Soil profile wilting point"
                        >
                          <HelpPopover
                            key="zrwp"
                            helpText={advancedSettingsHelp.zrwp}
                            label="Soil profile wilting point"
                            name="zrwp"
                            position="top"
                          />
                          <Field
                            className="form-control"
                            type="number"
                            name="zrwp"
                            step="0.01"
                          />
                        </AdvancedLabel>
                        <ErrorMessage name="zrwp" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <AdvancedLabel
                          name="ze"
                          text="Depth of soil evaporation layer"
                          unit="feet"
                          unitType={unitType}
                        >
                          <HelpPopover
                            key="ze"
                            helpText={advancedSettingsHelp.ze}
                            label="Depth of soil evaporation layer"
                            name="ze"
                            position="top"
                          />
                          <Field
                            className="form-control"
                            type="number"
                            name="ze"
                            step="0.01"
                          />
                        </AdvancedLabel>
                        <ErrorMessage name="ze" />
                      </Col>
                      <Col md={6}>
                        <AdvancedLabel
                          name="rew"
                          text="Readily evaporable water"
                          unit="inches"
                          unitType={unitType}
                        >
                          <HelpPopover
                            key="rew"
                            helpText={advancedSettingsHelp.rew}
                            label="Readily evaporable water"
                            name="rew"
                            position="top"
                          />
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
                    <Row>
                      <Col md={6}>
                        <AdvancedLabel
                          name="zefc"
                          text="Evaporation layer field capacity"
                        >
                          <HelpPopover
                            key="zefc"
                            helpText={advancedSettingsHelp.zefc}
                            label="Evaporation layer field capacity"
                            name="zefc"
                            position="top"
                          />
                          <Field
                            className="form-control"
                            type="number"
                            name="zefc"
                            step="0.01"
                          />
                        </AdvancedLabel>
                        <ErrorMessage name="zefc" />
                      </Col>
                      <Col md={6}>
                        <AdvancedLabel
                          name="zewp"
                          text="Evaporation layer wilting point"
                        >
                          <HelpPopover
                            key="zewp"
                            helpText={advancedSettingsHelp.zewp}
                            label="Evaporation layer wilting point"
                            name="zewp"
                            position="top"
                          />
                          <Field
                            className="form-control"
                            type="number"
                            name="zewp"
                            step="0.01"
                          />
                        </AdvancedLabel>
                        <ErrorMessage name="zewp" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={4}>
                <Row style={{ border: '1px solid #c8ced5' }}>
                  <Col>
                    <Row>
                      <Col>
                        <h4>
                          <u>Reservoir Settings</u>
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <AdvancedLabel
                          name="rseep"
                          text="Reservoir seepage rate"
                          unit="inchDay"
                          unitType={unitType}
                        >
                          <HelpPopover
                            key="rseep"
                            helpText={advancedSettingsHelp.rseep}
                            label="Reservoir seepage rate"
                            name="rseep"
                            position="top"
                          />
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
                    <Row>
                      <Col>
                        <AdvancedLabel
                          name="rdepMin"
                          text="Minimum reservoir depth for irrigation"
                          unit="feet"
                          unitType={unitType}
                        >
                          <HelpPopover
                            key="rdepMin"
                            helpText={advancedSettingsHelp.rdepMin}
                            label="Minimum reservoir depth for irrigation"
                            name="rdepMin"
                            position="top"
                          />
                          <Field
                            className="form-control"
                            type="number"
                            name="rdepMin"
                            step="0.1"
                          />
                        </AdvancedLabel>
                        <ErrorMessage name="rdepMin" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <AdvancedSeasonTable fieldState={fieldState} unitType={unitType} />
            <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
              <Col>
                <FileUpload
                  name="userParamFile"
                  label="Upload custom input file"
                  type="param"
                />
                <HelpPopover
                  key="advCustomInput"
                  helpText={advancedSettingsHelp.advCustomInput}
                  label="Upload custom input file"
                  name="advCustomInput"
                  position="top"
                  top="5px"
                />
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
  unitType: PropTypes.string,
};

export default AdvancedSettings;
