import React, { useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import MyTooltip from '../MyTooltip';

const VariableButtons = ({ active, setActive, chartVariables }) => {
  const keys = Object.keys(chartVariables);
  const [tooltipOpen, setTooltipOpen] = useState(
    new Array(keys.length).fill(false)
  );

  return (
    <Row className="mb-3">
      <Col className="text-center" md={6}>
        <ListGroup className="variable-lg">
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
      <Col className="text-center" md={6}>
        <ListGroup className="variable-lg">
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
    </Row>
  );
};

export default VariableButtons;
