import React, { useState } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker as ReactDateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export function Arrow() {
  return (
    <svg
      className="DateRangePickerInput_arrow_svg DateRangePickerInput_arrow_svg_1"
      focusable="false"
      viewBox="0 0 1000 1000"
    >
      <path d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z"></path>
    </svg>
  );
}

const DateRangePicker = ({
  startDateId,
  endDateId,
  form: { setFieldValue, setFieldTouched, values },
  field,
  ...props
}) => {
  const startDateFieldName = field.name + 'Start';
  const endDateFieldName = field.name + 'End';

  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setFieldValue(startDateFieldName, startDate);
    setFieldTouched(startDateFieldName, true);
    setFieldValue(endDateFieldName, endDate);
    setFieldTouched(endDateFieldName, true);
  };

  const currentYear = new Date().getFullYear();
  const falseFunc = () => false;

  return (
    <ReactDateRangePicker
      disabled={props.disabled ? props.disabled : null}
      displayFormat="MMM DD"
      monthFormat="MMM DD"
      enableOutsideDays={true}
      isOutsideRange={falseFunc}
      minDate={moment(new Date(currentYear, 0, 1))}
      startDate={values[startDateFieldName]}
      startDateId={'id-' + field.name}
      endDate={values[endDateFieldName]}
      endDateId={'id-' + field.name}
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => setFocusedInput(focusedInput)}
    />
  );
};

export default DateRangePicker;
