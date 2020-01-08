import React from 'react';
import PropTypes from 'prop-types';

import { Arrow } from '../FormikComponents/DateRangePicker';

const startEndDateHeaderStyle = {
  display: 'inline-block',
  padding: '0 11px 0',
  width: '130px',
};

const AdvancedSeasonTableHeader = props => {
  return (
    <thead>
      <tr>
        <th></th>
        <th>
          <span style={startEndDateHeaderStyle}>Start Date</span>
          <Arrow />
          <span style={startEndDateHeaderStyle}>End Date</span>
        </th>
        <th>Crop Coefficient</th>
        <th>Maximum Crop Height ({props.unitType === 'us' ? 'ft' : 'm'})</th>
      </tr>
    </thead>
  );
};

AdvancedSeasonTableHeader.propTypes = {
  unitType: PropTypes.string,
};

export default AdvancedSeasonTableHeader;
