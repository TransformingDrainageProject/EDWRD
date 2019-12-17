import { setLocale } from 'yup';

import { createDateString } from './utils/dateUtils';

export default setLocale({
  date: {
    min: ({ min }) => `Must pick date on or after ${createDateString(min)}`,
    max: ({ max }) => `Must pick date on or before ${createDateString(max)}`,
  },
  mixed: {
    default: 'Invalid value',
    required: 'Required field',
    notType: function notType(_ref) {
      switch (_ref.type) {
        case 'number':
          return 'Must be a number';
        case 'string':
          return 'Must be a string';
        case 'date':
          return 'Must be a date mm/dd/yyyy';
        default:
          return 'Invalid value';
      }
    },
  },
  number: {
    min: ({ min }) => `Must be greater than or equal to ${min}`,
    max: ({ max }) => `Must be less than or equal to ${max}`,
    moreThan: ({ more }) => `Must be more than ${more}`,
    positive: 'Must be greater than zero',
  },
});
