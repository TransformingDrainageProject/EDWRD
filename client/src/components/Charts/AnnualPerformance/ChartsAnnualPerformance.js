import React, { useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';

import AnnualChart from '../AnnualChart';
import ChartDescription from '../ChartDescription';
import DownloadDataButton from '../DownloadDataButton';
import YearlyTable from '../YearlyTable';
import VariableButtons from './VariableButtons';

import { getUniqueYears, getYearRange } from '../utils/getYearInfo';

const ChartsAnnualPerformance = ({ chartData }) => {
  const [activeChart, setActiveChart] = useState('');
  const [annualFilter, setAnnualFilter] = useState('all');
  const [avgLineOnly, toggleAvgLineOnly] = useState(false);
  const [showAnnualTable, toggleShowAnnualTable] = useState(false);

  let selectedChartData, uniqueYears, yearRange;

  function yearOnChange(event) {
    const year = event.target.value;
    setAnnualFilter(year);
  }

  if (activeChart) {
    selectedChartData = {
      precision: chartData.annual[activeChart].precision,
      rdep: chartData.rdep,
      unit: chartData.annual[activeChart].unit,
      unitType: chartData.unitType,
      values: chartData.annual[activeChart].values,
    };
    uniqueYears = getUniqueYears(selectedChartData.values);
    yearRange = getYearRange(uniqueYears);
  }

  return (
    <>
      <Row>
        <Col>
          Click on the buttons below to see results for each annual performance
          metric across multiple reservoir sizes.
        </Col>
      </Row>
      <VariableButtons
        active={activeChart}
        setActive={setActiveChart}
        chartVariables={chartData.annual}
      />
      {activeChart ? (
        <>
          <Row className="text-center">
            <Col>
              <h1>
                {selectedChartData.label}
                {annualFilter !== 'all' ? ` (${annualFilter})` : `${yearRange}`}
              </h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={10}>
              <AnnualChart
                annualFilter={annualFilter}
                avgLineOnly={avgLineOnly}
                chartData={selectedChartData}
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
        </>
      ) : null}
      <>
        {activeChart ? (
          <Button
            className="mb-3"
            style={{ backgroundColor: '#007cb3' }}
            onClick={() => toggleShowAnnualTable(!showAnnualTable)}
          >{`${
            showAnnualTable ? 'Hide' : 'View'
          } Table of Annual Values`}</Button>
        ) : null}
        {activeChart && showAnnualTable ? (
          <YearlyTable data={selectedChartData.values.yearly} />
        ) : null}
        <Row>
          <Col>
            <ChartDescription
              name="annualAppliedIrrigation"
              title="Annual Applied Irrigation"
              text="This graph shows the annual performance irrigation and water quality metrics for a range of reservoir sizes across all years at this location. Use the buttons at the top right of the graph to view only the average results, or results for a specific year."
            >
              <DownloadDataButton
                sessionID={chartData.sessionID}
                type="annual"
              />
            </ChartDescription>
          </Col>
        </Row>
      </>
    </>
  );
};

export default ChartsAnnualPerformance;
