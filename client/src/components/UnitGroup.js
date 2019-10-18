import React from 'react';
import PropTypes from 'prop-types';

const UnitGroup = props => {
  return (
    <div className="input-group">
      {props.children}
      <div className="input-group-append">
        <div className="input-group-text">{props.unit}</div>
      </div>
    </div>
  );
};

UnitGroup.propTypes = {
  children: PropTypes.node,
  unit: PropTypes.string
};

export default UnitGroup;
