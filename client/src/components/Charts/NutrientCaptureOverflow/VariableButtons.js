import React from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import chartVariables from './variables';
import updateActive from '../utils/updateActive';

const VariableButtons = ({
  active,
  annualFilter,
  chartData,
  selectedVol,
  setActive,
  updateSelectedChartData,
}) => (
  <Row>
    <Col md={4}>
      <strong>Nitrate</strong>
      <ListGroup style={{ lineHeight: '1.0rem' }}>
        <ListGroupItem
          active
          tag="button"
          action
          onClick={() =>
            updateActive(
              chartVariables[0].key,
              active,
              setActive,
              chartData,
              annualFilter,
              selectedVol,
              updateSelectedChartData
            )
          }
          active={active.includes(chartVariables[0].key)}
        >
          {chartVariables[0].title}
        </ListGroupItem>
        <ListGroupItem
          tag="button"
          action
          onClick={() =>
            updateActive(
              chartVariables[1].key,
              active,
              setActive,
              chartData,
              annualFilter,
              selectedVol,
              updateSelectedChartData
            )
          }
          active={active.includes(chartVariables[1].key)}
        >
          {chartVariables[1].title}
        </ListGroupItem>
      </ListGroup>
    </Col>
    <Col md={4}>
      <strong>Reactive phosphorus</strong>
      <ListGroup style={{ lineHeight: '1.0rem' }}>
        <ListGroupItem
          active
          tag="button"
          action
          onClick={() =>
            updateActive(
              chartVariables[2].key,
              active,
              setActive,
              chartData,
              annualFilter,
              selectedVol,
              updateSelectedChartData
            )
          }
          active={active.includes(chartVariables[2].key)}
        >
          {chartVariables[2].title}
        </ListGroupItem>
        <ListGroupItem
          tag="button"
          action
          onClick={() =>
            updateActive(
              chartVariables[3].key,
              active,
              setActive,
              chartData,
              annualFilter,
              selectedVol,
              updateSelectedChartData
            )
          }
          active={active.includes(chartVariables[3].key)}
        >
          {chartVariables[3].title}
        </ListGroupItem>
      </ListGroup>
    </Col>
    <Col md={4}>
      <strong>Nutrient Load</strong>
      <ListGroup style={{ lineHeight: '1.0rem' }}>
        <ListGroupItem
          tag="button"
          action
          onClick={() =>
            updateActive(
              chartVariables[4].key,
              active,
              setActive,
              chartData,
              annualFilter,
              selectedVol,
              updateSelectedChartData
            )
          }
          active={active.includes(chartVariables[4].key)}
        >
          {chartVariables[4].title}
        </ListGroupItem>
        <ListGroupItem
          tag="button"
          action
          onClick={() =>
            updateActive(
              chartVariables[5].key,
              active,
              setActive,
              chartData,
              annualFilter,
              selectedVol,
              updateSelectedChartData
            )
          }
          active={active.includes(chartVariables[5].key)}
        >
          {chartVariables[5].title}
        </ListGroupItem>
      </ListGroup>
    </Col>
  </Row>
);

export default VariableButtons;
