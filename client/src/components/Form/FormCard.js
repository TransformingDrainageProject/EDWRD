import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const FormCard = props => {
  const { label, hideHelp } = props;

  function onMouseEnter(e) {
    console.log('show help text');
  }

  function onMouseLeave(e) {
    console.log('hide help text');
  }

  return (
    <Card
      body
      inverse
      style={{
        backgroundColor: '#007cb3',
        borderColor: '#007cb3',
        height: '100%',
        padding: '.5rem .25rem',
      }}
    >
      <CardTitle className="text-center">
        <h2>{label}</h2>
      </CardTitle>
      <CardBody style={{ padding: '1.25rem' }}>
        {props.children}
        {!hideHelp ? (
          <FontAwesomeIcon
            style={{ position: 'absolute', bottom: 0, right: 0, margin: '5px' }}
            icon={faQuestionCircle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ) : null}
      </CardBody>
    </Card>
  );
};

FormCard.propTypes = {
  label: PropTypes.string,
  hideHelp: PropTypes.bool,
};

export default FormCard;
