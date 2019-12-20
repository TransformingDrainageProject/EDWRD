import './App.css';
import React, { useState } from 'react';

import Header from './Header';
import Introduction from './Introduction';
import MapContainer from './Map/MapContainer';
import FormContainer from './Form/FormContainer';
import Footer from './Footer';

const App = () => {
  const [unitType, setUnitType] = useState('us');
  const [fieldState, updateFieldState] = useState('il');

  return (
    <div className="container-fluid">
      <Header />
      <Introduction setUnitType={setUnitType} unitType={unitType} />
      <MapContainer
        updateFieldState={updateFieldState}
        type="selectFieldLocation"
      />
      <FormContainer fieldState={fieldState} unitType={unitType} />
      <Footer />
    </div>
  );
};

export default App;
