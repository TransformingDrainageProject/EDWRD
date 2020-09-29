import React from 'react';
import { useFormikContext } from 'formik';
import { Col, Container, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import FormCard from '../FormCard';
import AdvancedSettingsForm from '../AdvancedSettingsForm';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import {
  MyInputField,
  MyRadioField,
  MySelectField,
} from '../FormikComponents/MyFields';
import UnitGroup from '../FormikComponents/UnitGroup';

import { cropManagementHelp } from './cropManagementHelp';
import { irrdepOptions } from './constants';
import updateGrowingSeasonFields from '../utils/updateGrowingSeasonFields';
import updateKCandCropHeight from '../utils/updateKCandCropHeight';

const CropManagementForm = (props) => {
  const { fieldState, frzThwDates, unitType } = props;
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  function cropTypeOnChange(value) {
    // update growing seasons date fields in adv. settings
    updateGrowingSeasonFields(
      { setFieldValue, setFieldTouched },
      value,
      unitType,
      fieldState,
      frzThwDates
    );
    // update growing seasons kc and crop height fields in adv. settings
    updateKCandCropHeight({ setFieldValue, setFieldTouched }, value, unitType);
  }

  const cropSelectionOptions = [
    { label: 'Corn', value: 'corn' },
    { label: 'Soybean', value: 'soybean' },
  ];

  return (
    <Container fluid>
      <Row>
        <Col className="mb-4" md={4} lg={2}>
          <FormCard
            label="Select crop"
            helpText={cropManagementHelp.cropSelection}
            name="cropSelection"
          >
            <MyRadioField
              name="cropSelection"
              options={cropSelectionOptions}
              onChange={cropTypeOnChange}
            />
            <ErrorMessage name="cropSelection" />
          </FormCard>
        </Col>
        <Col className="mb-4" md={8} lg={5}>
          <FormCard
            label="How much do you want to irrigate each time?"
            helpText={cropManagementHelp.irrdep}
            name="irrdep"
          >
            <div>
              <Input
                type="radio"
                name="irrdepRadio"
                value="variable"
                checked={values.irrdepType === 'variable'}
                onBlur={() => setFieldTouched('irrdepType', true)}
                onChange={(e) => {
                  setFieldValue('irrdepType', 'variable');
                  setFieldTouched('irrdep', false);
                  setFieldValue('irrdep', 'capacity90');
                }}
              />
              <span style={{ display: 'inline-block' }}>Variable amount</span>
              <MySelectField
                name="irrdep"
                options={irrdepOptions}
                disabled={values.irrdepType === 'fixed' ? true : false}
              />
            </div>
            {values.irrdepType === 'variable' &&
            values.irrdep === 'deficitOnly' ? (
              <div className="mt-3">
                <span style={{ display: 'inline-block' }}>
                  Minimum irrigation application depth
                </span>
                <UnitGroup unit="inches" unitLabel="depth" unitType={unitType}>
                  <MyInputField type="number" name="irrdepMin" step="0.1" />
                </UnitGroup>
                <ErrorMessage name="irrdepMin" />
              </div>
            ) : null}
            <div className="mt-3">
              <Input
                type="radio"
                name="irrdepRadio"
                value="fixed"
                checked={values.irrdepType === 'fixed'}
                onBlur={() => setFieldTouched('irrdepType', true)}
                onChange={(e) => {
                  setFieldValue('irrdepType', 'fixed');
                  setFieldTouched('irrdep', false);
                  if (values.unitType === 'us') {
                    setFieldValue('irrdep', 1);
                  } else {
                    setFieldValue('irrdep', 25.4);
                  }
                }}
              />
              <span style={{ display: 'inline-block' }}>Fixed amount</span>
              <UnitGroup unit="inches" unitType={unitType}>
                <MyInputField
                  type="number"
                  name="irrdep"
                  step="0.1"
                  disabled={values.irrdepType === 'variable' ? true : false}
                />
              </UnitGroup>
            </div>
            <ErrorMessage name="irrdep" />
          </FormCard>
        </Col>
        <Col className="mb-4" md={12} lg={5}>
          <FormCard
            label="Show crop growth and other advanced inputs"
            helpText={cropManagementHelp.advSettings}
            name="advSettings"
          >
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
