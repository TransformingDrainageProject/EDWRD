import React, { useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

import AnnualChart from '../AnnualChart';
import ChartDescription from '../ChartDescription';
import DownloadDataButton from '../DownloadDataButton';

import chartVariables from './variables';
import VariableButtons from './VariableButtons';

const ChartsAnnualPerformance = ({ chartData }) => {
  const [activeChart, setActiveChart] = useState(0);
  const [annualFilter, setAnnualFilter] = useState('all');
  const [avgLineOnly, toggleAvgLineOnly] = useState(false);

  const selectedChartData =
    chartData['annual'][chartVariables[activeChart].key];

  const uniqueYears = [
    ...new Set(selectedChartData.yearly.map((record) => record.year)),
  ];

  const yearRange =
    uniqueYears.length > 1
      ? ` (${uniqueYears[0]} - ${uniqueYears.slice(-1)[0]})`
      : ` (${uniqueYears[0]})`;

  function yearOnChange(event) {
    const year = event.target.value;
    setAnnualFilter(year);
  }

  return (
    <>
      <Row>
        <Col>
          Click on the buttons below to see results for each annual performance
          metric across multiple reservoir sizes.
        </Col>
      </Row>
      <VariableButtons active={activeChart} setActive={setActiveChart} />
      <Row className="text-center">
        <Col>
          <h1>
            {chartVariables[activeChart].title}
            {annualFilter !== 'all' ? ` (${annualFilter})` : `${yearRange}`}
          </h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={10}>
          <AnnualChart
            chartData={selectedChartData}
            color="green"
            avgLineOnly={avgLineOnly}
            unitLabel={chartVariables[activeChart].unit}
            annualFilter={annualFilter}
            rdep={chartData.rdep}
            rarea={chartData.rarea}
            unit_type={chartData.unit_type}
          />
        </Col>
        <Col md={2}>
          <Row className="mb-1">
            <Col>
              <Label check for="avgLineOnly" style={{ marginLeft: 20 }}>
                <Input
                  type="checkbox"
                  name="avgLineOnly"
                  checked={avgLineOnly}
                  onChange={() => toggleAvgLineOnly(!avgLineOnly)}
                />
                View average line only
              </Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type="select"
                name="displaySpecifcYear"
                onChange={yearOnChange}
              >
                <option value="all">View all years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <ChartDescription
            name="annualAppliedIrrigation"
            title="Annual Applied Irrigation"
            text="This graph shows the annual irrigation and water quality
                  performance metrics for a range of reservoir sizes across
                  all years at this location. Use the buttons at the top right
                  of the graph to view a specific year. Click on the question
                  mark to learn more about how these metrics are estimated."
          />
        </Col>
      </Row>
      <DownloadDataButton sessionID={chartData.sessionID} type="annual" />
    </>
  );
};

export default ChartsAnnualPerformance;
