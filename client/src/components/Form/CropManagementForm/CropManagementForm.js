import React from 'react';
import { Field } from 'formik';

import FormCard from '../FormCard';
import AdvancedSettings from '../AdvancedSettings';
import { RadioButton, RadioButtonGroup } from '../../RadioInput';
import UnitGroup from '../../UnitGroup';

const CropManagementForm = props => {
  const { errors, touched, values, unitType } = props;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-4">
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
        </div>
        <div className="col-md-4">
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
        </div>
        <div className="col-md-4">
          <FormCard label="Water Depletion Factor">
            <Field
              className="form-control"
              type="number"
              name="waterDepletionFactor"
            />
          </FormCard>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 text-center">
          <FormCard label="Show crop growth and other advanced inputs">
            <AdvancedSettings />
          </FormCard>
        </div>
      </div>
    </div>
  );
};

export default CropManagementForm;
