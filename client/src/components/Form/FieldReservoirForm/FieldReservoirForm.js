import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Container, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import ErrorMessage from '../FormikComponents/ErrorMessage';
import FormCard from '../FormCard';
import { MyInputField, MySelectField } from '../FormikComponents/MyFields';
import UnitGroup from '../FormikComponents/UnitGroup';

import { soilTypeOptions } from './constants';
import { updateSoilFields } from './updateSoilFields';

const FieldReservoirForm = props => {
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
    <Container>
      <Row>
        <Col className="mb-4" md="4">
          <FormCard
            label="What is the soil type?"
            helpText={
              <span>
                Select the most representative soil type in your field. EDWRD
                uses this soil type to estimate the water holding capacity of
                the soil to support crops. You may customize this by going to “
                <strong>Advanced Settings</strong>” below and adjusting values
                for “Soil profile field capacity” and “Soil profile wilting
                point”.
              </span>
            }
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
        <Col className="mb-4" md="4">
          <FormCard
            label="What is the average depth to the tile drains?"
            helpText={
              <span>
                Enter a value that represents that average depth to tile drains
                in your field. EDWRD uses this value to define the soil profile
                depth used in estimating the total available water for growing
                crops. The deeper the tile drain depth then more water that can
                be held by the soil between the surface and tile drain.
              </span>
            }
            name="zr"
          >
            <UnitGroup unit="feet" unitLabel="depth" unitType={unitType}>
              <MyInputField type="number" name="zr" step="0.1" />
            </UnitGroup>
            <ErrorMessage name="zr" />
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="How much of the field is drained?">
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
        <Col className="mb-4" md="8">
          <FormCard label="How large of a reservoir would you like to evaluate?">
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
        <Col className="mb-4" md="4">
          <FormCard label="How much of the field will be irrigated?">
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
  unitType: PropTypes.string
};

export default FieldReservoirForm;
