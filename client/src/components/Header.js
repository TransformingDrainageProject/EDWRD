import './Header.css';
import React from 'react';
import { Col, Row } from 'reactstrap';

import tdpLogo from '../assets/images/header_image2.png';

const Header = () => {
  return (
    <Row className="mb-3">
      <Col md={12}>
        <img id="tdp-logo" src={tdpLogo} alt="EDWRD Header" />
      </Col>
    </Row>
  );
};

export default Header;
