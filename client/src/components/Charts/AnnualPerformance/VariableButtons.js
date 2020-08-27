import React, { useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import MyTooltip from '../MyTooltip';

const VariableButtons = ({ active, setActive, chartVariables }) => {
  const keys = Object.keys(chartVariables);

  const [tooltipOpen, setTooltipOpen] = useState(
    new Array(keys.length).fill(false)
  );

  return (
    <>
      <Row className="mb-3">
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id={keys[0]}
              tag="button"
              action
              onClick={() => setActive(keys[0])}
              active={active === keys[0]}
            >
              {chartVariables[keys[0]].label}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={keys[0]}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[keys[0]].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id={keys[1]}
              tag="button"
              action
              onClick={() => setActive(keys[1])}
              active={active === keys[1]}
            >
              {chartVariables[keys[1]].label}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={keys[1]}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[keys[1]].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id={keys[2]}
              tag="button"
              action
              onClick={() => setActive(keys[2])}
              active={active === keys[2]}
            >
              {chartVariables[keys[2]].label}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={keys[2]}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[keys[2]].description}
          </MyTooltip>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id={keys[3]}
              tag="button"
              action
              onClick={() => setActive(keys[3])}
              active={active === keys[3]}
            >
              {chartVariables[keys[3]].label}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={keys[3]}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[keys[3]].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id={keys[4]}
              tag="button"
              action
              onClick={() => setActive(keys[4])}
              active={active === keys[4]}
            >
              {chartVariables[keys[4]].label}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={keys[4]}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[keys[4]].description}
          </MyTooltip>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem
              id={keys[5]}
              tag="button"
              action
              onClick={() => setActive(keys[5])}
              active={active === keys[5]}
            >
              {chartVariables[keys[5]].label}
            </ListGroupItem>
          </ListGroup>
          <MyTooltip
            id={keys[5]}
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
          >
            {chartVariables[keys[5]].description}
          </MyTooltip>
        </Col>
      </Row>
    </>
  );
};

export default VariableButtons;
