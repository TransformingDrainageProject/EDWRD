import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const FormCard = props => {
  const { label, hideHelp } = props;

  return (
    <Card
      body
      inverse
      style={{
        backgroundColor: '#007cb3',
        borderColor: '#007cb3',
        height: '100%',
        padding: '.75rem'
      }}
    >
      <CardTitle className="text-center">
        <h2>{label}</h2>
      </CardTitle>
      <CardBody>
        {props.children}
        {!hideHelp ? (
          <FontAwesomeIcon
            style={{ position: 'absolute', bottom: 0, right: 0, margin: '5px' }}
            icon={faQuestionCircle}
          />
        ) : null}
      </CardBody>
    </Card>
  );
};

FormCard.propTypes = {
  label: PropTypes.string
};

export default FormCard;
