import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

import HelpPopover from '../HelpPopover';

const unitConversion = {
  inchDay: { us: 'in/day', metric: 'mm/day' },
  inches: { us: 'in', metric: 'mm' },
  feet: { us: 'ft', metric: 'm' }
};

const AdvancedLabel = props => {
  const { helpText, hideHelp, name, text, unit, unitType } = props;

  const labelUnit = unit ? ` (${unitConversion[unit][unitType]})` : '';

  return (
    <FormGroup style={{ marginBottom: '2rem' }}>
      <Label for={name}>
        {text}
        {labelUnit}{' '}
        {!hideHelp && helpText && name ? (
          <HelpPopover
            key={name}
            helpText={helpText}
            label={text}
            name={name}
          />
        ) : null}
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
