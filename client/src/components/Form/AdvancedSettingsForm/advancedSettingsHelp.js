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
  ),
  zrwp: (
    <div>
      Enter a value for the volumetric water content when the soil profile is at
      wilting point. This is commonly referred to as the water content at 15-bar
      water potential. Together with <em>“Soil profile field capacity”</em> this
      defines the total available water holding capacity of your soil. You can
      find information on soil water retention characteristics using tools such
      as{' '}
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
  ),
  ze: (
    <div>
      Enter a value for the depth of soil on the ground surface where water can
      evaporate. The deeper this layer is the more water is lost from the soil
      profile through evaporation. Unless you have field measurements, this
      value is often estimated to be somewhere between 10 to 15 centimeters (4
      to 6 inches).
    </div>
  ),
  rew: (
    <div>
      Enter a value that represents the amount of water that can be evaporated
      from the soil evaporation layer with any restrictions. The greater this
      value is the more water is lost from the soil profile through evaporation.
      Unless you have field measurements, this value is often estimated to be
      somewhere between 8 to 12 millimeters (0.3 to 0.5 inches), with higher
      values associated with more clayey soils
    </div>
  ),
  zefc: (
    <div>
      Enter a value for the volumetric water content when the soil evaporation
      layer is at field capacity. Together with{' '}
      <em>“Evaporation layer wilting point”</em> this defines the total amount
      of water than can be evaporated from the soil surface. You can find
      information on soil water retention characteristics using tools such as{' '}
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
  ),
  zewp: (
    <div>
      Enter a value for the volumetric water content when the soil evaporation
      layer is at wilting point. Together with{' '}
      <em>“Evaporation layer field capacity”</em> this defines the total amount
      of water than can be evaporated from the soil surface. You can find
      information on soil water retention characteristics using tools such as{' '}
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
  ),
  growNonGrowSeasons: (
    <div>
      <p>
        Enter typical dates for planting, harvest, crop growth, and soil freeze
        periods. These default values come from USDA reports, FAO-56 manual, and
        soil temperature information from the National Weather Service.
      </p>
      <p>
        You may also adjust typical crop coefficients and heights. Larger crop
        coefficients indicate great water use during particular crop growth
        periods.
      </p>
    </div>
  ),
  advCustomInput: (
    <div>
      Custom input files may be uploaded to set all inputs according to your
      specific conditions and scenarios. This file should be uploaded as a .txt
      file and formatted following this{' '}
      <a href="/api/example" target="_blank" rel="noopener noreferrer">
        example input file
      </a>
      .
    </div>
  )
};
