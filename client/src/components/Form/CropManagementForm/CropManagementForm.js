import React from 'react';
import { Field } from 'formik';
import { Button } from 'reactstrap';

import FormCard from '../FormCard';
import { RadioButton, RadioButtonGroup } from '../../RadioInput';

const CropManagementForm = props => {
  const { errors, touched, values } = props;

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
            <Field
              className="form-control"
              component="select"
              name="irrigateAmount"
            >
              <option value="1">1 inch</option>
            </Field>
          </FormCard>
        </div>
        <div className="col-md-4 text-center">
          <FormCard label="Show crop growth and other advanced inputs">
            <Button style={{ backgroundColor: '#edb229', height: '75px' }}>
              <strong>Open Advanced Settings</strong>
            </Button>
          </FormCard>
        </div>
      </div>
      <div className="row mb-4">
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
    </div>
  );
};

export default CropManagementForm;
