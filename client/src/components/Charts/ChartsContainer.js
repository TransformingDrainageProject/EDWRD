import './ChartsContainer.css';
import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';

import AnnualChart from './AnnualChart';
import ChartDescription from './ChartDescription';

const ChartTabs = () => (
  <Nav tabs className="mb-3">
    <NavItem>
      <NavLink active>Annual Performance</NavLink>
    </NavItem>
    <NavItem>
      <NavLink>Field Water Balance</NavLink>
    </NavItem>
    <NavItem>
      <NavLink>Reservoir Water Balance</NavLink>
    </NavItem>
    <NavItem>
      <NavLink>Nutrient Capture and Overflow</NavLink>
    </NavItem>
    <NavItem>
      <NavLink>Download Results</NavLink>
    </NavItem>
  </Nav>
);

const annualButtons = [
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

const buttonStyle = {
  width: '70%',
  height: 75,
};

const ChartsContainer = ({ chartData }) => {
  const [avgLineOnly, toggleAvgLineOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  function yearOnChange(event) {
    const year = event.target.value;
    setFilter(year);
  }

  return (
    <Container>
      <ChartTabs />
      <Row className="mb-1 text-center">
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => setSelected(1)}
            active={selected === 1}
          >
            Applied Irrigation
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => setSelected(2)}
            active={selected === 2}
          >
            Nitrate Load Reduction
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => setSelected(3)}
            active={selected === 3}
          >
            Soluble Relative Phosphorus Load Reduction
          </Button>
        </Col>
      </Row>
      <Row className="mb-3 text-center">
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => setSelected(4)}
            active={selected === 4}
          >
            Annual Relative Irrigation Supply
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => setSelected(5)}
            active={selected === 5}
          >
            Nitrate Load Reduction (%)
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => setSelected(6)}
            active={selected === 6}
          >
            Soluble Relative Phosphorus Load Reduction (%)
          </Button>
        </Col>
      </Row>
      {selected ? (
        <>
          <Row className="text-center">
            <Col>
              <h1>{annualButtons[selected - 1].title}</h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={9}>
              <AnnualChart
                chartData={chartData['annual'][annualButtons[selected - 1].key]}
                color="green"
                avgLineOnly={avgLineOnly}
                unitLabel={annualButtons[selected - 1].unit}
                filter={filter}
              />
            </Col>
            <Col md={3}>
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
                  {/* <Button
                    size="sm"
                    onClick={() => toggleAvgLineOnly(!avgLineOnly)}
                    active={avgLineOnly}
                  >
                    View average line only
                  </Button> */}
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
                    {[
                      ...new Set(
                        chartData['annual'][
                          annualButtons[selected - 1].key
                        ].annual.map((record) => record.year)
                      ),
                    ].map((year) => (
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
                text="This graph shows the annual amount of irrigation applied from a given reservoir size across all years at this location. Click on the question mark to learn more about how this is estimated."
              />
            </Col>
          </Row>
        </>
      ) : null}
    </Container>
  );
};

export default ChartsContainer;
