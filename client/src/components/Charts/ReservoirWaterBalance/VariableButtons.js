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
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup style={{ lineHeight: '1.0rem' }}>
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
            <ListGroupItem
              id={keys[6]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[6],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[6])}
            >
              {chartData.monthly[chart][keys[6]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[6]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[6]].description}
            </MyTooltip>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup style={{ lineHeight: '1.0rem' }}>
            <ListGroupItem
              id={keys[7]}
              tag="button"
              action
              onClick={() =>
                updateActive(
                  keys[7],
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[7])}
            >
              {chartData.monthly[chart][keys[7]].label}
            </ListGroupItem>
            <MyTooltip
              id={keys[7]}
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              {chartData.monthly[chart][keys[7]].description}
            </MyTooltip>
            <ListGroupItem
              id="reservoirVolDep"
              tag="button"
              action
              onClick={() =>
                updateActive(
                  'reservoirVolDep',
                  active,
                  setActive,
                  chartData,
                  annualFilter,
                  selectedVol,
                  updateSelectedChartData,
                  chart
                )
              }
              active={active.includes(keys[8])}
            >
              Reservoir Stored Volume and Depth
            </ListGroupItem>
            <MyTooltip
              id="reservoirVolDep"
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
            >
              Reservoir Stored Volume and Depth as a volume on the left axis and
              as depth on the right.
            </MyTooltip>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default VariableButtons;
