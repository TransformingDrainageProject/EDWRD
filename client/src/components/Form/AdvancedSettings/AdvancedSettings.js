import React, { useState } from 'react';
import { Field } from 'formik';
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const AdvancedLabel = props => {
  const { text } = props;

  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text" style={{ width: '290px' }}>
          {text}
          <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: 5 }} />
        </div>
      </div>
      {props.children}
    </div>
  );
};

const AdvancedSettings = props => {
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
            <Col md="4">
              <Row>
                <Row>Reservoir Settings</Row>
                <Row className="mb-3">
                  <AdvancedLabel text="Reservoir seepage rate (in/day)">
                    <Field className="form-control" type="number" name="dep1" />
                  </AdvancedLabel>
                </Row>
              </Row>
              <Row>
                <Row>Soil Profile Settings</Row>
                <Row className="mb-3">
                  <AdvancedLabel text="Soil profile field capacity">
                    <Field className="form-control" type="number" name="dep2" />
                  </AdvancedLabel>
                </Row>
                <Row className="mb-3">
                  <AdvancedLabel text="Soil profile wilting point">
                    <Field className="form-control" type="number" name="dep3" />
                  </AdvancedLabel>
                </Row>
                <Row className="mb-3">
                  <AdvancedLabel text="Depth of soil evaporation layer (ft)">
                    <Field className="form-control" type="number" name="dep4" />
                  </AdvancedLabel>
                </Row>
                <Row className="mb-3">
                  <AdvancedLabel text="Soil surface field capacity">
                    <Field className="form-control" type="number" name="dep5" />
                  </AdvancedLabel>
                </Row>
                <Row className="mb-3">
                  <AdvancedLabel text="Soil surface writing point">
                    <Field className="form-control" type="number" name="dep6" />
                  </AdvancedLabel>
                </Row>
                <Row className="mb-3">
                  <AdvancedLabel text="Readily evaporable water">
                    <Field className="form-control" type="number" name="dep7" />
                  </AdvancedLabel>
                </Row>
              </Row>
            </Col>
            <Col md="8">
              <Row>
                <span>Field, Crop, and Management Settings</span>
              </Row>
            </Col>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AdvancedSettings;
