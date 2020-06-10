import React, { useState } from 'react';
import { Button, Row } from 'reactstrap';
import { useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Map from './Map';

function SelectStationLocationMap(props) {
  const [displayMap, toggleDisplayMap] = useState(true);
  const [selectedSite, setSelectedSite] = useState({
    id: 2,
    name: 'Purdue Water Quality Field Station',
  });
  const { setFieldValue, setFieldTouched } = useFormikContext();

  function updateSelectedSite(site) {
    setFieldValue('userSelectedStation', site);
    setFieldTouched('userSelectedStation', true);
  }

  return (
    <div>
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
            updateSelectedSite={updateSelectedSite}
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
    </div>
  );
}

function SelectFieldLocationMap(props) {
  return (
    <div>
      <h1>1. Click and drag the pin to your field's location</h1>
      <Map {...props} />
      <hr />
    </div>
  );
}

const MapContainer = (props) => {
  return props.type === 'selectFieldLocation' ? (
    <SelectFieldLocationMap {...props} />
  ) : (
    <SelectStationLocationMap {...props} />
  );
};

export default MapContainer;
