import './Map.css';
import React, { useRef, useState } from 'react';
import { GeoJSON, Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import axios from 'axios';
import PropTypes from 'prop-types';

import regionalGrid from './midwest_states.json';

const Map = props => {
  const origin = {
    latitude: 41.8781,
    longitude: -87.6298,
    zoom: 6
  };
  const { updateFieldState } = props;
  const [markerPosition, updateMarkerPosition] = useState([
    origin.latitude,
    origin.longitude
  ]);
  const refMarker = useRef(<Marker />);

  function onDragend(e) {
    // update the marker position
    const coords = e.target.getLatLng();
    const marker = refMarker.current;

    if (marker !== null) {
      updateMarkerPosition(marker.leafletElement.getLatLng());
    }
    // use marker coordinates to find state
    axios
      .get('/api/geocode', {
        params: {
          lat: coords.lat,
          lon: coords.lng
        }
      })
      .then(response => {
        updateFieldState(response.data.results.trim().toLowerCase());
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
          ref={refMarker}
          position={markerPosition}
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

Map.propTypes = {
  updateFieldState: PropTypes.func
};

export default Map;
