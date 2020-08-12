import React from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

import updateSelectedVol from './utils/updateSelectedVol';
import updateSelectedYear from './utils/updateSelectedYear';

const MonthlyOptions = ({
  chartData,
  active,
  selectedVol,
  setAnnualFilter,
  updateSelectedChartData,
  uniqueYears,
  annualFilter,
  setSelectedVol,
}) => (
  <>
    <Row className="mb-1">
      <Col>
        <FormGroup style={{ width: '100%' }}>
          <Label check for="selectYear">
            Select year
          </Label>
          <Input
            type="select"
            name="displaySpecifcYear"
            onChange={(e) =>
              updateSelectedYear(
                e.target.value,
                chartData,
                active,
                selectedVol,
                setAnnualFilter,
                updateSelectedChartData
              )
            }
            value={annualFilter}
          >
            <option value="all">All years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormGroup>
          <Label check for="changeReservoirSize">
            Select reservoir size
          </Label>
          <Input
            type="select"
            name="changeReservoirSize"
            onChange={(e) =>
              updateSelectedVol(
                e.target.value,
                chartData,
                active,
                annualFilter,
                setSelectedVol,
                updateSelectedChartData
              )
            }
            value={selectedVol}
            style={{ width: '100%' }}
          >
            {chartData.rvol.map((vol, idx) => (
              <option key={vol} value={idx}>
                {vol.toFixed(2)}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
    </Row>
  </>
);

export default MonthlyOptions;
