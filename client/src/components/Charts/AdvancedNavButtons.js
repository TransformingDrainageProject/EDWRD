import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const AdvancedNavButtons = ({ active, setActive }) => (
  <ButtonGroup className="nav-btn-grp mb-3" style={{ width: '100%' }}>
    <Button color="primary" onClick={() => setActive(0)} active={active === 0}>
      Monthly Field Water Balance
    </Button>
    <Button color="primary" onClick={() => setActive(1)} active={active === 1}>
      Monthly Reservoir Water Balance
    </Button>
    <Button color="primary" onClick={() => setActive(2)} active={active === 2}>
      Monthly Nutrient Capture and Overflow
    </Button>
    <Button color="primary" onClick={() => setActive(3)} active={active === 3}>
      Download All Daily Results in Excel File
    </Button>
  </ButtonGroup>
);

export default AdvancedNavButtons;
