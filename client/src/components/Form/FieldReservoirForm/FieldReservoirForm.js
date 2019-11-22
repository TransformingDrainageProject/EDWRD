import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import Checkbox from '../FormikComponents/Checkbox';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import FormCard from '../FormCard';
import UnitGroup from '../UnitGroup';

const FieldReservoirForm = props => {
  const { unitType } = props;

  return (
    <Container>
      <Row>
        <Col className="mb-4" md="4">
          <FormCard label="What is the soil type?">
            <Field className="form-control" component="select" name="soilType">
              <option value="loam">Loam</option>
              <option value="siltLoam">Silt loam</option>
              <option value="silt">Silt</option>
              <option value="siltClayLoam">Silt Clay Loam</option>
              <option value="siltyClay">Silty Clay</option>
              <option value="clay">Clay</option>
            </Field>
            <ErrorMessage name="soilType" />
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="What is the average depth to the tile drains?">
            <UnitGroup unit="feet" unitLabel="depth" unitType={unitType}>
              <Field
                className="form-control"
                type="number"
                name="zr"
                step="0.1"
              />
            </UnitGroup>
            <ErrorMessage name="zr" />
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="How much of the field is drained?">
            <UnitGroup unit="acres" unitType={unitType}>
              <Field
                className="form-control"
                type="number"
                name="darea"
                step="0.1"
              />
            </UnitGroup>
            <ErrorMessage name="darea" />
            <Field
              type="checkbox"
              name="dareaIncSurfaceRunoff"
              label="Include Surface Runoff"
              component={Checkbox}
            />
            <ErrorMessage name="dareaIncSurfaceRunoff" />
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
                    name="rarea"
                    step="0.1"
                  />
                </UnitGroup>
                <ErrorMessage name="rarea" />
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
                    name="rdep"
                    step="0.1"
                  />
                </UnitGroup>
                <ErrorMessage name="rdep" />
              </Col>
            </Row>
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="How much of the field will be irrigated?">
            <UnitGroup unit="acres" unitType={unitType}>
              <Field
                className="form-control"
                type="number"
                name="iarea"
                step="0.1"
              />
            </UnitGroup>
            <ErrorMessage name="iarea" />
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

FieldReservoirForm.propTypes = {
  unitType: PropTypes.string
};

export default FieldReservoirForm;
