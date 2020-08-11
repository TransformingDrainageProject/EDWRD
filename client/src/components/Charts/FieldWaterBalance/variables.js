module.exports = [
  {
    index: 0,
    key: 'precipitation',
    title: 'Precipitation',
    unit: 'inches',
    description:
      'The total monthly amount of precipitation falling on the field.',
  },
  {
    index: 1,
    key: 'irrigation',
    title: 'Applied Irrigation',
    unit: '%',
    description: 'The total monthly amount of irrigation applied to the field.',
  },
  {
    index: 2,
    key: 'upwardFlux',
    title: 'Upward Flux',
    unit: '%',
    description:
      'The total monthly amount of upward flux of water into the crop root zone from a shallow water table.',
  },
  {
    index: 3,
    key: 'cropTranspiration',
    title: 'Crop Transpiration',
    unit: 'inches',
    description:
      'The total monthly amount of water that is lost from the field through crop transpiration.',
  },
  {
    index: 4,
    key: 'potentialCropTranspiration',
    title: 'Potential Crop Transpiration',
    unit: '%',
    description:
      'The total potential monthly amount of water that is lost from the field through crop transpiration.',
  },
  {
    index: 5,
    key: 'evapotranspiration',
    title: 'Evapotranspiration',
    unit: 'kilograms',
    description:
      'The total monthly amount of water lost from the field through crop transpiration and evaporation from the surface.',
  },
  {
    index: 6,
    key: 'potentialEvapotranspiration',
    title: 'Potential Evapotranspiration',
    unit: '%',
    description:
      'The total potential monthly amount of water lost from the field through crop transpiration and evaporation from the surface.',
  },
  {
    index: 7,
    key: 'soilEvaporation',
    title: 'Soil Evaporation',
    unit: 'acre-feet',
    description:
      'The total monthly amount of water that is lost from the field through evaporation from the surface.',
  },
  {
    index: 8,
    key: 'runoff',
    title: 'Runoff',
    unit: '%',
    description:
      'The total monthly amount of water that is lost from the field through surface runoff',
  },
  {
    index: 9,
    key: 'tileDrainFlow',
    title: 'Tile Drain Flow',
    unit: '%',
    description:
      'The total monthly amount of water that is lost from the field through tile drain flow.',
  },
  {
    index: 10,
    key: 'readilyAvailableWater',
    title: 'Readily Available Water',
    unit: '%',
    description:
      'The average monthly amount of water in the soil profile that defines the point at which crop stress occurs. If soil moisture is less than this value, crop stress occurs due to too little available water in the soil profile.',
  },
  {
    index: 11,
    key: 'soilMoisture',
    title: 'Soil Moisture',
    unit: '%',
    description:
      'The average monthly amount of available water in the soil profile.',
  },
];
