import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const SimpleNavButtons = ({ active, setActive }) => (
  <ButtonGroup className="nav-btn-grp mb-3 nav-bg" style={{ width: '100%' }}>
    <Button onClick={() => setActive(0)} active={active === 0}>
      Annual Irrigation Metrics
    </Button>
    <Button onClick={() => setActive(1)} active={active === 1}>
      Annual Water Quality Metrics
    </Button>
    <Button onClick={() => setActive(2)} active={active === 2}>
      Advanced Results
      <br />
      <small>(Monthly Water and Nutrient Balance, Daily Download)</small>
    </Button>
  </ButtonGroup>
);

export default SimpleNavButtons;
