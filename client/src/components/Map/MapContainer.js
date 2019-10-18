import React from 'react';

import Map from './Map';

const MapContainer = () => {
  return (
    <div className="container">
      <h1>1. Click a location to drop a pin at your field:</h1>
      <Map />
      <hr />
    </div>
  );
};

export default MapContainer;
