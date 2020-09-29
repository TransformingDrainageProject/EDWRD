import React from 'react';
import { Col, Row } from 'reactstrap';

const Introduction = () => (
  <Row>
    <Col>
      <p>
        EDWRD provides an estimate of the potential benefits that result from
        capturing drained agricultural water in various sizes of water storage
        reservoirs for reuse as irrigation, a practiced referred to as drainage
        water recycling.  The benefits of drainage water recycling include (1)
        the ability to apply supplemental irrigation during the growing season,
        and (2) a reduction of nutrient-rich drainage water into downstream
        water bodies. See 
        <a
          href="https://mdc.itap.purdue.edu/item.asp?Item_Number=ABE-156-W"
          target="_blank"
          rel="noopener noreferrer"
        >
          Questions and Answers About Drainage Water Recycling for the Midwest
        </a>{' '}
        for more information on this practice.
      </p>
      <p>
        This tool uses a water balance approach to estimate the potential
        benefits of drainage water recycling, based on information about your
        local weather, soil, crop, and drainage patterns. You can find out more
        about the methods used in our tool documentation{' '}
        <em>&lt;insert link&gt;</em>.
      </p>
    </Col>
  </Row>
);

export default Introduction;
