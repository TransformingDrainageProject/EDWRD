import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import downloadResults from './utils/download';

const ChartNavTabs = ({ active, sessionID, setActive }) => (
  <Nav tabs className="mb-3">
    <NavItem>
      <NavLink
        style={{ cursor: 'pointer' }}
        active={active === 0}
        onClick={() => setActive(0)}
      >
        Annual Performance
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        style={{ cursor: 'pointer' }}
        active={active === 1}
        onClick={() => setActive(1)}
      >
        Field Water Balance
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        style={{ cursor: 'pointer' }}
        active={active === 2}
        onClick={() => setActive(2)}
      >
        Reservoir Water Balance
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        style={{ cursor: 'pointer' }}
        active={active === 3}
        onClick={() => setActive(3)}
      >
        Nutrient Capture and Overflow
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        style={{ cursor: 'pointer' }}
        active={active === 4}
        onClick={() => downloadResults(sessionID, 'daily')}
      >
        Download Daily Results
      </NavLink>
    </NavItem>
  </Nav>
);

export default ChartNavTabs;
