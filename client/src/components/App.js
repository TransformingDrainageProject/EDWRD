import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

import ExampleCard from './Charts/ExampleCard';
import ExampleChart from './Charts/ExampleChart';
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
        const result = await axios.get('/api/site_info', {
          params: { ...ORIGIN },
        });
        updateFieldState(result.data.results.state.trim().toLowerCase());
        updateFrzThwDates({
          freeze: parseFloat(result.data.results.soil.freeze),
          thaw: parseFloat(result.data.results.soil.thaw),
        });
      } catch (err) {
        console.log(err);
        updateFieldState('il');
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
        <Row className="mb-3">
          <Col md={6}>
            <div>
              <ExampleCard
                title="Annual Applied Irrigation"
                text="This graph shows the annual amount of irrigation applied from a given reservoir size across all years at this location. Click on the question mark to learn more about how this is estimated."
              />
              <ExampleChart />
            </div>
          </Col>
          <Col md={6}>
            <div>
              <ExampleCard
                title="Annual Relative Irrigation Supply"
                text="This graph shows how much of the total irrigation requirement is met by the amount of irrigation applied from a given reservoir size, called the Annual Relative Irrigation Supply. Click on the question mark to learn more about how this is estimated."
              />
              <ExampleChart />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
