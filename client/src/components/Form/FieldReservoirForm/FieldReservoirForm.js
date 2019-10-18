import React from 'react';
import { Field } from 'formik';

import Checkbox from '../../Checkbox';
import FormCard from '../FormCard';
import UnitGroup from '../../UnitGroup';

const FieldReservoirForm = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4">
          <FormCard label="What is the soil type?">
            <Field className="form-control" component="select" name="soilType">
              <option value="silt">Silt loam</option>
            </Field>
          </FormCard>
        </div>
        <div className="col-sm-4">
          <FormCard label="What is the average depth to the tile drains?">
            <UnitGroup unit="depth (ft)">
              <Field className="form-control" type="number" name="depthTile" />
            </UnitGroup>
          </FormCard>
        </div>
        <div className="col-sm-4">
          <FormCard label="How much of the field is drained?">
            <UnitGroup unit="acres">
              <Field
                className="form-control"
                type="number"
                name="fieldDrained"
              />
            </UnitGroup>
            <Field
              type="checkbox"
              name="surfaceRunoff"
              label="Include Surface Runoff"
              component={Checkbox}
            />
          </FormCard>
        </div>
      </div>
      <div className="row" style={{ marginTop: '1rem' }}>
        <div className="col-sm-8">
          <FormCard label="How large of a reservoir would you like to evaluate?">
            <div className="row">
              <div className="col-md-6">
                <UnitGroup unit="acres">
                  <Field
                    className="form-control"
                    type="number"
                    name="evaluateAcre"
                  />
                </UnitGroup>
              </div>
              <div className="col-md-6">
                <UnitGroup unit="avg. depth (ft)">
                  <Field
                    className="form-control"
                    type="number"
                    name="evaluateAvgDepth"
                  />
                </UnitGroup>
              </div>
            </div>
          </FormCard>
        </div>
        <div className="col-sm-4">
          <FormCard label="How much of the field will be irrigated?">
            <UnitGroup unit="acres">
              <Field className="form-control" type="number" name="irrigated" />
            </UnitGroup>
          </FormCard>
        </div>
      </div>
    </div>
  );
};

export default FieldReservoirForm;
