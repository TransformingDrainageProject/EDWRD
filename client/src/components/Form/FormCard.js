import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const FormCard = props => {
  const { label } = props;

  return (
    <Card
      body
      inverse
      style={{
        backgroundColor: '#007cb3',
        borderColor: '#007cb3',
        height: '100%'
      }}
    >
      <CardTitle className="text-center">
        {label} <FontAwesomeIcon icon={faQuestionCircle} />
      </CardTitle>
      <CardBody>{props.children}</CardBody>
    </Card>
  );
};

FormCard.propTypes = {
  label: PropTypes.string
};

export default FormCard;
