import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Container, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import ErrorMessage from '../FormikComponents/ErrorMessage';
import FormCard from '../FormCard';
import { MyInputField, MySelectField } from '../FormikComponents/MyFields';
import UnitGroup from '../FormikComponents/UnitGroup';

import { fieldReservoirHelp } from './fieldReservoirHelp';
import { soilTypeOptions } from './constants';
import { updateSoilFields } from './updateSoilFields';

const FieldReservoirForm = (props) => {
  const { unitType } = props;
  const { setFieldValue, setFieldTouched } = useFormikContext();

  function soilTypeOnChange(e) {
    // update soil type field
    setFieldValue('soilType', e.target.value);
    setFieldTouched('soilType', true);
    // update fields dependent on soil type
    updateSoilFields(
      { setFieldValue, setFieldTouched },
      e.target.value,
      unitType
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mb-4" md={6} lg={4}>
          <FormCard
            label="What is the soil type?"
            helpText={fieldReservoirHelp.soilType}
            name="soilType"
          >
            <MySelectField
              name="soilType"
              onChange={soilTypeOnChange}
              options={soilTypeOptions}
            />
            <ErrorMessage name="soilType" />
          </FormCard>
        </Col>
        <Col className="mb-4" md={6} lg={4}>
          <FormCard
            label="What is the average depth to the tile drains?"
            helpText={fieldReservoirHelp.zr}
            name="zr"
          >
            <UnitGroup unit="feet" unitLabel="depth" unitType={unitType}>
              <MyInputField type="number" name="zr" step="0.1" />
            </UnitGroup>
            <ErrorMessage name="zr" />
          </FormCard>
        </Col>
        <Col className="mb-4" md={12} lg={4}>
          <FormCard
            label="How much of the field is drained?"
            helpText={fieldReservoirHelp.darea}
            name="darea"
          >
            <UnitGroup unit="acres" unitType={unitType}>
              <MyInputField type="number" name="darea" step="0.1" />
            </UnitGroup>
            <ErrorMessage name="darea" />
            <Label check className="mt-2" for="dareaIncSurfaceRunoff">
              <MyInputField type="checkbox" name="dareaIncSurfaceRunoff" />
              Include Surface Runoff
            </Label>
            <ErrorMessage name="dareaIncSurfaceRunoff" />
          </FormCard>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4" md={12} lg={8}>
          <FormCard
            label="How large of a reservoir would you like to evaluate?"
            helpText={fieldReservoirHelp.rarea}
            name="rarea"
          >
            <Row>
              <Col className="mb-4" md="6">
                <UnitGroup unit="acres" unitType={unitType}>
                  <MyInputField type="number" name="rarea" step="0.1" />
                </UnitGroup>
                <ErrorMessage name="rarea" />
              </Col>
              <Col className="mb-4" md="6">
                <UnitGroup
                  unit="feet"
                  unitLabel="avg. depth"
                  unitType={unitType}
                >
                  <MyInputField type="number" name="rdep" step="0.1" />
                </UnitGroup>
                <ErrorMessage name="rdep" />
              </Col>
            </Row>
          </FormCard>
        </Col>
        <Col className="mb-4" md={12} lg={4}>
          <FormCard
            label="How much of the field will be irrigated?"
            helpText={fieldReservoirHelp.iarea}
            name="iarea"
          >
            <UnitGroup unit="acres" unitType={unitType}>
              <MyInputField type="number" name="iarea" step="0.1" />
            </UnitGroup>
            <ErrorMessage name="iarea" />
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

FieldReservoirForm.propTypes = {
  unitType: PropTypes.string,
};

export default FieldReservoirForm;
