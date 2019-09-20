import React from 'react';

import Header from './Header';
import FormContainer from './FormContainer';
import Footer from './Footer';

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <FormContainer />
      <Footer />
    </div>
  );
};

export default App;
