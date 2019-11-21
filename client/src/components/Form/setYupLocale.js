import { setLocale } from 'yup';

export default setLocale({
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
    }
  },
  number: {
    min: 'Must be greater than or equal to ${min}',
    max: 'Must be less than or equal to ${max}',
    positive: 'Must be greater than zero'
  }
});
