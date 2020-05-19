import './Map.css';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { divIcon } from 'leaflet';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import { GeoJSON, Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';

import precompiledDataStations from './stations_with_precompiled_data.js';
import regionalGrid from './midwest_states.json';

const customMarkerIcon = divIcon({
  html: renderToStaticMarkup(
    <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" color="#007cb3" />
  ),
});

const customMarkerIconSelected = divIcon({
  html: renderToStaticMarkup(
    <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" color="#edb229" />
  ),
});

const Map = (props) => {
  const {
    origin,
    type,
    updateFieldState,
    updateFrzThwDates,
    updateMarkerCoords,
    selectedSite,
    setSelectedSite,
  } = props;
  const [markerPosition, updateMarkerPosition] = useState([
    origin.lat,
    origin.lon,
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
          lon: coords.lng,
        },
      })
      .then((response) => {
        updateFieldState(response.data.results.trim().toLowerCase());
      })
      .catch((error) => {
        console.log(error);
      });
    // use marker coordinates to find freeze and thaw dates
    axios
      .get('/api/get_freeze_and_thaw', {
        params: {
          lat: coords.lat,
          lon: coords.lng,
        },
      })
      .then((response) => {
        let results = response.data.results;
        updateFrzThwDates({
          freeze: parseFloat(results.freeze),
          thaw: parseFloat(results.thaw),
        });
        updateMarkerCoords({
          location: { latitude: coords.lat, longitude: coords.lng },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onPrecompiledStationClick(e) {
    const position = e.target.options.position;
    const station = precompiledDataStations.filter((chain) => {
      return chain.lat === position[0] && chain.lon === position[1];
    })[0];
    setSelectedSite({ id: station.id, name: station.site_id });
  }

  return (
    <div className="container">
      <LeafletMap center={[origin.lat, origin.lon]} zoom={origin.zoom}>
        {type === 'selectFieldLocation' ? (
          <Marker
            ref={refMarker}
            position={markerPosition}
            draggable={true}
            onDragend={onDragend}
            icon={customMarkerIcon}
          />
        ) : (
          precompiledDataStations.map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lon]}
              icon={
                station.id === selectedSite.id
                  ? customMarkerIconSelected
                  : customMarkerIcon
              }
              onClick={onPrecompiledStationClick}
            />
          ))
        )}
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
  origin: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number,
  }),
  selectedSite: PropTypes.object,
  setSelectedSite: PropTypes.func,
  type: PropTypes.string,
  updateFieldState: PropTypes.func,
};

export default Map;
