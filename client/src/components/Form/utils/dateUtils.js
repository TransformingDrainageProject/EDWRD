/**
 * addToDate - Add n days to date.
 *
 * @param  {Date}   date Initial date
 * @param  {Number} days Number of days to add to initial date
 * @return {Date}        Initial date advanced by provided number of days
 */
export function addToDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/**
 * createDateString - Convert Date object into string YYYY-MM-DD
 *
 * @param  {Date}   date Date to be converted to a string
 * @return {String}      Date as a string YYYY-MM-DD
 */
export function createDateString(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0');
  return `${year}-${month}-${day}`;
}
