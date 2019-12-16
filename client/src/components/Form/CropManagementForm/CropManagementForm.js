import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import FormCard from '../FormCard';
import AdvancedSettingsForm from '../AdvancedSettingsForm';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import { RadioButton, RadioButtonGroup } from '../FormikComponents/RadioInput';
import UnitGroup from '../UnitGroup';

import { updateCropFields } from './updateCropFields';

const CropManagementForm = props => {
  const {
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
    unitType,
    fieldState
  } = props;

  function cropTypeOnChange(e) {
    // update crop type field
    setFieldValue('cropSelection', e.target.value);
    setFieldTouched('cropSelection', true);
    // update fields dependent on crop type in adv. settings
    updateCropFields(
      { setFieldValue, setFieldTouched },
      e.target.value,
      unitType,
      fieldState
    );
  }

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
                onChange={cropTypeOnChange}
              />
              <Field
                component={RadioButton}
                name="cropSelection"
                id="soybean"
                label="Soybean"
                onChange={cropTypeOnChange}
              />
            </RadioButtonGroup>
            <ErrorMessage name="cropSelection" />
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="How much do you want to irrigate each time?">
            <UnitGroup unit="inches" unitType={unitType}>
              <Field
                className="form-control"
                component="select"
                name="irrdep"
                step="0.1"
              >
                <option value="1">1</option>
              </Field>
            </UnitGroup>
            <ErrorMessage name="irrdep" />
          </FormCard>
        </Col>
        <Col className="mb-4" md="4">
          <FormCard label="Water Depletion Factor">
            <Field
              className="form-control"
              type="number"
              name="pfact"
              step="0.1"
            />
            <ErrorMessage name="pfact" />
          </FormCard>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mb-4">
          <FormCard label="Show crop growth and other advanced inputs">
            <AdvancedSettingsForm
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              unitType={unitType}
              fieldState={fieldState}
            />
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

CropManagementForm.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  unitType: PropTypes.string
};

export default CropManagementForm;
