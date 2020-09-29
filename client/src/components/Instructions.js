import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

const Instructions = ({ setAnalysisType, setUnitType, unitType }) => {
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
            style={{ backgroundColor: '#007cb3', width: '150px' }}
            onClick={() => setAnalysisType('quick')}
          >
            Quick Analysis
          </Button>
        </Col>
        <Col md={6}>
          <Button
            style={{ backgroundColor: '#007cb3', width: '150px' }}
            onClick={() => setAnalysisType('indepth')}
          >
            In-depth Analysis
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <strong>For a quick analysis,</strong> to learn more about this tool
          and to see a few results describing the potential benefits of drainage
          water recycling, we've preloaded default values{' '}
          <em>&lt;insert link&gt;</em> representing a corn crop grown in
          east-central Indiana on silty clay loam soil. Simply drag the pin in
          the map to a location of your choice and click on "Run EDWRD". Once
          the tool finishes running, you can scroll down to view the results.
        </Col>
        <Col md={6}>
          <strong>For a more in-depth analysis,</strong> to learn more about
          potential benefits at a particular site, or to upload your own input
          data, click on "Modify Inputs". Additional input fields will appear
          allowing you to describe your field, reservoir, crop, and management
          settings, choose preloaded datasets from different sites across the
          Midwest, or upload your own data. You can always click the ? Icon to
          find out more about a specific input field.
        </Col>
      </Row>
    </Container>
  );
};

export default Instructions;
