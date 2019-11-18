import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Field } from 'formik';

import Checkbox from '../../Checkbox';
import FormCard from '../FormCard';
import UnitGroup from '../../UnitGroup';

const FieldReservoirForm = props => {
  const { unitType } = props;

  return (
    <Container>
      <Row>
        <Col className="mb-4" md="4">
          <FormCard label="What is the soil type?">
            <Field className="form-control" component="select" name="soilType">
              <option value="silt">Silt loam</option>
            </Field>
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="What is the average depth to the tile drains?">
            <UnitGroup unit="feet" unitLabel="depth" unitType={unitType}>
              <Field className="form-control" type="number" name="depthTile" />
            </UnitGroup>
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="How much of the field is drained?">
            <UnitGroup unit="acres" unitType={unitType}>
              <Field
                className="form-control"
                type="number"
                name="fieldDrained"
              />
            </UnitGroup>
            <Field
              type="checkbox"
              name="surfaceRunoff"
              label="Include Surface Runoff"
              component={Checkbox}
            />
          </FormCard>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4" md="8">
          <FormCard label="How large of a reservoir would you like to evaluate?">
            <Row>
              <Col className="mb-4" md="6">
                <UnitGroup unit="acres" unitType={unitType}>
                  <Field
                    className="form-control"
                    type="number"
                    name="evaluateAcre"
                  />
                </UnitGroup>
              </Col>
              <Col className="mb-4" md="6">
                <UnitGroup
                  unit="feet"
                  unitLabel="avg. depth"
                  unitType={unitType}
                >
                  <Field
                    className="form-control"
                    type="number"
                    name="evaluateAvgDepth"
                  />
                </UnitGroup>
              </Col>
            </Row>
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="How much of the field will be irrigated?">
            <UnitGroup unit="acres" unitType={unitType}>
              <Field className="form-control" type="number" name="irrigated" />
            </UnitGroup>
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

export default FieldReservoirForm;
