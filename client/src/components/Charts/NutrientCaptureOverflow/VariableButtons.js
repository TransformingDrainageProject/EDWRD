import React, { useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import MyTooltip from '../MyTooltip';

import updateActive from '../utils/updateActive';

const VariableButtons = ({
  active,
  annualFilter,
  chart,
  chartData,
  selectedVol,
  setActive,
  updateSelectedChartData,
}) => {
  const keys = Object.keys(chartData.monthly[chart]);
  const [tooltipOpen, setTooltipOpen] = useState(
    new Array(keys.length).fill(false)
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
              id={keys[0]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[0],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[0])}
            >
              {chartData.monthly[chart][keys[0]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[0]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[0]].description}
            </MyTooltip>
            <ListGroupItem
              id={keys[1]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[1],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[1])}
            >
              {chartData.monthly[chart][keys[1]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[1]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[1]].description}
            </MyTooltip>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup style={{ lineHeight: '1.0rem' }}>
            <ListGroupItem
              id={keys[2]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[2],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[2])}
            >
              {chartData.monthly[chart][keys[2]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[2]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[2]].description}
            </MyTooltip>
            <ListGroupItem
              id={keys[3]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[3],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[3])}
            >
              {chartData.monthly[chart][keys[3]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[3]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[3]].description}
            </MyTooltip>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup style={{ lineHeight: '1.0rem' }}>
            <ListGroupItem
              id={keys[4]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[4],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[4])}
            >
              {chartData.monthly[chart][keys[4]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[4]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[4]].description}
            </MyTooltip>
            <ListGroupItem
              id={keys[5]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[5],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[5])}
            >
              {chartData.monthly[chart][keys[5]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[5]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[5]].description}
            </MyTooltip>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default VariableButtons;
