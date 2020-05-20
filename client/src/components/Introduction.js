import React from 'react';
import { Col, Row } from 'reactstrap';

const Introduction = ({ setUnitType, unitType }) => (
  <Row>
    <Col>
      <p>
        EDWRD provides an estimate of the potential benefits that result from
        capturing drained agricultural water in various sizes of water storage
        reservoirs for reuse as irrigation, a practiced referred to as drainage
        water recycling.  The benefits of drainage water recycling include (1)
        the ability to apply supplemental irrigation during the growing season,
        and (2) a reduction of nutrient-rich drainage water into downstream
        water bodies. See Questions and Answers About Drainage Water
        Recycling for the Midwest for more information on this practice.
      </p>
      <p>
        This tool uses a water balance approach to estimate the potential
        benefits of drainage water recycling, based on information about your
        local weather, soil, crop, and drainage patterns. You can find out more
        about the methods used in our tool documentation.
      </p>
      <p>
        Before you run tool, you can select your preferred units for the
        results:
      </p>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="unitType"
          id="usUnits"
          value="us"
          onChange={(e) => setUnitType(e.target.value)}
          checked={unitType === 'us'}
        />
        <label className="form-check-label" htmlFor="usUnits">
          U.S. Standard
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="unitType"
          id="metricUnits"
          value="metric"
          onChange={(e) => setUnitType(e.target.value)}
          checked={unitType === 'metric'}
        />
        <label className="form-check-label" htmlFor="metricUnits">
          Metric
        </label>
      </div>
    </Col>
  </Row>
);

export default Introduction;
