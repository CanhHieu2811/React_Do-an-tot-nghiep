import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/vi'
import { viVN } from '@mui/x-date-pickers/locales';

export default function DateTimepickerComponent(props) {
  const {
    format = 'DD/MM/YYYY',
    name = '',
    label = '',
    value = '',
    setValue,
    formik,
    size,
    marginTop = 16,
    minDateTime,
    maxDateTime,
  } = props;

  const handleChange = (newValue) => {
    // default set value
    if (setValue) setValue(newValue);

    // use formik
    if (formik) formik.setFieldValue(name, newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi' localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
      <DateTimePicker
        format={format}
        name={name}
        size={size ?? 'small'}
        value={value === '' ? dayjs() : dayjs(value)}
        onChange={handleChange}
        label={label}
        sx={{ marginTop: `${marginTop}px !important` }}
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        dayOfWeekFormatter={(day) => `${dayjs(day).format('ddd')}`}
      />
    </LocalizationProvider>
  );
}

DateTimepickerComponent.propTypes = {
  format: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
  formik: PropTypes.object,
  size: PropTypes.string,
  marginTop: PropTypes.number,
  minDateTime: PropTypes.string,
  maxDateTime: PropTypes.string,
};
