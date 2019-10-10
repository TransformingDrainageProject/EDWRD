import './App.css';
import React from 'react';

import Header from './Header';
import Introduction from './Introduction';
import Map from './Map';
import FormContainer from './FormContainer';
import Footer from './Footer';

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Introduction />
      <Map />

      <Footer />
    </div>
  );
};

export default App;
