import './Map.css';
import React from 'react';
import { GeoJSON, Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import axios from 'axios';

import regionalGrid from './midwest_states.json';

const Map = () => {
  const origin = {
    latitude: 41.8781,
    longitude: -87.6298,
    zoom: 6
  };

  function onDragend(e) {
    const coords = e.target.getLatLng();
    axios
      .get('/api/geocode', {
        params: {
          lat: coords.lat,
          lon: coords.lng
        }
      })
      .then(response => {
        console.log(response.data.state);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <LeafletMap
        center={[origin.latitude, origin.longitude]}
        zoom={origin.zoom}
      >
        <Marker
          position={[origin.latitude, origin.longitude]}
          draggable={true}
          onDragend={onDragend}
        />
        <GeoJSON
          data={regionalGrid}
          style={() => {
            return { color: '#ffac3a', weight: 2, fillOpacity: 0 };
          }}
        />
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png"
        />
      </LeafletMap>
    </div>
  );
};

export default Map;
