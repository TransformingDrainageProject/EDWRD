import React from 'react';
import { Field, useFormikContext } from 'formik';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import FormCard from '../FormCard';
import AdvancedSettingsForm from '../AdvancedSettingsForm';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import { MyInputField, MyRadioField } from '../FormikComponents/MyFields';
import UnitGroup from '../FormikComponents/UnitGroup';

import updateGrowingSeasonFields from '../utils/updateGrowingSeasonFields';
import updateKCandCropHeight from '../utils/updateKCandCropHeight';

const CropManagementForm = props => {
  const { fieldState, frzThwDates, unitType } = props;
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  function cropTypeOnChange(e) {
    // update growing seasons date fields in adv. settings
    updateGrowingSeasonFields(
      { setFieldValue, setFieldTouched },
      e.target.value,
      unitType,
      fieldState,
      frzThwDates
    );
    // update growing seasons kc and crop height fields in adv. settings
    updateKCandCropHeight(
      { setFieldValue, setFieldTouched },
      e.target.value,
      unitType
    );
  }

  const cropSelectionOptions = [
    { label: 'Corn', value: 'corn' },
    { label: 'Soybean', value: 'soybean' },
  ];

  return (
    <Container>
      <Row>
        <Col className="mb-4" md="4">
          <FormCard label="Select a crop">
            <MyRadioField
              name="cropSelection"
              options={cropSelectionOptions}
              onChange={cropTypeOnChange}
            />
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
            <MyInputField type="number" name="pfact" step="0.05" />
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
              frzThwDates={frzThwDates}
            />
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

CropManagementForm.propTypes = {
  fieldState: PropTypes.string,
  frzThwDates: PropTypes.shape({
    freeze: PropTypes.number,
    thaw: PropTypes.number,
  }),
  unitType: PropTypes.string,
};

export default CropManagementForm;
