function createDateString(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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

console.log(createDateString(plantDateStart));

export const advUSInitialValues = {
  rew: 0.4,
  rseep: 0.04,
  ze: 0.33,
  zefc: 0.36,
  zewp: 0.14,
  zrfc: 0.29,
  zrwp: 0.15,
  plantDateStart: createDateString(plantDateStart),
  plantDateEnd: createDateString(plantDateEnd),
  initDateStart: createDateString(initDateStart),
  initDateEnd: createDateString(initDateEnd),
  initKC: 0.15,
  initCropHeight: 0.67,
  devDateStart: createDateString(devDateStart),
  devDateEnd: createDateString(devDateEnd),
  midDateStart: createDateString(midDateStart),
  midDateEnd: createDateString(midDateEnd),
  midKC: 1.15,
  midCropHeight: 6.6,
  lateDateStart: createDateString(lateDateStart),
  lateDateEnd: createDateString(lateDateEnd)
};

export const advMetricInitialValues = {
  rew: 10.0,
  rseep: 0.9,
  ze: 0.1,
  zefc: 0.36,
  zewp: 0.14,
  zrfc: 0.29,
  zrwp: 0.15,
  plantDateStart: createDateString(plantDateStart),
  plantDateEnd: createDateString(plantDateEnd),
  initDateStart: createDateString(initDateStart),
  initDateEnd: createDateString(initDateEnd),
  initKC: 0.15,
  initCropHeight: 0.2,
  devDateStart: createDateString(devDateStart),
  devDateEnd: createDateString(devDateEnd),
  midDateStart: createDateString(midDateStart),
  midDateEnd: createDateString(midDateEnd),
  midKC: 1.15,
  midCropHeight: 2.01,
  lateDateStart: createDateString(lateDateStart),
  lateDateEnd: createDateString(lateDateEnd)
};
