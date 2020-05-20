import React from 'react';
import { Col, Row } from 'reactstrap';

import edwrdLogo from '../assets/images/tdp_header.png';

const Header = () => {
  return (
    <Row>
      <Col md={6}>
        <img
          src={edwrdLogo}
          className="mx-auto d-block"
          alt="Evaluating Drainage Water Recycling Decisions (EDWRD) Logo"
          style={{ padding: '15px', width: '100%' }}
        />
      </Col>
      <Col md={6}>
        <img
          src={edwrdLogo}
          className="mx-auto d-block"
          alt="Evaluating Drainage Water Recycling Decisions (EDWRD) Logo"
          style={{ padding: '15px', width: '100%' }}
        />
      </Col>
    </Row>
  );
};

export default Header;
