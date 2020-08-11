import React from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import chartVariables from './variables';

const VariableButtons = ({ active, setActive }) => (
  <>
    <Row className="mb-3">
      <Col md={4}>
        <ListGroup>
          <ListGroupItem
            tag="button"
            action
            onClick={() => setActive(0)}
            active={active === 0}
            title={chartVariables[0].description}
          >
            {chartVariables[0].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroupItem
            tag="button"
            action
            onClick={() => setActive(1)}
            active={active === 1}
            title={chartVariables[1].description}
          >
            {chartVariables[1].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroupItem
            tag="button"
            action
            onClick={() => setActive(2)}
            active={active === 2}
            title={chartVariables[2].description}
          >
            {chartVariables[2].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md={4}>
        <ListGroup>
          <ListGroupItem
            tag="button"
            action
            onClick={() => setActive(3)}
            active={active === 3}
            title={chartVariables[3].description}
          >
            {chartVariables[3].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroupItem
            tag="button"
            action
            onClick={() => setActive(4)}
            active={active === 4}
            title={chartVariables[4].description}
          >
            {chartVariables[4].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroupItem
            tag="button"
            action
            onClick={() => setActive(5)}
            active={active === 5}
            title={chartVariables[2].description}
          >
            {chartVariables[5].title}
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  </>
);

export default VariableButtons;
