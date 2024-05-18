import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function TimepickerComponent(props) {
  const {
    format = 'HH:mm',
    name = '',
    label = '',
    value = '',
    setValue,
    formik,
    size,
    marginTop = 16,
    minTime,
    maxTime,
  } = props;

  const handleChange = (newValue) => {
    // default set value
    if (setValue) setValue(newValue);

    // use formik
    if (formik) formik.setFieldValue(name, newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        format={format}
        name={name}
        size={size ?? 'small'}
        value={value === '' ? dayjs() : dayjs(value)}
        onChange={handleChange}
        label={label}
        sx={{ marginTop: `${marginTop}px !important` }}
        minTime={minTime}
        maxTime={maxTime}
      />
    </LocalizationProvider>
  );
}

TimepickerComponent.propTypes = {
  format: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
  formik: PropTypes.object,
  size: PropTypes.string,
  marginTop: PropTypes.number,
  minTime: PropTypes.object || PropTypes.string,
  maxTime: PropTypes.object || PropTypes.string,
};
