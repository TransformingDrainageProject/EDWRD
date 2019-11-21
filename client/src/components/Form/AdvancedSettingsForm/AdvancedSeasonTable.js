import React from 'react';
import { Field } from 'formik';
import { Col, Row, Table } from 'reactstrap';

const AdvancedSeasonTable = () => {
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
                  <th>Maximum Crop Height (ft)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Planting Date</th>
                  <th>
                    <Field className="form-control" type="date" name="dep31" />
                  </th>
                  <th>
                    <Field className="form-control" type="date" name="dep12" />
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Initial establishment</th>
                  <th>
                    <Field className="form-control" type="date" name="dep12" />
                  </th>
                  <th>
                    <Field className="form-control" type="date" name="dep13" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="dep14"
                    />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="dep15"
                    />
                  </th>
                </tr>
                <tr>
                  <th>Development</th>
                  <th>
                    <Field className="form-control" type="date" name="dep16" />
                  </th>
                  <th>
                    <Field className="form-control" type="date" name="dep17" />
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Mid-season</th>
                  <th>
                    <Field className="form-control" type="date" name="dep18" />
                  </th>
                  <th>
                    <Field className="form-control" type="date" name="dep19" />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="dep20"
                    />
                  </th>
                  <th>
                    <Field
                      className="form-control"
                      type="number"
                      name="dep21"
                    />
                  </th>
                </tr>
                <tr>
                  <th>Late season</th>
                  <th>
                    <Field className="form-control" type="date" name="dep22" />
                  </th>
                  <th>
                    <Field className="form-control" type="date" name="dep23" />
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Harvest date</th>
                  <th>
                    <Field className="form-control" type="date" name="dep32" />
                  </th>
                  <th>
                    <Field className="form-control" type="date" name="dep24" />
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Soil Freeze</th>
                  <th>
                    <Field className="form-control" type="date" name="dep26" />
                  </th>
                  <th>
                    <Field className="form-control" type="date" name="dep27" />
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
