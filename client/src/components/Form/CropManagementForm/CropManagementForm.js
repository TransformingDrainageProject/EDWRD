import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Field } from 'formik';

import FormCard from '../FormCard';
import AdvancedSettings from '../AdvancedSettings';
import { RadioButton, RadioButtonGroup } from '../../RadioInput';
import UnitGroup from '../../UnitGroup';

const CropManagementForm = props => {
  const { errors, touched, values, unitType } = props;

  return (
    <Container>
      <Row>
        <Col className="mb-4" md="4">
          <FormCard label="Select a crop">
            <RadioButtonGroup
              id="cropSelection"
              label="Select one"
              value={values.radioGroup}
              error={errors.radioGroup}
              touched={touched.radioGroup}
            >
              <Field
                component={RadioButton}
                name="cropSelection"
                id="corn"
                label="Corn"
              />
              <Field
                component={RadioButton}
                name="cropSelection"
                id="soybean"
                label="Soybean"
              />
            </RadioButtonGroup>
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="How much do you want to irrigate each time?">
            <UnitGroup unit="inches" unitType={unitType}>
              <Field
                className="form-control"
                component="select"
                name="irrigateAmount"
              >
                <option value="1">1</option>
              </Field>
            </UnitGroup>
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="Water Depletion Factor">
            <Field
              className="form-control"
              type="number"
              name="waterDepletionFactor"
            />
          </FormCard>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mb-4">
          <FormCard label="Show crop growth and other advanced inputs">
            <AdvancedSettings />
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

export default CropManagementForm;
