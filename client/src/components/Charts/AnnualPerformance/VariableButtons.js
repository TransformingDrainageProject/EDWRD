import React, { useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row, Tooltip } from 'reactstrap';

import MyTooltip from '../MyTooltip';

import chartVariables from './variables';

const VariableButtons = ({ active, setActive }) => {
  const [tooltipOpen, setTooltipOpen] = useState(
    new Array(chartVariables.length).fill(false)
  );

  return (
    <>
      <Row className="mb-3">
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id="variable0"
              tag="button"
              action
              onClick={() => setActive(0)}
              active={active === 0}
            >
              {chartVariables[0].title}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={0}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[0].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id="variable1"
              tag="button"
              action
              onClick={() => setActive(1)}
              active={active === 1}
            >
              {chartVariables[1].title}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={1}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[1].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id="variable2"
              tag="button"
              action
              onClick={() => setActive(2)}
              active={active === 2}
            >
              {chartVariables[2].title}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={2}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[2].description}
          </MyTooltip>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id="variable3"
              tag="button"
              action
              onClick={() => setActive(3)}
              active={active === 3}
            >
              {chartVariables[3].title}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={3}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[3].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id="variable4"
              tag="button"
              action
              onClick={() => setActive(4)}
              active={active === 4}
            >
              {chartVariables[4].title}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={4}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[4].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id="variable5"
              tag="button"
              action
              onClick={() => setActive(5)}
              active={active === 5}
            >
              {chartVariables[5].title}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={5}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[5].description}
          </MyTooltip>
        </Col>
      </Row>
    </>
  );
};

export default VariableButtons;
