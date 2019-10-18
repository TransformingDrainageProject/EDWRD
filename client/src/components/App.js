import './App.css';
import React from 'react';

import Header from './Header';
import Introduction from './Introduction';
import MapContainer from './Map/MapContainer';
import FormContainer from './Form/FormContainer';
import Footer from './Footer';

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Introduction />
      <MapContainer />
      <FormContainer />
      <Footer />
    </div>
  );
};

export default App;
