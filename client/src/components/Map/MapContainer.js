import React, { useEffect, useState } from 'react';
import { Button, Row } from 'reactstrap';
import { useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Map from './Map';

function SelectStationLocationMap(props) {
  const [displayMap, toggleDisplayMap] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  useEffect(() => {
    setSelectedSite({ id: props.stationId, name: props.stationName });
  }, [props.stationId, props.stationName]);

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
          <span style={{ color: '#edb229' }}>
            {selectedSite ? selectedSite.name : ''}
          </span>
        </strong>
      </Row>
      <Row>
        {displayMap && selectedSite && selectedSite.id && selectedSite.name ? (
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
      <h1>Step 1: Choose Your Location</h1>
      <p>
        Click a spot on the map to choose your location. Based on your chosen
        location we will identify the average annual climate conditions from the
        closest weather station. This data is used in calculating crop
        evapotranspiration and typical dates for frozen soil conditions. You may
        further refine these values by choosing In-depth Analysis in the next
        step.
      </p>
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
