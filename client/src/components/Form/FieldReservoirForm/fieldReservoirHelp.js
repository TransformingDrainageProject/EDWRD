import React from 'react';

export const fieldReservoirHelp = {
  soilType: (
    <span>
      Select the most representative soil type in your field. EDWRD uses this
      soil type to estimate the water holding capacity of the soil to support
      crops. You may customize this by going to “
      <strong>Advanced Settings</strong>” below and adjusting values for “Soil
      profile field capacity” and “Soil profile wilting point”.
    </span>
  ),
  zr: (
    <span>
      Enter a value that represents that average depth to tile drains in your
      field. EDWRD uses this value to define the soil profile depth used in
      estimating the total available water for growing crops. The deeper the
      tile drain depth then more water that can be held by the soil between the
      surface and tile drain.
    </span>
  ),
  darea: (
    <span>
      Enter the size of the drainage area contributing to the reservoir. This
      value will influence how much total water is supplied to the reservoir
      through the tile drains. You may select the checkbox to also include
      surface runoff as an inflow to the reservoir.
    </span>
  ),
  rarea: (
    <span>
      Enter the size and average depth of the reservoir. EDWRD uses these values
      to estimate the maximum water storage capacity of the reservoir. When
      viewing results, EDWRD will also include results for a range of other
      reservoir sizes, both smaller and larger, for comparison.
    </span>
  ),
  iarea: (
    <span>
      Enter the size of the field to be irrigated from the reservoir. This may
      be smaller, larger, or equal to the drained area depending on your
      situation. For example, the field that is drained may not be the same
      field that is irrigated, or a single drained field may be used to irrigate
      multiple other fields during years where irrigation needs are minor.
    </span>
  )
};
