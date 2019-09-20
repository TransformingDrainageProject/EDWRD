import React from 'react';
import tdpHeader from '../assets/images/tdp_header.png';

const Header = () => {
  return (
    <img
      src={tdpHeader}
      alt="Evaluating Drainage Water Recycling Decisions (EDWRD) Logo"
      style={{ width: '100%' }}
    />
  );
};

export default Header;
