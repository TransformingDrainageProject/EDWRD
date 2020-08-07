import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import ChartDescription from './ChartDescription';
import MonthlyChart from './MonthlyChart';

import updateChartData from './utils/updateChartData';
import getYearInfo from './utils/getYearInfo';

const buttonStyle = {
  width: '70%',
  height: 75,
  maxWidth: '170px',
};

// category indices of water inputs
const waterInputs = ['capturedNitrateLoad', 'capturedSRPLoad'];

const chartCategories = [
  [
    {
      index: 0,
      key: 'tileNitrateLoad',
      title: 'Tile Nitrate Load',
      unit: 'inches',
    },
    {
      index: 1,
      key: 'tileSRPLoad',
      title: 'Tile SRP Load',
      unit: 'inches',
    },
    {
      index: 2,
      key: 'overflowNitrateLoad',
      title: 'Overflow Nitrate Load (Tile)',
      unit: 'inches',
    },
    {
      index: 3,
      key: 'capturedNitrateLoad',
      title: 'Captured Nitrate Load',
      unit: 'inches',
    },
  ],
  [
    {
      index: 4,
      key: 'overflowSRPLoad',
      title: 'Overflow SRP Load',
      unit: 'inches',
    },
    {
      index: 5,
      key: 'capturedSRPLoad',
      title: 'Captured SRP Load',
      unit: 'inches',
    },
  ],
];

const datasetNames = [];
chartCategories.forEach((category) => {
  category.forEach((item) => {
    datasetNames.push(item);
  });
});

const NavButtonRows = ({ active, updateActive }) =>
  chartCategories.map((row, idx) => (
    <Row key={`navrow-${idx}`} className="mb-1 text-center">
      {row.map((button) => (
        <Col key={button.index}>
          <Button
            className={!waterInputs.includes(button.key) ? 'output' : null}
            style={buttonStyle}
            onClick={() => updateActive(button.key)}
            active={active.includes(button.key)}
          >
            {button.title}
          </Button>
        </Col>
      ))}
    </Row>
  ));

const NavButtons = ({ active, updateActive }) => (
  <>
    <Row>
      <Col>
        <p>
          Click on the buttons below to see results for nutrient loading for a
          specific reservoir size on a monthly or annual basis.
        </p>
      </Col>
    </Row>
    <NavButtonRows active={active} updateActive={updateActive} />
  </>
);

const ChartsNutrientCaptureOverflow = ({ chartData }) => {
  const [active, setActive] = useState([]);
  const [annualFilter, setAnnualFilter] = useState('all');
  const [selectedChartData, updateSelectedChartData] = useState(null);
  const [selectedVol, setSelectedVol] = useState(2);

  useEffect(() => {
    const data = updateChartData(chartData, active, annualFilter, selectedVol);
    updateSelectedChartData(data);
  }, [active, selectedVol]);

  function updateActive(index) {
    let newActiveVariables = active.slice();
    if (active.includes(index)) {
      newActiveVariables = active.filter((i) => i !== index);
    } else {
      newActiveVariables.push(index);
    }
    setActive(newActiveVariables);
    const data = updateChartData(
      chartData,
      newActiveVariables,
      annualFilter,
      selectedVol
    );
    updateSelectedChartData(data);
  }

  function updateSelectedVol(vol) {
    setSelectedVol(vol);
    const data = updateChartData(chartData, active, annualFilter, vol);
    updateSelectedChartData(data);
  }

  function updateSelectedYear(year) {
    setAnnualFilter(year);
    const data = updateChartData(chartData, active, year, selectedVol);
    updateSelectedChartData(data);
  }

  const yearInfo = getYearInfo(chartData, active, selectedVol);
  const uniqueYears = yearInfo.uniqueYears;
  const yearRange = yearInfo.yearRange;

  return (
    <>
      <NavButtons active={active} updateActive={updateActive} />
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
                datasetNames={datasetNames}
                color="green"
                unitLabel={
                  chartData.unit_type === 'us' ? 'inches' : 'millimeters'
                }
                rdep={chartData.rdep}
                unit_type={chartData.unit_type}
                waterInputs={waterInputs}
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
                      onChange={(e) => updateSelectedYear(e.target.value)}
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
                      onChange={(e) => updateSelectedVol(e.target.value)}
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
            title="Nutrient Capture and Overflow"
            text={
              <Row>
                <Col>
                  <Row>
                    This graph shows the monthly amount of nitrate and reactive
                    phosphorus load delivered through tile drain flow, and how
                    much of this load is captured and stored, for a specific
                    reservoir size across all years. Use the buttons at the top
                    right of the graph to view a specific year or reservoir
                    size. Click on the question mark to learn more about how
                    this water balance is calculated.
                  </Row>
                  <hr />
                  <Row>
                    Individual Graph Buttons:
                    <ul>
                      <li>
                        <span style={{ color: '#007cb3' }}>
                          <em>Nitrate</em>
                        </span>
                        <ul>
                          <li>
                            Overflow Nitrate Load
                            <ul>
                              <li>
                                The total monthly amount of nitrate load that
                                overflows from the reservoir due to exceeding
                                the maximum water storage capacity.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Captured Nitrate Load
                            <ul>
                              <li>
                                The total monthly amount of nitrate load that is
                                captured and stored in the reservoir.
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span style={{ color: '#007cb3' }}>
                          <em>Reactive phosphorus</em>
                        </span>
                        <ul>
                          <li>
                            Overflow Reactive Phosphorus Load
                            <ul>
                              <li>
                                The total monthly amount of reactive phosphorus
                                load that overflows from the reservoir due to
                                exceeding the maximum water storage capacity.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Captured Reactive Phosphorus Load
                            <ul>
                              <li>
                                The total monthly amount of reactive phosphorus
                                load that is captured and stored in the
                                reservoir.
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span style={{ color: '#007cb3' }}>
                          <em>Not assigned</em>
                        </span>
                        <ul>
                          <li>
                            Tile Nitrate Load
                            <ul>
                              <li>
                                The total monthly nitrated load in tile drain
                                flow.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Tile Reactive Phosphorus Load
                            <ul>
                              <li>
                                The total monthly reactive phosphorus load in
                                tile drain flow.
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Row>
                </Col>
              </Row>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default ChartsNutrientCaptureOverflow;
