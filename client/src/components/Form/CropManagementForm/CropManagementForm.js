import React, { useState } from 'react';
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

import { irrDepUSOptions, irrDepMetricOptions } from './constants';
import updateGrowingSeasonFields from '../utils/updateGrowingSeasonFields';
import updateKCandCropHeight from '../utils/updateKCandCropHeight';

const CropManagementForm = props => {
  const { fieldState, frzThwDates, unitType } = props;
  const [irrdepRadioSelection, setIrrDepRadioSelection] = useState('select');
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
            <div>
              <Input
                type="radio"
                name="irrdepRadio"
                value="select"
                checked={irrdepRadioSelection === 'select'}
                onChange={e => {
                  setIrrDepRadioSelection(e.target.value);
                  setFieldValue(
                    'irrdep',
                    unitType === 'us'
                      ? irrDepUSOptions[0].value
                      : irrDepMetricOptions[0].value
                  );
                }}
              />
              <span style={{ display: 'inline-block' }}>Predefined</span>
              <MySelectField
                name="irrdep"
                options={
                  unitType === 'us' ? irrDepUSOptions : irrDepMetricOptions
                }
                disabled={irrdepRadioSelection === 'manual' ? true : false}
              />
            </div>
            <div className="mt-2">
              <Input
                type="radio"
                name="irrdepRadio"
                value="manual"
                checked={irrdepRadioSelection === 'manual'}
                onChange={e => setIrrDepRadioSelection(e.target.value)}
              />
              <span style={{ display: 'inline-block' }}>Manual</span>
              <UnitGroup unit="inches" unitType={unitType}>
                <MyInputField
                  type="number"
                  name="irrdep"
                  step="0.1"
                  disabled={irrdepRadioSelection === 'select' ? true : false}
                />
              </UnitGroup>
            </div>
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
