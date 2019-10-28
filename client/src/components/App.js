import './App.css';
import React, { useState } from 'react';

import Header from './Header';
import Introduction from './Introduction';
import MapContainer from './Map/MapContainer';
import FormContainer from './Form/FormContainer';
import Footer from './Footer';

const App = () => {
  const [unitType, setUnitType] = useState('us');

  return (
    <div className="container-fluid">
      <Header />
      <Introduction setUnitType={setUnitType} unitType={unitType} />
      <MapContainer />
      <FormContainer unitType={unitType} />
      <Footer />
    </div>
  );
};

export default App;
