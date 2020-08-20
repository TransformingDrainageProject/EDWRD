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
  <>
    <Row className="text-center">
      <Col md={4}>
        <strong>Water Inflow</strong>
      </Col>
      <Col md={4}>
        <strong>Water Outflow</strong>
      </Col>
      <Col md={4}>
        <strong>Reservoir Capture, Storage, and Depth</strong>
      </Col>
    </Row>
    <Row>
      <Col md={4}>
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
          <ListGroupItem
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
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup style={{ lineHeight: '1.0rem' }}>
          <ListGroupItem
            active
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
          <ListGroupItem
            tag="button"
            action
            onClick={() =>
              updateActive(
                chartVariables[6].key,
                active,
                setActive,
                chartData,
                annualFilter,
                selectedVol,
                updateSelectedChartData
              )
            }
            active={active.includes(chartVariables[6].key)}
          >
            {chartVariables[6].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup style={{ lineHeight: '1.0rem' }}>
          <ListGroupItem
            tag="button"
            action
            onClick={() =>
              updateActive(
                chartVariables[7].key,
                active,
                setActive,
                chartData,
                annualFilter,
                selectedVol,
                updateSelectedChartData
              )
            }
            active={active.includes(chartVariables[7].key)}
          >
            {chartVariables[7].title}
          </ListGroupItem>
          <ListGroupItem
            tag="button"
            action
            onClick={() =>
              updateActive(
                chartVariables[8].key,
                active,
                setActive,
                chartData,
                annualFilter,
                selectedVol,
                updateSelectedChartData
              )
            }
            active={active.includes(chartVariables[8].key)}
          >
            {chartVariables[8].title}
          </ListGroupItem>
          <ListGroupItem
            tag="button"
            action
            onClick={() =>
              updateActive(
                chartVariables[9].key,
                active,
                setActive,
                chartData,
                annualFilter,
                selectedVol,
                updateSelectedChartData
              )
            }
            active={active.includes(chartVariables[9].key)}
          >
            {chartVariables[9].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  </>
);

export default VariableButtons;
