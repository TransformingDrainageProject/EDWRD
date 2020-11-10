import './Map.css';
import React, { useEffect, useRef, useState } from 'react';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { divIcon } from 'leaflet';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  GeoJSON,
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';

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
    selectedSite,
    setSelectedSite,
    type,
    updateFieldState,
    updateFrzThwDates,
    updateMarkerCoords,
    updateSelectedSite,
    unitType,
  } = props;
  const [markerPosition, updateMarkerPosition] = useState(null);
  const [precompiledDataStations, setPrecompiledDataStations] = useState(
    undefined
  );
  const refMarker = useRef(<Marker />);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/daily_stations');
        setPrecompiledDataStations(result.data.stations);
      } catch (err) {
        console.log(err);
        setPrecompiledDataStations(undefined);
      }
    };

    fetchData();
  }, []);

  function onDragend(latLng) {
    // update the marker position
    const coords = latLng;
    const marker = refMarker.current;

    if (marker !== null) {
      updateMarkerPosition(marker.leafletElement.getLatLng());
    }
    // use marker coordinates to find state
    axios
      .get('/api/site_info', {
        params: {
          lat: coords.lat,
          lon: coords.lng,
        },
      })
      .then((response) => {
        updateFieldState(response.data.results.state.trim().toLowerCase());
        updateFrzThwDates({
          freeze: parseFloat(response.data.results.soil.freeze),
          thaw: parseFloat(response.data.results.soil.thaw),
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
    setSelectedSite({ id: station.id, name: station.name });
    updateSelectedSite(station.id);
  }

  return (
    <div className="container">
      <LeafletMap
        center={[origin.lat, origin.lon]}
        zoom={origin.zoom}
        onClick={(e) => {
          updateMarkerPosition([e.latlng.lat, e.latlng.lng]);
          onDragend(e.latlng);
        }}
      >
        {type === 'selectFieldLocation' ? (
          markerPosition ? (
            <Marker
              ref={refMarker}
              position={markerPosition}
              draggable={true}
              onDragend={(e) => onDragend(e.target.getLatLng())}
              icon={customMarkerIcon}
            />
          ) : null
        ) : precompiledDataStations ? (
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
            >
              <Popup>
                <Row>
                  <strong>Site Name:&nbsp;</strong>
                  {station.name}
                </Row>
                <Row>
                  <strong>Location:&nbsp;</strong>
                  {station.location ? station.location : 'NULL'}
                </Row>
                <Row>
                  <strong>Soil Type:&nbsp;</strong>
                  {station.soil ? station.soil : 'NULL'}
                </Row>
                <Row>
                  <strong>Years:&nbsp;</strong>
                  {station.years ? station.years : 'NULL'}
                </Row>
                <Row>
                  <strong>Site Summary:&nbsp;</strong>
                  {station.site_summary ? station.site_summary : 'NULL'}
                </Row>
                <br />
                <Row>
                  <a
                    href={`/api/download_station_input?stationID=${station.id}&unit=${unitType}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download daily input (.txt)
                  </a>
                </Row>
              </Popup>
            </Marker>
          ))
        ) : null}
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
