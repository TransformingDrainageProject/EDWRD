import React from 'react';

import DateRangePicker from '../FormikComponents/DateRangePicker';
import ErrorMessage from '../FormikComponents/ErrorMessage';
import { MyCustomField, MyInputField } from '../FormikComponents/MyFields';

const AdvancedSeasonTableBody = () => {
  return (
    <tbody>
      <tr>
        <th>Planting Date</th>
        <th>
          <MyCustomField name="plantDate" component={DateRangePicker} />
          <ErrorMessage name="plantDateStart" />
          <ErrorMessage name="plantDateEnd" />
        </th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>Initial establishment</th>
        <th>
          <MyCustomField name="initDate" component={DateRangePicker} />
          <ErrorMessage name="initDateStart" />
          <ErrorMessage name="initDateEnd" />
        </th>
        <th>
          <MyInputField type="number" name="initKC" step="0.05" />
          <ErrorMessage name="initKC" />
        </th>
        <th>
          <MyInputField type="number" name="initCropHeight" step="0.1" />
          <ErrorMessage name="initCropHeight" />
        </th>
      </tr>
      <tr>
        <th>Development</th>
        <th>
          <MyCustomField name="devDate" component={DateRangePicker} />
          <ErrorMessage name="devDateStart" />
          <ErrorMessage name="devDateEnd" />
        </th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>Mid-season</th>
        <th>
          <MyCustomField name="midDate" component={DateRangePicker} />
          <ErrorMessage name="midDateStart" />
          <ErrorMessage name="midDateEnd" />
        </th>
        <th>
          <MyInputField type="number" name="midKC" step="0.05" />
          <ErrorMessage name="midKC" />
        </th>
        <th>
          <MyInputField type="number" name="midCropHeight" step="0.1" />
          <ErrorMessage name="midCropHeight" />
        </th>
      </tr>
      <tr>
        <th>Late season</th>
        <th>
          <MyCustomField name="lateDate" component={DateRangePicker} />
          <ErrorMessage name="lateDateStart" />
          <ErrorMessage name="lateDateEnd" />
        </th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>Harvest date</th>
        <th>
          <MyCustomField
            name="harvestDate"
            component={DateRangePicker}
            disabled="endDate"
          />
          <ErrorMessage name="harvestDateStart" />
        </th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>Soil Freeze</th>
        <th>
          <MyCustomField name="soilDate" component={DateRangePicker} />
          <ErrorMessage name="soilDateStart" />
          <ErrorMessage name="soilDateEnd" />
        </th>
        <th></th>
        <th></th>
      </tr>
    </tbody>
  );
};

export default AdvancedSeasonTableBody;
