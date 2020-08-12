import React from 'react';
import { Button, Col, Row } from 'reactstrap';

import downloadResults from './utils/download';

const DownloadDataButton = ({ sessionID, type }) => (
  <Row>
    <Col>
      <Button
        className="mb-3"
        style={{ backgroundColor: '#007cb3', width: '250px' }}
        onClick={() => downloadResults(sessionID, type)}
      >
        Download {type} results (.xlsx)
      </Button>
    </Col>
  </Row>
);

export default DownloadDataButton;
