import React from 'react';
import { Field } from 'formik';
import { Col, Row, Table } from 'reactstrap';

import DateRangePicker, { Arrow } from '../FormikComponents/DateRangePicker';
import ErrorMessage from '../FormikComponents/ErrorMessage';

import { STATES } from '../utils/constants';

const AdvancedSeasonTable = props => {
  const { fieldState, unitType } = props;

  const startEndDateHeaderStyle = {
    display: 'inline-block',
    padding: '0 11px 0',
    width: '130px',
  };

  return (
    <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
      <Col>
        <Row>
          <Col>
            <h4 className="text-center">
              Growing and Non-growing Seasons - {STATES[fieldState]}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <span style={startEndDateHeaderStyle}>Start Date</span>
                    <Arrow />
                    <span style={startEndDateHeaderStyle}>End Date</span>
                  </th>
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
                      component={DateRangePicker}
                      name="plantDate"
                    />
                    <ErrorMessage name="plantDateStart" />
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
                      component={DateRangePicker}
                      name="initDate"
                    />
                    <ErrorMessage name="initDateStart" />
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
                      component={DateRangePicker}
                      name="devDate"
                    />
                    <ErrorMessage name="devDateStart" />
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
                      component={DateRangePicker}
                      name="midDate"
                    />
                    <ErrorMessage name="midDateStart" />
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
                      component={DateRangePicker}
                      name="lateDate"
                    />
                    <ErrorMessage name="lateDateStart" />
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
                      component={DateRangePicker}
                      name="harvestDate"
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
                    <Field
                      className="form-control"
                      component={DateRangePicker}
                      name="soilDate"
                    />
                    <ErrorMessage name="soilDateStart" />
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
