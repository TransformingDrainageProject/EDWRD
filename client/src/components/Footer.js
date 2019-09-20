import React from 'react';

import tdpLogo from '../assets/images/tdp_logo.png';

const Footer = () => {
  return (
    <footer
      className="row"
      style={{ backgroundColor: '#eee', padding: '15px' }}
    >
      <div className="col-md-2">
        <a
          href="https://transformingdrainage.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={tdpLogo}
            className="img-fluid"
            alt="TransformingDrainage.org Logo"
            style={{ width: '100%' }}
          />
        </a>
      </div>
      <div className="col-md-10">
        This material is based upon work that is supported by the National
        Institute of Food and Agriculture, U.S. Department of Agriculture, under
        award number 2015-68007-23193, "Managing Water for Increased Resiliency
        of Drained Agricultural Landscape",
        <a
          href="https://transformingdrainage.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          transformingdrainage.org
        </a>
        . Any opinions, findings, conclusions, or recommendations expressed in
        this publication are those of the authors and do not necessarily reflect
        the view of the U.S. Department of Agriculture.
      </div>
    </footer>
  );
};

export default Footer;
