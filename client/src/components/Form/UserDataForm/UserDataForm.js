import React from 'react';
import { Field } from 'formik';

import Checkbox from '../../Checkbox';
import FormCard from '../FormCard';

const UserDataForm = () => {
  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-4">
          <FormCard hideHelp={true}>
            <Field
              type="checkbox"
              name="dailyUpload"
              label="Yes, I will upload a file"
              showHelp={true}
              component={Checkbox}
            />
          </FormCard>
        </div>
      </div>
    </div>
  );
};

export default UserDataForm;
