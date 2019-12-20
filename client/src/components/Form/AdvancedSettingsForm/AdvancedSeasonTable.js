import React from 'react';
import { Field } from 'formik';
import { Col, Row, Table } from 'reactstrap';

import ErrorMessage from '../FormikComponents/ErrorMessage';

const AdvancedSeasonTable = props => {
  const { unitType } = props;

  return (
    <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
      <Col>
        <Row>
          <Col>
            <h4 className="text-center">Growing and Non-growing Seasons</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Starting Date</th>
                  <th>Ending Date</th>
                  <th>Crop Coefficient</th>
                  <th>
                    Maximum Crop Height ({unitType === 'us' ? 'ft' : 'm'})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Planting Date</th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="plantDateStart"
                    />
                    <ErrorMessage name="plantDateStart" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="plantDateEnd"
                    />
                    <ErrorMessage name="plantDateEnd" />
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Initial establishment</th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="initDateStart"
                    />
                    <ErrorMessage name="initDateStart" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="initDateEnd"
                    />
                    <ErrorMessage name="initDateEnd" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="initKC"
                      step="0.05"
                    />
                    <ErrorMessage name="initKC" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="initCropHeight"
                      step="0.1"
                    />
                    <ErrorMessage name="initCropHeight" />
                  </th>
                </tr>
                <tr>
                  <th>Development</th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="devDateStart"
                    />
                    <ErrorMessage name="devDateStart" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="devDateEnd"
                    />
                    <ErrorMessage name="devDateEnd" />
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Mid-season</th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="midDateStart"
                    />
                    <ErrorMessage name="midDateStart" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="midDateEnd"
                    />
                    <ErrorMessage name="midDateEnd" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="midKC"
                      step="0.05"
                    />
                    <ErrorMessage name="midKC" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="midCropHeight"
                      step="0.1"
                    />
                    <ErrorMessage name="midCropHeight" />
                  </th>
                </tr>
                <tr>
                  <th>Late season</th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="lateDateStart"
                    />
                    <ErrorMessage name="lateDateStart" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="lateDateEnd"
                    />
                    <ErrorMessage name="lateDateEnd" />
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Harvest date</th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="harvestDateStart"
                    />
                    <ErrorMessage name="harvestDateStart" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="harvestDateEnd"
                    />
                    <ErrorMessage name="harvestDateEnd" />
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Soil Freeze</th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="soilDateStart"
                    />
                    <ErrorMessage name="soilDateStart" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="soilDateEnd"
                    />
                    <ErrorMessage name="soilDateEnd" />
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AdvancedSeasonTable;
