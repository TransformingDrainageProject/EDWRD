import './ChartsContainer.css';
import React, { useState } from 'react';
import {
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
  <Nav tabs>
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
const ChartsContainer = ({ chartData }) => {
  const [showPercentiles, toggleShowPercentiles] = useState(true);
  const [showOutliers, toggleShowOutliers] = useState(true);

  return (
    <Container>
      <Row className="mb-3 no-gutters" style={{ border: '1px solid #c8ced5' }}>
        <Col className="ml-4">
          <Row>
            <Col>
              <h4>
                <u>Chart Settings</u>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label check for="togglePercentiles">
                <Input
                  type="checkbox"
                  name="togglePercentiles"
                  checked={showPercentiles}
                  onChange={() => toggleShowPercentiles(!showPercentiles)}
                />
                Display percentile range (10% - 90%)
              </Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label check className="mt-2" for="toggleOutliers">
                <Input
                  type="checkbox"
                  name="toggleOutliers"
                  checked={showOutliers}
                  onChange={() => toggleShowOutliers(!showOutliers)}
                />
                Display outliers (outside 10% - 90% range)
              </Label>
            </Col>
          </Row>
        </Col>
      </Row>
      <ChartTabs />
      <Row className="mb-3">
        <Col md={6}>
          <div>
            <ChartDescription
              name="annualAppliedIrrigation"
              title="Annual Applied Irrigation"
              text="This graph shows the annual amount of irrigation applied from a given reservoir size across all years at this location. Click on the question mark to learn more about how this is estimated."
            />
            <AnnualChart
              chartData={chartData['annual']['appliedIrrigation']}
              color="green"
              unitLabel="Acre-Feet"
              showOutliers={showOutliers}
              showPercentiles={showPercentiles}
            />
          </div>
        </Col>
        <Col md={6}>
          <div>
            <ChartDescription
              name="annualRelativeIrrigationSupply"
              title="Annual Relative Irrigation Supply"
              text="This graph shows how much of the total irrigation requirement is met by the amount of irrigation applied from a given reservoir size, called the Annual Relative Irrigation Supply. Click on the question mark to learn more about how this is estimated."
            />
            <AnnualChart
              chartData={chartData['annual']['irrigationSupply']}
              color="green"
              showOutliers={showOutliers}
              showPercentiles={showPercentiles}
            />
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <div>
            <ChartDescription
              name="nitrateLoadReduction"
              title="Nitrate Load Reduction"
              text="This graph shows the annual nitrate load reduction based on the amount of captured drain flow from a given reservoir size across all years at this location. Click on the question mark to learn more about how this is estimated."
            />
            <AnnualChart
              chartData={chartData['annual']['nitrateLoadReduction']}
              color="yellow"
              unitLabel="%"
              showOutliers={showOutliers}
              showPercentiles={showPercentiles}
            />
          </div>
        </Col>
        <Col md={6}>
          <div>
            <ChartDescription
              name="capturedTileDrainFlow"
              title="Percent of Captured Tile Drain Flow"
              text="This graph shows how much of the annual tile drain flow is captured by a given reservoir size across all years at this location. Click on the question mark to learn more about how this is estimated."
            />
            <AnnualChart
              chartData={chartData['annual']['capturedTileDrainFlow']}
              color="blue"
              unitLabel="%"
              showOutliers={showOutliers}
              showPercentiles={showPercentiles}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChartsContainer;