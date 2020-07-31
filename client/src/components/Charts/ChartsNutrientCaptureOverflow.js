import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import ChartDescription from './ChartDescription';
import MonthlyChart from './MonthlyChart';

const buttonStyle = {
  width: '70%',
  height: 75,
};

// category indices of water inputs
const waterInputs = [0, 8, 9, 11];

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
            className={!waterInputs.includes(button.index) ? 'output' : null}
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
    if (selectedVol) {
      let temp = {};
      active.map((key) => {
        temp[key] = chartData['monthly'][key][selectedVol].average;
      });

      updateSelectedChartData(temp);
    }
  }, [active, selectedVol]);

  function updateActive(index) {
    let temp = active.slice();
    if (active.includes(index)) {
      temp = active.filter((i) => i !== index);
    } else {
      temp.push(index);
    }
    setActive(temp);
  }

  function updateSelectedVol(vol) {
    if (vol && vol !== selectedVol) {
      let temp = {};
      if (annualFilter === 'all') {
        active.forEach((key) => {
          temp[key] = chartData['monthly'][key][vol].average;
        });
      } else {
        active.forEach((key) => {
          temp[key] = chartData['monthly'][key][vol].yearly.filter(
            (dataset) => dataset.year.toString() === annualFilter
          );
        });
      }
      updateSelectedChartData(temp);
    }

    setSelectedVol(vol);
  }

  function updateSelectedYear(year) {
    let temp = {};
    if (year !== 'all') {
      active.forEach((key) => {
        temp[key] = chartData['monthly'][key][
          selectedVol ? selectedVol : 2
        ].yearly.filter((dataset) => dataset.year.toString() === year);
      });
    } else {
      active.forEach((key) => {
        temp[key] =
          chartData['monthly'][key][selectedVol ? selectedVol : 2].average;
      });
    }

    updateSelectedChartData(temp);
    setAnnualFilter(year);
  }

  let uniqueYears = [];
  if (active.length > 0 && selectedVol) {
    uniqueYears = [
      ...new Set(
        chartData['monthly'][active[0]][selectedVol].yearly.map(
          (record) => record.year
        )
      ),
    ];
  }
  const yearRange =
    uniqueYears.length > 1
      ? ` (${uniqueYears[0]} - ${uniqueYears.slice(-1)[0]})`
      : ` (${uniqueYears[0]})`;

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
            text="This graph shows the average monthly amount of water for each component of the field water balance for a particular reservoir size across all years. Click on the button at the top right of the graph to view a specific year. Click on the question mark to learn more about how this is estimated."
          />
        </Col>
      </Row>
    </>
  );
};

export default ChartsNutrientCaptureOverflow;
