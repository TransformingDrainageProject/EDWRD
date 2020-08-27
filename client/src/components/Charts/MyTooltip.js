import './MyTooltip.css';
import React from 'react';
import { Tooltip } from 'reactstrap';

const toggle = (id, setTooltipOpen, tooltipOpen) => {
  let temp = new Array(tooltipOpen.length).fill(false);
  temp[id] = !tooltipOpen[id];
  setTooltipOpen(temp);
};

const MyTooltip = ({ children, id, setTooltipOpen, tooltipOpen }) => (
  <Tooltip
    placement="auto"
    fade={false}
    isOpen={tooltipOpen[id]}
    toggle={() => toggle(id, setTooltipOpen, tooltipOpen)}
    target={id}
  >
    {children}
  </Tooltip>
);

export default MyTooltip;
