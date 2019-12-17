import {
  GROWING_DATES,
  CORN_DATE_RANGES,
  SOYBEAN_DATE_RANGES,
} from './constants';

/**
 * addToDate - Add n days to date.
 *
 * @param  {Date}   date Initial date
 * @param  {Number} days Number of days to add to initial date
 * @return {Date}        Initial date advanced by provided number of days
 */
function addToDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/**
 * createDateString - Convert Date object into string YYYY-MM-DD
 *
 * @param  {Date}   date Date to be converted to a string
 * @return {String}      Date as a string YYYY-MM-DD
 */
function createDateString(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * getGrowingSeasons - Calculates and returns growing season dates
 *
 * @param  {Object} dateRange Planting and harvest dates for growing season
 * @param  {Object} days      Days to add to planting date based on crop type
 * @return {Array}            Growing season date ranges
 */
function getGrowingSeasons(dateRange, days) {
  return [
    { name: 'plantDateStart', value: dateRange.start },
    { name: 'plantDateEnd', value: addToDate(dateRange.start, days.init) },
    {
      name: 'initDateStart',
      value: addToDate(dateRange.start, days.init),
    },
    { name: 'initDateEnd', value: addToDate(dateRange.start, days.dev) },
    { name: 'devDateStart', value: addToDate(dateRange.start, days.dev) },
    { name: 'devDateEnd', value: addToDate(dateRange.start, days.mid) },
    { name: 'midDateStart', value: addToDate(dateRange.start, days.mid) },
    { name: 'midDateEnd', value: addToDate(dateRange.start, days.late) },
    {
      name: 'lateDateStart',
      value: addToDate(dateRange.start, days.late),
    },
    { name: 'lateDateEnd', value: dateRange.end },
    { name: 'harvestDateStart', value: dateRange.end },
    { name: 'harvestDateEnd', value: dateRange.end },
  ];
}

/**
 * updateGrowingSeasonFields - Updates the initial growing season dates
 *                             based on the location (state) and crop type
 *
 * @param  {Object} actions    Functions for setting Formik values and touch
 * @param  {String} cropType   Type of crop - corn or soybean
 * @param  {String} unitType   Selected unit system - us or metric
 * @param  {String} fieldState Selected state (e.g. 'in' for Indiana)
 * @return {Boolean}           Returns true if succeeds, false otherwise
 */
function updateGrowingSeasonFields(actions, cropType, unitType, fieldState) {
  try {
    const days = cropType === 'corn' ? CORN_DATE_RANGES : SOYBEAN_DATE_RANGES;
    let dateRange = GROWING_DATES[fieldState];

    getGrowingSeasons(dateRange, days).forEach(field => {
      actions.setFieldValue(field.name, createDateString(field.value));
      actions.setFieldTouched(field.name, true);
    });
  } catch (err) {
    return false;
  }
  return true;
}

export default updateGrowingSeasonFields;
