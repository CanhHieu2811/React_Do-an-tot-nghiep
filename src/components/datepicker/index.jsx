import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/vi';
import { viVN } from '@mui/x-date-pickers/locales';

export default function DatepickerComponent(props) {
  const {
    name = '',
    label = '',
    value = '',
    setValue,
    formik,
    size,
    views = ['day', 'month', 'year'],
    format = 'DD/MM/YYYY',
    marginTop = '16px',
    slotProps = null,
    disabled = false,
    disablePast = false,
    minDate,
    maxDate,
    onChangeProp,
    // valueNull = false,
  } = props;

  const handleChange = (newValue) => {
    // default set value
    if (setValue) setValue(newValue);

    // use formik
    if (formik) formik.setFieldValue(name, newValue);
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="vi"
      localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <DatePicker
        format={format}
        name={name}
        size={size ?? 'small'}
        // eslint-disable-next-line no-nested-ternary
        value={value === null ? null : value === '' ? dayjs() : dayjs(value)}
        onChange={onChangeProp ?? handleChange}
        label={label}
        sx={{ marginTop: `${marginTop} !important` }}
        views={views}
        slotProps={slotProps}
        disabled={disabled}
        disablePast={disablePast}
        minDate={minDate}
        maxDate={maxDate}
        dayOfWeekFormatter={(day) => `${dayjs(day).format('ddd')}`}
        className={disablePast ? 'block-past-date' : ''}
      />
      {/* </DemoItem> */}
    </LocalizationProvider>
  );
}

DatepickerComponent.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
  formik: PropTypes.object,
  size: PropTypes.string,
  views: PropTypes.array,
  format: PropTypes.string,
  marginTop: PropTypes.string,
  slotProps: PropTypes.object,
  disabled: PropTypes.bool,
  disablePast: PropTypes.bool,
  minDate: PropTypes.object || PropTypes.string,
  maxDate: PropTypes.object || PropTypes.string,
  onChangeProp: PropTypes.func,
  // valueNull: PropTypes.bool,
};
