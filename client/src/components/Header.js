import './Header.css';
import React from 'react';
import { Col, Row } from 'reactstrap';

import tdpLogo from '../assets/images/Transforming_Drainage_672_288.png';
import pondImg from '../assets/images/pond1.jpg';

const Header = () => {
  return (
    <Row style={{ padding: '15px' }}>
      <Col md={3}>
        <Row>
          <a
            href="https://transformingdrainage.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img id="tdp-logo" src={tdpLogo} alt="Transforming Drainage Logo" />
          </a>
        </Row>
        <Row>
          <span id="edwrd-title">
            Evaluating Drainage Water Recycling Decisions (EDWRD)
          </span>
        </Row>
      </Col>
      <Col md={9}>
        <img
          src={pondImg}
          className="mx-auto d-block"
          alt="Water storage reservoir"
          style={{ padding: '15px', width: '100%' }}
        />
      </Col>
    </Row>
  );
};

export default Header;
