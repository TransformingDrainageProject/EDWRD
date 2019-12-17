import { CROP_HEIGHT_FIELDS, KC_FIELDS } from './constants';

/**
 * updateKCandCropHeight - Updates initial and mid-season KC and crop
 *                         height values based on the selected crop type
 *
 * @param  {Object} actions  Functions for setting Formik values and touch
 * @param  {String} cropType Type of crop - corn or soybean
 * @param  {String} unitType Selected unit system - us or metric
 * @return {Boolean}         Returns true if succeeds, false otherwise
 */
function updateKCandCropHeight(actions, cropType, unitType) {
  try {
    CROP_HEIGHT_FIELDS.forEach(field => {
      actions.setFieldValue(field.name, field[cropType][unitType]);
      actions.setFieldTouched(field.name, true);
    });
    KC_FIELDS.forEach(field => {
      actions.setFieldValue(field.name, field[cropType]);
      actions.setFieldTouched(field.name, true);
    });
  } catch (err) {
    return false;
  }
  return true;
}

export default updateKCandCropHeight;
