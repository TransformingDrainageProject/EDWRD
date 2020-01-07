import moment from 'moment';

// Default dates for Illinois (default map marker location)
const year = new Date().getFullYear();
const plantDateStart = new Date(year, 4, 7);
const plantDateEnd = new Date(year, 4, 7 + 30);
const initDateStart = new Date(year, 4, 7 + 30);
const initDateEnd = new Date(year, 4, 7 + 30 + 40);
const devDateStart = new Date(year, 4, 7 + 30 + 40);
const devDateEnd = new Date(year, 4, 7 + 30 + 40 + 50);
const midDateStart = new Date(year, 4, 7 + 30 + 40 + 50);
const midDateEnd = new Date(year, 4, 7 + 30 + 40 + 50 + 30);
const lateDateStart = new Date(year, 4, 7 + 30 + 40 + 50 + 30);
const lateDateEnd = new Date(year, 9, 14);
const harvestDateStart = new Date(year, 9, 14);
const soilDateStart = new Date(year, 0, 1 + 311.46277);
const soilDateEnd = new Date(year + 1, 0, 1 + 86.998985);

const unitlessInitialValues = {
  plantDateStart: moment(plantDateStart),
  plantDateEnd: moment(plantDateEnd),
  initDateStart: moment(initDateStart),
  initDateEnd: moment(initDateEnd),
  devDateStart: moment(devDateStart),
  devDateEnd: moment(devDateEnd),
  midDateStart: moment(midDateStart),
  midDateEnd: moment(midDateEnd),
  lateDateStart: moment(lateDateStart),
  lateDateEnd: moment(lateDateEnd),
  harvestDateStart: moment(harvestDateStart),
  soilDateStart: moment(soilDateStart),
  soilDateEnd: moment(soilDateEnd),
  zefc: 0.36,
  zewp: 0.14,
  zrfc: 0.29,
  zrwp: 0.15,
  initKC: 0.15,
  midKC: 1.15,
};

export const advUSInitialValues = {
  rew: 0.4,
  rseep: 0.04,
  ze: 0.33,
  initCropHeight: 0.67,
  midCropHeight: 6.6,
  ...unitlessInitialValues,
};

export const advMetricInitialValues = {
  rew: 10.0,
  rseep: 0.9,
  ze: 0.1,
  initCropHeight: 0.2,
  midCropHeight: 2.01,
  ...unitlessInitialValues,
};
