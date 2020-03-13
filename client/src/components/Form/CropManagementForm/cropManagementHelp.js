import React from 'react';

export const cropManagementHelp = {
  cropSelection: (
    <span>
      Based on location you selected above and your crop selection here, EDWRD
      will estimate important cropping system dates (e.g., planting, harvest,
      crop growth) and crop growth characteristics (e.g., crop coefficient,
      maximum crop height). You may customize these values to more accurately
      reflect your location and crop by going to “
      <strong>Advanced Settings</strong>” below.
    </span>
  ),
  irrdep: (
    <span>
      Describe your irrigation scheduling by either selecting a predefined
      irrigation approach or entering a value to specify a consistent irrigation
      amount to be applied during each irrigation event. “90% of water holding
      capacity” means that the amount of applied irrigation will be equal to
      what is required to refill the soil profile to 90% of the overall water
      holding capacity. “Deficit amount only” means that the amount of applied
      irrigation will be equal to the amount required to replace the daily soil
      water deficit.
    </span>
  ),
  advSettings: (
    <span>
      You may modify these Advanced Settings to provide more site-specific
      detail regarding your daily average reservoir seepage rate, soil and
      evaporation characteristics, and important cropping system dates and crop
      growth characteristics. You may also upload your own custom input file to
      access an even greater level of control over these inputs. A template
      input file may be downloaded from the bottom of the Advanced Settings
      window.
    </span>
  )
};
