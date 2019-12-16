import React from 'react';
import { Field } from 'formik';
import { Col, Row, Table } from 'reactstrap';

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
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="plantDateEnd"
                    />
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
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="initDateEnd"
                    />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="initKC"
                    />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="initCropHeight"
                    />
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
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="devDateEnd"
                    />
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
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="midDateEnd"
                    />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="midKC"
                    />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="midCropHeight"
                    />
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
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="lateDateEnd"
                    />
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
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="harvestDateEnd"
                    />
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
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="date"
                      name="soilDateEnd"
                    />
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
