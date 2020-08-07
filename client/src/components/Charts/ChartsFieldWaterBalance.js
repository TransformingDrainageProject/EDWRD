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
const waterInputs = [
  'precipitation',
  'readilyAvailableWater',
  'irrigation',
  'soilMoisture',
];

const chartCategories = [
  [
    {
      index: 0,
      key: 'precipitation',
      title: 'Precipitation',
      unit: 'inches',
    },
    {
      index: 1,
      key: 'cropTranspiration',
      title: 'Crop Transpiration',
      unit: 'inches',
    },
    {
      index: 2,
      key: 'evapotranspiration',
      title: 'Evapotranspiration',
      unit: 'kilograms',
    },
    {
      index: 3,
      key: 'soilEvaporation',
      title: 'Soil Evaporation',
      unit: 'acre-feet',
    },
  ],
  [
    {
      index: 4,
      key: 'upwardFlux',
      title: 'Upward Flux',
      unit: '%',
    },
    {
      index: 5,
      key: 'runoff',
      title: 'Runoff',
      unit: '%',
    },
    {
      index: 6,
      key: 'potentialCropTranspiration',
      title: 'Potential Crop Transpiration',
      unit: '%',
    },
    {
      index: 7,
      key: 'potentialEvapotranspiration',
      title: 'Potential Evapotranspiration',
      unit: '%',
    },
  ],
  [
    {
      index: 8,
      key: 'readilyAvailableWater',
      title: 'Readily Available Water',
      unit: '%',
    },
    {
      index: 9,
      key: 'irrigation',
      title: 'Irrigation',
      unit: '%',
    },
    {
      index: 10,
      key: 'tileDrainFlow',
      title: 'Tile Drain Flow',
      unit: '%',
    },
    {
      index: 11,
      key: 'soilMoisture',
      title: 'Soil Moisture',
      unit: '%',
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
          Click on the buttons below to see results for each annual performance
          metric across multiple reservoir sizes.
        </p>
      </Col>
    </Row>
    <NavButtonRows active={active} updateActive={updateActive} />
  </>
);

const ChartsFieldWaterBalance = ({ chartData }) => {
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
            name="fieldWaterBalance"
            title="Field Water Balance"
            text={
              <Row>
                <Col>
                  <Row>
                    This graph shows the monthly amount of water for each
                    component of the field water balance for a specific
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
                          <em>Water Inflow</em>
                        </span>
                        <ul>
                          <li>
                            Precipitation
                            <ul>
                              <li>
                                The total monthly amount of precipitation
                                falling on the field.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Applied Irrigation
                            <ul>
                              <li>
                                The total monthly amount of irrigation applied
                                to the field.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Upward Flux
                            <ul>
                              <li>
                                The total monthly amount of upward flux of water
                                into the crop root zone from a shallow water
                                table.
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span style={{ color: '#007cb3' }}>
                          <em>Water Outflow</em>
                        </span>
                        <ul>
                          <li>
                            Crop Transpiration
                            <ul>
                              <li>
                                The total monthly amount of water that is lost
                                from the field through crop transpiration.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Potential Crop Transpiration
                            <ul>
                              <li>
                                The total potential monthly amount of water that
                                is lost from the field through crop
                                transpiration.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Evapotranspiration
                            <ul>
                              <li>
                                The total monthly amount of water lost from the
                                field through crop transpiration and evaporation
                                from the surface.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Potential Evapotranspiration
                            <ul>
                              <li>
                                The total potential monthly amount of water lost
                                from the field through crop transpiration and
                                evaporation from the surface.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Soil Evaporation
                            <ul>
                              <li>
                                The total monthly amount of water that is lost
                                from the field through evaporation from the
                                surface.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Runoff
                            <ul>
                              <li>
                                The total monthly amount of water that is lost
                                from the field through surface runoff.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Tile Drain Flow
                            <ul>
                              <li>
                                The total monthly amount of water that is lost
                                from the field through tile drain flow.
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
                            Readily Available Water
                            <ul>
                              <li>
                                The average monthly amount of water in the soil
                                profile that defines the point at which crop
                                stress occurs. If soil moisture is less than
                                this value, crop stress occurs due to too little
                                available water in the soil profile.
                              </li>
                            </ul>
                          </li>
                          <li>
                            Soil Moisture
                            <ul>
                              <li>
                                The average monthly amount of available water in
                                the soil profile.
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

export default ChartsFieldWaterBalance;
