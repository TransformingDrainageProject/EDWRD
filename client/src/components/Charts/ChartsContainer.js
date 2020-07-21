import React from 'react';
import { Col, Row } from 'reactstrap';

import ExampleCard from './ExampleCard';
import ExampleChart from './ExampleChart';

const ChartsContainer = ({ chartData }) => (
  <Row>
    <Row className="mb-3">
      <Col md={6}>
        <div>
          <ExampleCard
            title="Annual Applied Irrigation"
            text="This graph shows the annual amount of irrigation applied from a given reservoir size across all years at this location. Click on the question mark to learn more about how this is estimated."
          />
          <ExampleChart
            chartData={chartData['annual']['appliedIrrigation']}
            unitLabel="Acre-Feet"
          />
        </div>
      </Col>
      <Col md={6}>
        <div>
          <ExampleCard
            title="Annual Relative Irrigation Supply"
            text="This graph shows how much of the total irrigation requirement is met by the amount of irrigation applied from a given reservoir size, called the Annual Relative Irrigation Supply. Click on the question mark to learn more about how this is estimated."
          />
          <ExampleChart
            chartData={chartData['annual']['irrigationSupply']}
            unitLabel="Acre-Feet"
          />
        </div>
      </Col>
    </Row>
  </Row>
);

export default ChartsContainer;
