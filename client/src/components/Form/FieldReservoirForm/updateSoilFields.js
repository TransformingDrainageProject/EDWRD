// default soil values (no units)
const soils = {
  loam: [
    { name: 'zrfc', value: 0.25 },
    { name: 'zrwp', value: 0.12 },
    { name: 'zefc', value: 0.3 },
    { name: 'zewp', value: 0.11 }
  ],
  siltLoam: [
    { name: 'zrfc', value: 0.29 },
    { name: 'zrwp', value: 0.15 },
    { name: 'zefc', value: 0.36 },
    { name: 'zewp', value: 0.14 },
    { name: 'rew', value: 10 }
  ],
  silt: [
    { name: 'zrfc', value: 0.32 },
    { name: 'zrwp', value: 0.17 },
    { name: 'zefc', value: 0.36 },
    { name: 'zewp', value: 0.12 },
    { name: 'rew', value: 10 }
  ],
  siltClayLoam: [
    { name: 'zrfc', value: 0.34 },
    { name: 'zrwp', value: 0.21 },
    { name: 'zefc', value: 0.37 },
    { name: 'zewp', value: 0.13 },
    { name: 'rew', value: 10 }
  ],
  siltyClay: [
    { name: 'zrfc', value: 0.36 },
    { name: 'zrwp', value: 0.23 },
    { name: 'zefc', value: 0.42 },
    { name: 'zewp', value: 0.17 },
    { name: 'rew', value: 11 }
  ],
  clay: [
    { name: 'zrfc', value: 0.36 },
    { name: 'zrwp', value: 0.22 },
    { name: 'zefc', value: 0.4 },
    { name: 'zewp', value: 0.15 },
    { name: 'rew', value: 11 }
  ]
};

// us conversion for readily evaporable water field
const us = soils => {
  soils['loam'].push({ name: 'rew', value: 0.35 });
  soils['siltLoam'].push({ name: 'rew', value: 0.39 });
  soils['silt'].push({ name: 'rew', value: 0.39 });
  soils['siltClayLoam'].push({ name: 'rew', value: 0.39 });
  soils['siltyClay'].push({ name: 'rew', value: 0.43 });
  soils['clay'].push({ name: 'rew', value: 0.43 });

  return soils;
};

// metric conversion for readily evaporable water field
const metric = soils => {
  soils['loam'].push({ name: 'rew', value: 9 });
  soils['siltLoam'].push({ name: 'rew', value: 10 });
  soils['silt'].push({ name: 'rew', value: 10 });
  soils['siltClayLoam'].push({ name: 'rew', value: 10 });
  soils['siltyClay'].push({ name: 'rew', value: 11 });
  soils['clay'].push({ name: 'rew', value: 11 });

  return soils;
};

export const updateSoilFields = (actions, soilType, unitType) => {
  const soilFields = unitType === 'metric' ? metric(soils) : us(soils);
  soilFields.forEach(field => {
    actions.setFieldValue(field.name, field.value);
    actions.setFieldTouched(field.name, true);
  });
};
