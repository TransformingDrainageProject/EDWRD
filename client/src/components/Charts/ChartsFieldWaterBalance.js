import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';

import ChartDescription from './ChartDescription';

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

const NavButtonRows = ({ active, updateActive }) =>
  chartCategories.map((row, rowIndex) => (
    <Row className="mb-1 text-center">
      {row.map((button) => (
        <Col>
          <Button
            className={!waterInputs.includes(button.index) ? 'output' : null}
            style={buttonStyle}
            onClick={() => updateActive(button.index)}
            active={active.includes(button.index)}
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
          <span style={{ color: 'red' }}>
            &nbsp;(Each of the boxes has a question icon providing a definition
            of the variable)
          </span>
        </p>
      </Col>
    </Row>
    <NavButtonRows active={active} updateActive={updateActive} />
  </>
);

const ChartsFieldWaterBalance = ({ chartData }) => {
  const [active, setActive] = useState([]);

  function updateActive(index) {
    let temp = active.slice();
    if (active.includes(index)) {
      temp = active.filter((i) => i !== index);
    } else {
      temp.push(index);
    }
    setActive(temp);
  }

  return (
    <>
      <NavButtons active={active} updateActive={updateActive} />
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
