import 'leaflet/dist/leaflet.css';
import './Map.css';
import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const Map = () => {
  const origin = {
    latitude: 40.2672,
    longitude: -86.1349,
    zoom: 7
  };

  return (
    <div>
      <LeafletMap
        center={[origin.latitude, origin.longitude]}
        zoom={origin.zoom}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    </div>
  );
};

export default Map;
