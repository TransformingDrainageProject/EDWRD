import moment from 'moment';

import { addToDate } from './dateUtils';
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
    { name: 'plantDateStart', value: dateRange.planting },
    {
      name: 'initDateStart',
      value: addToDate(dateRange.planting, 1),
    },
    { name: 'initDateEnd', value: addToDate(dateRange.planting, days.init) },
    {
      name: 'devDateStart',
      value: addToDate(dateRange.planting, days.init + 1),
    },
    { name: 'devDateEnd', value: addToDate(dateRange.planting, days.dev) },
    {
      name: 'midDateStart',
      value: addToDate(dateRange.planting, days.dev + 1),
    },
    { name: 'midDateEnd', value: addToDate(dateRange.planting, days.mid) },
    {
      name: 'lateDateStart',
      value: addToDate(dateRange.planting, days.mid + 1),
    },
    {
      name: 'lateDateEnd',
      value: addToDate(dateRange.planting, days.late),
    },
    { name: 'harvestDateStart', value: dateRange.harvest },
  ];
}

/**
 * updateSoilFreezeAndThawDates - Update the soil freeze and thaw dates
 *
 * @param  {type} actions     Functions for setting Formik values and touch
 * @param  {type} frzThwDates Days from start of year freeze and thaw begin
 * @return {Boolean}          Returns true if succeeds, false otherwise
 */
function updateSoilFreezeAndThawDates(actions, frzThwDates) {
  try {
    const FIRST_OF_YEAR = new Date(new Date().getFullYear(), 0, 1);
    const FIRST_OF_NEXT_YEAR = new Date(new Date().getFullYear() + 1, 0, 1);
    const thawDate = addToDate(FIRST_OF_NEXT_YEAR, frzThwDates.thaw);
    const freezeDate = addToDate(FIRST_OF_YEAR, frzThwDates.freeze);
    actions.setFieldValue('soilDateStart', moment(freezeDate));
    actions.setFieldTouched('soilDateStart');
    actions.setFieldValue('soilDateEnd', moment(thawDate));
    actions.setFieldTouched('soilDateEnd');
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

/**
 * updateGrowingSeasonFields - Updates the initial growing season dates
 *                             based on the location (state) and crop type
 *
 * @param  {Object} actions     Functions for setting Formik values and touch
 * @param  {String} cropType    Type of crop - corn or soybean
 * @param  {String} unitType    Selected unit system - us or metric
 * @param  {String} fieldState  Selected state (e.g. 'in' for Indiana)
 * @param  {Object} frzThwDates Freeze and thaw dates based on location
 * @return {Boolean}            Returns true if succeeds, false otherwise
 */
function updateGrowingSeasonFields(
  actions,
  cropType,
  unitType,
  fieldState,
  frzThwDates
) {
  if (fieldState) {
    try {
      const days = cropType === 'corn' ? CORN_DATE_RANGES : SOYBEAN_DATE_RANGES;
      let dateRange = GROWING_DATES[fieldState];

      getGrowingSeasons(dateRange, days).forEach((field) => {
        actions.setFieldValue(field.name, moment(field.value));
        actions.setFieldTouched(field.name, true);
      });

      updateSoilFreezeAndThawDates(actions, frzThwDates);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
  return false;
}

export default updateGrowingSeasonFields;
