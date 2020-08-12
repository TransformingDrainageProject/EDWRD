import React from 'react';
import { Col, Row } from 'reactstrap';

import DownloadDataButton from './DownloadDataButton';

const ChartsDownloadDataButton = ({ sessionID }) => (
  <Row className="text-center">
    <Col>
      <DownloadDataButton sessionID={sessionID} type="annual" />
    </Col>
    <Col>
      <DownloadDataButton sessionID={sessionID} type="monthly" />
    </Col>
    <Col>
      <DownloadDataButton sessionID={sessionID} type="daily" />
    </Col>
  </Row>
);

export default ChartsDownloadDataButton;
