import React from 'react';
import { Button, Col, Row } from 'reactstrap';

import downloadResults from './utils/download';

const DownloadDataButton = ({ sessionID, type }) => (
  <Row className="mt-3">
    <Col>
      <Button
        style={{ backgroundColor: '#007cb3', width: '275px' }}
        onClick={() => downloadResults(sessionID, type)}
      >
        Download {type} results (.xlsx)
      </Button>
    </Col>
  </Row>
);

export default DownloadDataButton;
