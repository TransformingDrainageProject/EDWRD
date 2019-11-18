import React, { useState } from 'react';
import { Field } from 'formik';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const unitConversion = {
  inchDay: { us: 'in/day', metric: 'mm/day' },
  inches: { us: 'in', metric: 'mm' },
  feet: { us: 'ft', metric: 'm' }
};

const AdvancedLabel = props => {
  const { name, text, unit, unitType } = props;

  const labelUnit = unit ? ` (${unitConversion[unit][unitType]})` : '';

  return (
    <FormGroup>
      <Label for={name}>
        {text}
        {labelUnit}{' '}
        <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: 5 }} />
      </Label>
      {props.children}
    </FormGroup>
  );
};

const AdvancedSettings = props => {
  const { unitType } = props;
  const [modal, toggleModal] = useState(props.open ? props.open : false);

  const toggle = () => {
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
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <AdvancedLabel
                      name="zefc"
                      text="Soil surface field capacity"
                    >
                      <Field
                        className="form-control"
                        type="number"
                        name="zefc"
                        step="0.01"
                      />
                    </AdvancedLabel>
                  </Col>
                  <Col>
                    <AdvancedLabel
                      name="zewp"
                      text="Soil surface wilting point"
                    >
                      <Field
                        className="form-control"
                        type="number"
                        name="zewp"
                        step="0.01"
                      />
                    </AdvancedLabel>
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
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
              <Col>
                <Row>
                  <Col>
                    <h4 className="text-center">
                      Growing and Non-growing Seasons
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Starting Date</th>
                          <th>Ending Date</th>
                          <th>Crop Coefficient</th>
                          <th>Maximum Crop Height (ft)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Planting Date</th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep31"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep12"
                            />
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <th>Initial establishment</th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep12"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep13"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="number"
                              name="dep14"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="number"
                              name="dep15"
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>Development</th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep16"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep17"
                            />
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <th>Mid-season</th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep18"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep19"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="number"
                              name="dep20"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="number"
                              name="dep21"
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>Late season</th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep22"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep23"
                            />
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <th>Harvest date</th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep32"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep24"
                            />
                          </th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <th>Soil Freeze</th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep26"
                            />
                          </th>
                          <th>
                            <Field
                              className="form-control"
                              type="date"
                              name="dep27"
                            />
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
              <Col>
                <AdvancedLabel
                  name="dep29"
                  text="Upload .txt file with your own custom input settings"
                >
                  <input className="form-control" name="dep29" type="file" />
                </AdvancedLabel>
                <a href="#">Download template input file</a>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AdvancedSettings;
