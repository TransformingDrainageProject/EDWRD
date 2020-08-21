import React, { useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import MyTooltip from '../MyTooltip';

import chartVariables from './variables';
import updateActive from '../utils/updateActive';

const VariableButtons = ({
  active,
  annualFilter,
  chartData,
  selectedVol,
  setActive,
  updateSelectedChartData,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(
    new Array(chartVariables.length).fill(false)
  );

  return (
    <>
      <Row className="text-center">
        <Col md={4}>
          <strong>Nitrate</strong>
        </Col>
        <Col md={4}>
          <strong>Reactive Phosphorus</strong>
        </Col>
        <Col md={4}>
          <strong>Nutrient Load</strong>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <ListGroup style={{ lineHeight: '1.0rem' }}>
            <ListGroupItem
              id="variable0"
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
            <MyTooltip
              id={0}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartVariables[0].description}
            </MyTooltip>
            <ListGroupItem
              id="variable1"
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
            <MyTooltip
              id={1}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartVariables[1].description}
            </MyTooltip>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup style={{ lineHeight: '1.0rem' }}>
            <ListGroupItem
              id="variable2"
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
            <MyTooltip
              id={2}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartVariables[2].description}
            </MyTooltip>
            <ListGroupItem
              id="variable3"
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
            <MyTooltip
              id={3}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartVariables[3].description}
            </MyTooltip>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup style={{ lineHeight: '1.0rem' }}>
            <ListGroupItem
              id="variable4"
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
            <MyTooltip
              id={4}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartVariables[4].description}
            </MyTooltip>
            <ListGroupItem
              id="variable5"
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
            <MyTooltip
              id={5}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartVariables[5].description}
            </MyTooltip>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default VariableButtons;
