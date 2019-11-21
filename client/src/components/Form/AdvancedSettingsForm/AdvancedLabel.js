import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const unitConversion = {
  inchDay: { us: 'in/day', metric: 'mm/day' },
  inches: { us: 'in', metric: 'mm' },
  feet: { us: 'ft', metric: 'm' }
};

const AdvancedLabel = props => {
  const { name, text, unit, unitType } = props;

  const labelUnit = unit ? ` (${unitConversion[unit][unitType]})` : '';

  return (
    <FormGroup>
      <Label for={name}>
        {text}
        {labelUnit}{' '}
        <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: 5 }} />
      </Label>
      {props.children}
    </FormGroup>
  );
};

AdvancedLabel.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  unit: PropTypes.string,
  unitType: PropTypes.string
};

export default AdvancedLabel;
