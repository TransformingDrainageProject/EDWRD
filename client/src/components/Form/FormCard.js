import React from 'react';
import { Card, CardFooter, CardTitle, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

import HelpPopover from './HelpPopover';

const FormCard = props => {
  const { label, helpText, hideHelp, name, position } = props;

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
      {position !== 'bottom' ? (
        <CardTitle className="text-center">
          <h2>{label}</h2>
        </CardTitle>
      ) : null}
      <CardBody style={{ padding: '1.25rem' }}>
        {props.children}
        {!hideHelp && helpText && name ? (
          <HelpPopover
            key={name}
            helpText={helpText}
            label={label}
            name={name}
          />
        ) : null}
      </CardBody>
      {position === 'bottom' ? (
        <CardFooter
          className="text-center"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border: 'none' }}
        >
          <h2>{label}</h2>
        </CardFooter>
      ) : null}
    </Card>
  );
};

FormCard.propTypes = {
  label: PropTypes.string,
  hideHelp: PropTypes.bool
};

export default FormCard;
