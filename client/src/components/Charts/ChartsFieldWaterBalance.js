import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import ChartDescription from './ChartDescription';
import MonthlyChart from './MonthlyChart';

import updateChartData from './utils/updateChartData';
import getYearInfo from './utils/getYearInfo';

const buttonStyle = {
  width: '70%',
  height: 75,
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
            text="This graph shows the average monthly amount of water for each component of the field water balance for a particular reservoir size across all years. Click on the button at the top right of the graph to view a specific year. Click on the question mark to learn more about how this is estimated."
          />
        </Col>
      </Row>
    </>
  );
};

export default ChartsFieldWaterBalance;
