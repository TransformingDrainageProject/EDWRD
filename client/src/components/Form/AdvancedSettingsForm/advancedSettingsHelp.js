import React from 'react';

export const advancedSettingsHelp = {
  rseep: (
    <div>
      Enter a value that represents an estimated average daily seepage rate from
      the reservoir. This value will be applied each day to calculate the daily
      amount of reservoir seepage.
    </div>
  ),
  zrfc: (
    <div>
      Enter a value for the volumetric water content when the soil profile is at
      field capacity. In poorly drained landscapes this often occurs at a water
      potential nearly equal to the depth of the tile drains (e.g., 0.1-bar
      potential = 1 meter tile drain depth). Together with “
      <em>Soil profile wilting point</em>” this defines the total available
      water holding capacity of your soil. You can find information on soil
      water retention characteristics using tools such as{' '}
      <a
        href="https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm"
        target="_blank"
        rel="noopener noreferrer"
      >
        WebSoilSurvey
      </a>
      ,{' '}
      <a
        href="https://casoilresource.lawr.ucdavis.edu/gmap/"
        target="_blank"
        rel="noopener noreferrer"
      >
        SoilWeb
      </a>
      , and the{' '}
      <a
        href="https://casoilresource.lawr.ucdavis.edu/see/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Soils Series Extent Explorer
      </a>
      .
    </div>
  )
};
