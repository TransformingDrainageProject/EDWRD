import './App.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'reactstrap';

import ChartsContainer from './Charts/ChartsContainer';
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

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const App = () => {
  const [analysisType, setAnalysisType] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [nearestStation, setNearestStation] = useState(null);
  const [unitType, setUnitType] = useState('us');
  const [fieldState, updateFieldState] = useState('il');
  const [frzThwDates, updateFrzThwDates] = useState({
    freeze: 311.46277,
    thaw: 86.998985,
  });
  const [markerCoords, updateMarkerCoords] = useState(null);
  const [clientID, setClientID] = useState('');

  const chartRef = useRef(null);
  const formRef = useRef(null);
  const executeScrollToChart = () => scrollToRef(chartRef);
  const executeScrollToForm = () => scrollToRef(formRef);

  useEffect(() => {
    const fetchClientID = async () => {
      try {
        const result = await axios.get('/api/get_clientid');
        setClientID(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchClientID();
  }, [clientID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/site_info', {
          params: { lat: ORIGIN.lat, lon: ORIGIN.lon, zoom: ORIGIN.zoom },
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

  useEffect(() => {
    const findNearestStation = async () => {
      try {
        const result = await axios.get('/api/nearest_station', {
          params: {
            lat: markerCoords.location.latitude,
            lon: markerCoords.location.longitude,
            unit: unitType,
          },
        });

        if (result) {
          setNearestStation(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (markerCoords) {
      findNearestStation();
    }
  }, [markerCoords, unitType]);

  return (
    <div>
      <Container>
        <Header />
        <Introduction />
        <hr />
        <MapContainer
          origin={ORIGIN}
          type="selectFieldLocation"
          updateFieldState={updateFieldState}
          updateFrzThwDates={updateFrzThwDates}
          updateMarkerCoords={updateMarkerCoords}
        />
        <hr />
        {markerCoords ? (
          <Instructions
            executeScroll={executeScrollToForm}
            setAnalysisType={setAnalysisType}
            setUnitType={setUnitType}
            unitType={unitType}
          />
        ) : null}
        {markerCoords ? <hr ref={formRef} /> : null}
        {markerCoords && analysisType ? (
          <FormContainer
            analysisType={analysisType}
            executeScroll={executeScrollToChart}
            origin={ORIGIN}
            fieldState={fieldState}
            frzThwDates={frzThwDates}
            markerCoords={markerCoords}
            nearestStation={nearestStation}
            setChartData={setChartData}
            unitType={unitType}
          />
        ) : null}
        {markerCoords && analysisType ? <hr /> : null}
        <div ref={chartRef}></div>
        {chartData ? <ChartsContainer chartData={chartData} /> : null}
        {chartData ? <hr /> : null}
      </Container>
      <Footer clientID={clientID} />
    </div>
  );
};

export default App;
