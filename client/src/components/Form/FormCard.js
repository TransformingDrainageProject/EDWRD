import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

import HelpPopover from './HelpPopover';

const FormCard = props => {
  const { label, helpText, hideHelp, name } = props;

  return (
    <Card
      body
      inverse
      style={{
        backgroundColor: '#007cb3',
        borderColor: '#007cb3',
        height: '100%',
        padding: '.5rem .25rem'
      }}
    >
      <CardTitle className="text-center">
        <h2>{label}</h2>
      </CardTitle>
      <CardBody style={{ padding: '1.25rem' }}>
        {props.children}
        {!hideHelp && helpText && label && name ? (
          <HelpPopover
            key={name}
            helpText={helpText}
            label={label}
            name={name}
          />
        ) : null}
      </CardBody>
    </Card>
  );
};

FormCard.propTypes = {
  label: PropTypes.string,
  hideHelp: PropTypes.bool
};

export default FormCard;
