import React from 'react';
import PropTypes from 'prop-types';

const unitConversion = {
  acres: { us: 'acres', metric: 'hectares' },
  feet: { us: 'ft', metric: 'm' }
};

const UnitGroup = props => {
  const { unit, unitLabel, unitType } = props;

  const label = unitLabel
    ? unitLabel + ` (${unitConversion[unit][unitType]})`
    : unitConversion[unit][unitType];

  return (
    <div className="input-group">
      {props.children}
      <div className="input-group-append">
        <div className="input-group-text">{label}</div>
      </div>
    </div>
  );
};

UnitGroup.propTypes = {
  children: PropTypes.node,
  unit: PropTypes.string
};

export default UnitGroup;
