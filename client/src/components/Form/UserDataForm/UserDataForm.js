import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Field } from 'formik';

import Checkbox from '../../Checkbox';
import FormCard from '../FormCard';

const UserDataForm = () => {
  return (
    <Container>
      <Row>
        <Col className="mb-4" md="6">
          <FormCard>
            <Field
              type="checkbox"
              name="dailyUpload"
              label="Yes, I will upload a file"
              component={Checkbox}
            />
          </FormCard>
        </Col>
        <Col className="mb-4" md="6">
          <FormCard>
            <Field
              type="checkbox"
              name="exampleData"
              label="No, I would like to choose example data from a different site"
              component={Checkbox}
            />
          </FormCard>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDataForm;
