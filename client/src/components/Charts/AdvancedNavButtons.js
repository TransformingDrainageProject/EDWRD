import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const AdvancedNavButtons = ({ active, setActive }) => (
  <ButtonGroup className="nav-btn-grp mb-3 nav-bg" style={{ width: '100%' }}>
    <Button onClick={() => setActive(0)} active={active === 0}>
      Monthly Field Water Balance
    </Button>
    <Button onClick={() => setActive(1)} active={active === 1}>
      Monthly Reservoir Water Balance
    </Button>
    <Button onClick={() => setActive(2)} active={active === 2}>
      Monthly Nutrient Capture and Overflow
    </Button>
    <Button onClick={() => setActive(3)} active={active === 3}>
      Download All Daily Results in Excel File
    </Button>
  </ButtonGroup>
);

export default AdvancedNavButtons;
