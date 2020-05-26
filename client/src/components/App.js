import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

import Header from './Header';
import Instructions from './Instructions';
import Introduction from './Introduction';
import MapContainer from './Map/MapContainer';
import FormContainer from './Form/FormContainer';
import Footer from './Footer';

// Default map marker location
const ORIGIN = {
  lat: 41.8781,
  lon: -87.6298,
  zoom: 6,
};

const App = () => {
  const [unitType, setUnitType] = useState('us');
  const [fieldState, updateFieldState] = useState('il');
  const [frzThwDates, updateFrzThwDates] = useState({
    freeze: 311.46277,
    thaw: 86.998985,
  });
  const [markerCoords, updateMarkerCoords] = useState({
    location: { latitude: ORIGIN.lat, longitude: ORIGIN.lon },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/geocode', {
          params: { ...ORIGIN },
        });
        updateFieldState(result.data.results.trim().toLowerCase());
      } catch (err) {
        console.log(err);
        updateFieldState('il');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/get_freeze_and_thaw', {
          params: { ...ORIGIN },
        });
        updateFrzThwDates({
          freeze: parseFloat(result.data.results.freeze),
          thaw: parseFloat(result.data.results.thaw),
        });
      } catch (err) {
        console.log(err);
        updateFrzThwDates({
          freeze: 311.46277,
          thaw: 86.998985,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Header />
        <Introduction setUnitType={setUnitType} unitType={unitType} />
        <hr />
        <Instructions />
        <MapContainer
          origin={ORIGIN}
          updateFieldState={updateFieldState}
          updateFrzThwDates={updateFrzThwDates}
          updateMarkerCoords={updateMarkerCoords}
          type="selectFieldLocation"
        />
        <FormContainer
          origin={ORIGIN}
          fieldState={fieldState}
          frzThwDates={frzThwDates}
          markerCoords={markerCoords}
          unitType={unitType}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
