import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Field } from 'formik';

import FormCard from '../FormCard';
import { RadioButton, RadioButtonGroup } from '../../RadioInput';

const UserDataForm = props => {
  const { errors, touched, values } = props;

  return (
    <Container>
      <Row>
        <Col className="mb-4">
          <FormCard label="Select one" hideHelp={true}>
            <Row>
              <Col md="4">
                <RadioButtonGroup
                  id="dataSelection"
                  label="Select one"
                  value={values.radioGroup}
                  error={errors.radioGroup}
                  touched={touched.radioGroup}
                >
                  <Field
                    component={RadioButton}
                    name="dataSelection"
                    id="no"
                    label="No, I would like to choose example data from a different site"
                  />
                  <Field
                    component={RadioButton}
                    name="dataSelection"
                    id="yes"
                    label="Yes, I wil upload a file"
                  />
                </RadioButtonGroup>
              </Col>
              <Col md="8"></Col>
            </Row>
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDataForm;
