import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import downloadResults from './utils/download';

const ChartNavTabs = ({ active, sessionID, setActive }) => (
  <Nav tabs className="mb-3">
    <NavItem>
      <NavLink
        className="text-center"
        style={{ cursor: 'pointer' }}
        active={active === 0}
        onClick={() => setActive(0)}
      >
        Annual Performance Metrics
        <br />
        <small>(Annual)</small>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="text-center"
        style={{ cursor: 'pointer' }}
        active={active === 1}
        onClick={() => setActive(1)}
      >
        Field Water Balance
        <br />
        <small>(Monthly)</small>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="text-center"
        style={{ cursor: 'pointer' }}
        active={active === 2}
        onClick={() => setActive(2)}
      >
        Reservoir Water Balance
        <br />
        <small>(Monthly)</small>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="text-center"
        style={{ cursor: 'pointer' }}
        active={active === 3}
        onClick={() => setActive(3)}
      >
        Nutrient Capture and Overflow
        <br />
        <small>(Monthly)</small>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="text-center"
        style={{ cursor: 'pointer' }}
        active={active === 4}
        onClick={() => downloadResults(sessionID, 'daily')}
      >
        Daily Results
        <br />
        <small>(Download)</small>
      </NavLink>
    </NavItem>
  </Nav>
);

export default ChartNavTabs;
