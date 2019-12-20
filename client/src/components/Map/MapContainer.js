import React from 'react';

import Map from './Map';

function SelectStationLocationMap(props) {
  return (
    <div className="container">
      <span>Select station on the map</span>
      <Map {...props} />
    </div>
  );
}

function SelectFieldLocationMap(props) {
  return (
    <div className="container">
      <h1>1. Click a location to drop a pin at your field</h1>
      <Map {...props} />
      <hr />
    </div>
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
