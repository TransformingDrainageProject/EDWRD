import { addToDate, createDateString } from './dateUtils';

import {
  GROWING_DATES,
  CORN_DATE_RANGES,
  SOYBEAN_DATE_RANGES,
} from './constants';

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
