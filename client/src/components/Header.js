import React from 'react';

import edwrdLogo from '../assets/images/tdp_header.png';

const Header = () => {
  return (
    <div className="row">
      <img
        src={edwrdLogo}
        className="mx-auto d-block"
        alt="Evaluating Drainage Water Recycling Decisions (EDWRD) Logo"
        style={{ padding: '15px', width: '100%' }}
      />
    </div>
  );
};

export default Header;
