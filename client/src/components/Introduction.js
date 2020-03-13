import React from 'react';

const Introduction = props => {
  const { setUnitType, unitType } = props;

  return (
    <div className="container">
      <div className="row mb-3">
        EDWRD requires information about your local weather, field conditions
        (e.g. soil type, crop), and estimates regarding reservoir size in order
        to evaluate a drainage water recycling system.
      </div>
      <div className="row mb-3">
        <strong>For users wanting a quick analysis</strong> to learn more about
        this tool and to see a few results describing the potential benefits of
        drainage water recycling, we've preloaded a set of defaults representing
        a corn field in east-central Indiana. Simply click on "Run EDWRD" to
        move on to viewing results.
      </div>
      <div className="row mb-3">
        <strong>For advanced users</strong> who would like to learn more about
        potential benefits at a particular site or who have their own data, you
        may edit the defaults provided below. You may find out more about
        specific inputs by hovering over the ? and we've identified important
        inputs ! which are influential in impacting results. These influential
        inputs should match your specific field conditions as closely as
        possible in order to get good estimates of the potential benefits from
        DWR for your site.
      </div>
      <div className="row mb-3">
        <span className="mr-3">Select units:</span>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="unitType"
            id="usUnits"
            value="us"
            onChange={e => setUnitType(e.target.value)}
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
            onChange={e => setUnitType(e.target.value)}
            checked={unitType === 'metric'}
          />
          <label className="form-check-label" htmlFor="metricUnits">
            Metric
          </label>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Introduction;
