import React, { useState } from 'react';
import { Button, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Map from './Map';

function SelectStationLocationMap(props) {
  const [displayMap, toggleDisplayMap] = useState(true);
  const [selectedSite, setSelectedSite] = useState({
    id: 2,
    name: 'Purdue Water Quality Field Station',
  });
  return (
    <Container>
      <Row>
        <span className="mr-2">Select station on the map</span>
        <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#edb229" />
      </Row>
      <Row>
        <span className="mr-2">Currently selected station:</span>
        <strong>
          <span style={{ color: '#edb229' }}>{selectedSite.name}</span>
        </strong>
      </Row>
      <Row>
        {displayMap ? (
          <Map
            {...props}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
          />
        ) : null}
      </Row>
      <Row>
        <Button
          className="mt-2"
          color="danger"
          size="sm"
          onClick={() => toggleDisplayMap(!displayMap)}
        >
          {displayMap ? 'Hide map' : 'Show map'}
        </Button>
      </Row>
    </Container>
  );
}

function SelectFieldLocationMap(props) {
  return (
    <Container>
      <h1>1. Click a location to drop a pin at your field</h1>
      <Map {...props} />
      <hr />
    </Container>
  );
}

const MapContainer = props => {
  return props.type === 'selectFieldLocation' ? (
    <SelectFieldLocationMap {...props} />
  ) : (
    <SelectStationLocationMap {...props} />
  );
};

export default MapContainer;
