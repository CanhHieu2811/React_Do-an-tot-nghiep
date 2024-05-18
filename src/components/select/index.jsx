import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from '../iconify';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SelectComponent(props) {
  const { t } = useTranslation();
  const {
    formName = '',
    label,
    defaultOption,
    setValue,
    formik,
    data,
    optionName,
    multiple = false,
    size = 'small',
    clearIcon = false,
    fieldValue,
    placeholder,
    onChange,
    disabled = false,
    variant = 'outlined',
    cssObject = null,
    error = false,
    componentsProps = {},
    disableCloseOnSelect = false,
    multipleChecked = false,
    limitTags = 1,
    fullWidth = false
  } = props;
  const [valueSelect, setValueSelect] = useState(defaultOption);
  useEffect(() => {
    setValueSelect(defaultOption);
  }, [defaultOption]);
  const handleChange = (event, newValue) => {
    if (newValue) setValueSelect(newValue);
    // // default set value
    if (setValue) {
      setValue(newValue);
    }
    // // use formik
    if (formik) {
      if (multiple) {
        formik.setFieldValue(formName, newValue);
      }

      if (optionName && ![undefined, null].includes(newValue?.[fieldValue])) {
        formik.setFieldValue(formName, newValue && newValue?.[fieldValue]);
      }
    }

    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <Autocomplete
      noOptionsText={t('field.noOptions')}
      disabled={disabled}
      multiple={multiple}
      limitTags={limitTags}
      disableCloseOnSelect={disableCloseOnSelect}
      size={size}
      autoComplete
      getOptionLabel={(option) => (optionName ? option?.[optionName] ?? '' : option)}
      includeInputInList
      options={data}
      value={valueSelect}
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          name={formName}
          {...params}
          placeholder={placeholder}
          label={label}
          variant={variant}
          sx={{ marginTop: 0 }}
          error={error}
        />
      )}
      sx={cssObject}
      onChange={handleChange}
      clearIcon={clearIcon && <Iconify icon="eva:close-outline" width={16} />}
      componentsProps={componentsProps}
      // eslint-disable-next-line no-shadow
      renderOption={(props, option, { index, selected }) => (
        <li {...props} key={option?.[fieldValue] ?? index}>
          {multipleChecked && (
            <Checkbox
              key={index}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
          )}
          {optionName ? option?.[optionName] ?? '' : option}
        </li>
      )}
      // isOptionEqualToValue={(option, value) => option[fieldValue] === value[fieldValue]}
    />
  );
}

SelectComponent.propTypes = {
  cssObject: PropTypes.object,
  formName: PropTypes.string,
  label: PropTypes.any,
  defaultOption: PropTypes.any,
  setValue: PropTypes.func,
  formik: PropTypes.object,
  data: PropTypes.array,
  multiple: PropTypes.bool,
  size: PropTypes.string,
  optionName: PropTypes.string,
  clearIcon: PropTypes.bool,
  fieldValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  error: PropTypes.bool,
  componentsProps: PropTypes.object,
  disableCloseOnSelect: PropTypes.bool,
  multipleChecked: PropTypes.bool,
  limitTags: PropTypes.number,
  fullWidth: PropTypes.bool
};
