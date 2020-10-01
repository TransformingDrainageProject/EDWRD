import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

const Instructions = ({
  executeScroll,
  setAnalysisType,
  setUnitType,
  unitType,
}) => {
  return (
    <Container fluid>
      <Row className="mb-3">
        <h1>Step 2: Choose Your Analysis Type and Units</h1>
      </Row>
      <Row>
        <p>I want to view my input and results in:</p>
      </Row>
      <Row className="mb-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="unitType"
            id="usUnits"
            value="us"
            onChange={(e) => setUnitType(e.target.value)}
            checked={unitType === 'us'}
          />
          <label className="form-check-label" htmlFor="usUnits">
            U.S. Standard (e.g. inches, feet, gallons)
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="unitType"
            id="metricUnits"
            value="metric"
            onChange={(e) => setUnitType(e.target.value)}
            checked={unitType === 'metric'}
          />
          <label className="form-check-label" htmlFor="metricUnits">
            Metric (e.g. millimeters, meters, cubic meters)
          </label>
        </div>
      </Row>
      <Row>Analysis type:</Row>
      <Row className="mb-3 text-center">
        <Col md={6}>
          <Button
            style={{ backgroundColor: '#007cb3', width: '100%' }}
            onClick={() => {
              setAnalysisType('quick');
              executeScroll();
            }}
          >
            Quick Analysis
          </Button>
        </Col>
        <Col md={6}>
          <Button
            style={{ backgroundColor: '#007cb3', width: '100%' }}
            onClick={() => {
              setAnalysisType('indepth');
              executeScroll();
            }}
          >
            In-depth Analysis
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <p>
            Choose <strong>Quick Analysis</strong> to easily view results
            describing the potential benefits of drainage water recycling.
            Choosing this analysis will load default values representing a corn
            crop grown on a silty clay loam soil. The drained and irrigated
            field size is 80 acres (32 hectares). The base reservoir size is 5
            acres (2 hectares), with an average depth of 10 feet (3 meters).
            Irrigation is applied in 1 inch (25 millimeters) increments. Example
            datasets from either southeast Iowa or east-central Indiana for
            daily weather, drain flow, and nutrient concentrations will be used
            based on your chosen location from Step 1.
          </p>
        </Col>
        <Col md={6}>
          <p>
            Choose <strong>In-depth Analysis</strong> to learn more about each
            input to the tool and customize your values for:
          </p>
          <ul>
            <li>Soil type and characteristics</li>
            <li>Field and reservoir size</li>
            <li>Tile drain depth</li>
            <li>Crop type and characteristics</li>
            <li>Irrigation management</li>
            <li>
              Upload your own daily weather, drain flow, and nutrient
              concentrations, or choose from preloaded datasets from across the
              Midwest.
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Instructions;
