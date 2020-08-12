import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

import ChartDescription from '../ChartDescription';
import MonthlyChart from '../MonthlyChart';
import VariableButtons from './VariableButtons';

import chartVariables from './variables';
import updateChartData from '../utils/updateChartData';
import updateSelectedVol from '../utils/updateSelectedVol';
import updateSelectedYear from '../utils/updateSelectedYear';
import getYearInfo from '../utils/getYearInfo';

// category keys for different variable subsets (inflow, outflow, other)
const variableClasses = {
  inflow: ['overflowNitrateLoad', 'capturedNitrateLoad'],
  outflow: ['overflowSRPLoad', 'capturedSRPLoad'],
  other: ['tileNitrateLoad', 'tileSRPLoad'],
};

const ChartsNutrientCaptureOverflow = ({ chartData }) => {
  const [active, setActive] = useState([]);
  const [annualFilter, setAnnualFilter] = useState('all');
  const [selectedChartData, updateSelectedChartData] = useState(null);
  const [selectedVol, setSelectedVol] = useState(2);

  useEffect(() => {
    const data = updateChartData(chartData, active, annualFilter, selectedVol);
    updateSelectedChartData(data);
  }, [active, selectedVol]);

  const yearInfo = getYearInfo(chartData, active, selectedVol);
  const uniqueYears = yearInfo.uniqueYears;
  const yearRange = yearInfo.yearRange;

  return (
    <>
      <Row>
        <Col>
          Click on the buttons below to see results for each reservoir water
          balance metric across multiple reservoir sizes.
        </Col>
      </Row>
      <VariableButtons
        active={active}
        annualFilter={annualFilter}
        chartData={chartData}
        selectedVol={selectedVol}
        setActive={setActive}
        updateSelectedChartData={updateSelectedChartData}
      />
      <hr style={{ width: '50%' }} />
      {active.length > 0 && selectedVol ? (
        <>
          <Row className="text-center">
            <Col md={10}>
              <h1>
                {`Reservoir size = ${chartData.rvol[selectedVol]}${
                  chartData.unit_type === 'us' ? 'ac' : 'ha'
                }`}
                {annualFilter !== 'all' ? ` (${annualFilter})` : `${yearRange}`}
              </h1>
              <h2>{`(depth = ${chartData.rdep}${
                chartData.unit_type === 'us' ? 'ft' : 'm'
              })`}</h2>
            </Col>
          </Row>

          <Row className="mb-3 text-center">
            <Col md={10}>
              <MonthlyChart
                active={active}
                annualFilter={annualFilter}
                chartData={selectedChartData}
                datasetNames={chartVariables}
                color="green"
                unitLabel={
                  chartData.unit_type === 'us' ? 'inches' : 'millimeters'
                }
                rdep={chartData.rdep}
                unit_type={chartData.unit_type}
                variableClasses={variableClasses}
              />
            </Col>
            <Col md={2}>
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
                          {vol}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : null}
      <Row>
        <Col>
          <ChartDescription
            name="nutrientCaptureOverflow"
            title="Nutrient Capture Overflow"
            text="This graph shows the monthly amount of nitrate and reactive 
                  phosphorus load delivered through tile drain flow, and how 
                  much of this load is captured and stored, for a specific 
                  reservoir size across all years. Use the buttons at the top 
                  right of the graph to view a specific year or reservoir size. 
                  Click on the question mark to learn more about how this water 
                  balance is calculated."
          />
        </Col>
      </Row>
    </>
  );
};

export default ChartsNutrientCaptureOverflow;
