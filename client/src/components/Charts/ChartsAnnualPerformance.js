import React, { useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';

import AnnualChart from './AnnualChart';
import ChartDescription from './ChartDescription';

const buttonStyle = {
  width: '70%',
  height: 75,
};

const chartCategories = [
  {
    index: 0,
    key: 'appliedIrrigation',
    title: 'Applied Irrigation',
    unit: 'acre-feet',
  },
  {
    index: 1,
    key: 'nitrateLoadReduction',
    title: 'Nitrate Load Reduction',
    unit: 'kilograms',
  },
  {
    index: 2,
    key: 'srpLoadReduction',
    title: 'Soluble Relative Phosphorus Load Reduction',
    unit: 'kilograms',
  },
  {
    index: 3,
    key: 'irrigationSupply',
    title: 'Annual Relative Irrigation Supply',
    unit: 'acre-feet',
  },
  {
    index: 4,
    key: 'nitrateLoadReductionPerc',
    title: 'Nitrate Load Reduction (%)',
    unit: '%',
  },
  {
    index: 5,
    key: 'srpLoadReductionPerc',
    title: 'Soluble Relative Phosphorus Load Reduction (%)',
    unit: '%',
  },
];

const NavButtons = ({ active, setActive }) => (
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
    <Row className="mb-1 text-center">
      <Col>
        <Button
          style={buttonStyle}
          onClick={() => setActive(0)}
          active={active === 0}
        >
          {chartCategories.filter((category) => category.index === 0)[0].title}
        </Button>
      </Col>
      <Col>
        <Button
          style={buttonStyle}
          onClick={() => setActive(1)}
          active={active === 1}
        >
          {chartCategories.filter((category) => category.index === 1)[0].title}
        </Button>
      </Col>
      <Col>
        <Button
          style={buttonStyle}
          onClick={() => setActive(2)}
          active={active === 2}
        >
          {chartCategories.filter((category) => category.index === 2)[0].title}
        </Button>
      </Col>
    </Row>
    <Row className="mb-3 text-center">
      <Col>
        <Button
          style={buttonStyle}
          onClick={() => setActive(3)}
          active={active === 3}
        >
          {chartCategories.filter((category) => category.index === 3)[0].title}
        </Button>
      </Col>
      <Col>
        <Button
          style={buttonStyle}
          onClick={() => setActive(4)}
          active={active === 4}
        >
          {chartCategories.filter((category) => category.index === 4)[0].title}
        </Button>
      </Col>
      <Col>
        <Button
          style={buttonStyle}
          onClick={() => setActive(5)}
          active={active === 5}
        >
          {chartCategories.filter((category) => category.index === 5)[0].title}
        </Button>
      </Col>
    </Row>
  </>
);

const ChartsAnnualPerformance = ({ chartData }) => {
  const [activeChart, setActiveChart] = useState(0);
  const [annualFilter, setAnnualFilter] = useState('all');
  const [avgLineOnly, toggleAvgLineOnly] = useState(false);

  const selectedChartData =
    chartData['annual'][chartCategories[activeChart].key];

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
      <NavButtons active={activeChart} setActive={setActiveChart} />
      <Row className="text-center">
        <Col>
          <h1>
            {chartCategories[activeChart].title}
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
            unitLabel={chartCategories[activeChart].unit}
            annualFilter={annualFilter}
            rdep={chartData.rdep}
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
            text="<h2>This graph shows the annual amount of irrigation applied from a given reservoir size across all years at this location. Click on the question mark to learn more about how this is estimated.</h2>"
          />
        </Col>
      </Row>
    </>
  );
};

export default ChartsAnnualPerformance;
