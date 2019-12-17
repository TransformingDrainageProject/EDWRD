/**
 * addToDate - Add n days to date.
 *
 * @param  {Date}   date      Initial date
 * @param  {Number} daysToAdd Number of days to add to initial date
 * @return {Date}             Initial date advanced by provided number of days
 */
function addToDate(date, daysToAdd) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + daysToAdd
  );
}

/**
 * createDateString - Convert Date object into string YYYY-MM-DD
 *
 * @param  {Date}   date Date to be converted to a string
 * @return {String}      Date as a string YYYY-MM-DD
 */
function createDateString(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * getGrowingSeasons - Calculates and returns growing season dates
 *
 * @param  {Object} dateRange Planting and harvest dates for growing season
 * @param  {Object} daysToAdd Days to add to planting date based on crop type
 * @return {Array}            Growing season date ranges
 */
function getGrowingSeasons(dateRange, daysToAdd) {
  return [
    { name: "plantDateStart", value: dateRange.start },
    { name: "plantDateEnd", value: addToDate(dateRange.start, daysToAdd.init) },
    {
      name: "initDateStart",
      value: addToDate(dateRange.start, daysToAdd.init)
    },
    { name: "initDateEnd", value: addToDate(dateRange.start, daysToAdd.dev) },
    { name: "devDateStart", value: addToDate(dateRange.start, daysToAdd.dev) },
    { name: "devDateEnd", value: addToDate(dateRange.start, daysToAdd.mid) },
    { name: "midDateStart", value: addToDate(dateRange.start, daysToAdd.mid) },
    { name: "midDateEnd", value: addToDate(dateRange.start, daysToAdd.late) },
    {
      name: "lateDateStart",
      value: addToDate(dateRange.start, daysToAdd.late)
    },
    { name: "lateDateEnd", value: dateRange.end },
    { name: "harvestDateStart", value: dateRange.end },
    { name: "harvestDateEnd", value: dateRange.end }
  ];
}

// Planting and harvest dates based on state
const year = new Date().getFullYear();
const growingDates = {
  il: { start: new Date(year, 4, 7), end: new Date(year, 9, 14) },
  in: { start: new Date(year, 4, 16), end: new Date(year, 9, 21) },
  ia: { start: new Date(year, 4, 6), end: new Date(year, 9, 22) },
  ks: { start: new Date(year, 3, 30), end: new Date(year, 9, 2) },
  ky: { start: new Date(year, 4, 4), end: new Date(year, 9, 1) },
  mi: { start: new Date(year, 4, 14), end: new Date(year, 10, 2) },
  mn: { start: new Date(year, 4, 7), end: new Date(year, 9, 23) },
  mo: { start: new Date(year, 4, 4), end: new Date(year, 9, 6) },
  nb: { start: new Date(year, 4, 6), end: new Date(year, 9, 22) },
  nd: { start: new Date(year, 4, 15), end: new Date(year, 9, 29) },
  oh: { start: new Date(year, 4, 9), end: new Date(year, 9, 31) },
  sd: { start: new Date(year, 4, 14), end: new Date(year, 9, 26) },
  wi: { start: new Date(year, 4, 14), end: new Date(year, 9, 31) }
};

// Days to increment planting date by based on crop type and part of season
const cornDaysToAdd = {
  plant: 0,
  init: 30,
  dev: 30 + 40,
  mid: 30 + 40 + 50,
  late: 30 + 40 + 50 + 30,
  harvest: 0
};
const soyDaysToAdd = {
  plant: 0,
  init: 20,
  dev: 20 + 35,
  mid: 20 + 35 + 60,
  late: 20 + 35 + 60 + 25,
  harvest: 0
};

/**
 * updateGrowingSeasonFields - Updates the initial growing season dates
 *                             based on the location (state) and crop type
 *
 * @param  {Object} actions    Functions for setting Formik values and touch
 * @param  {String} cropType   Type of crop - corn or soybean
 * @param  {String} unitType   Selected unit system - us or metric
 * @param  {String} fieldState Selected state (e.g. 'in' for Indiana)
 * @return {type}              None
 */
function updateGrowingSeasonFields(actions, cropType, unitType, fieldState) {
  try {
    const daysToAdd = cropType === "corn" ? cornDaysToAdd : soyDaysToAdd;
    let dateRange = growingDates[fieldState];

    getGrowingSeasons(dateRange, daysToAdd).forEach(field => {
      actions.setFieldValue(field.name, createDateString(field.value));
      actions.setFieldTouched(field.name, true);
    });
  } catch (err) {
    return false;
  }
  return true;
}

export default updateGrowingSeasonFields;
