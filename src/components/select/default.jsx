// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Box, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

export default function SelectDefaultComponent(props) {
  const {
    error = false,
    textError = '',
    sx,
    title,
    all = true,
    data = [],
    fieldValue = '',
    fieldName = '',
    setValue,
    value,
  } = props;
  const { t } = useTranslation();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box>
      <FormControl sx={{ ...sx, minWidth: 120 }} size="small" error={error}>
        <InputLabel id="demo-select-small-label" sx={{ fontSize: 14 }}>
          {title || t('select.placeholder')}
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          {all && (
            <MenuItem value="">
              <em>{t('select.all')}</em>
            </MenuItem>
          )}
          {data &&
            data.length &&
            data.map((el, i) => (
              <MenuItem key={i} value={el[fieldValue]}>
                {el[fieldName]}
              </MenuItem>
            ))}
        </Select>
        {error && <FormHelperText color="error">{textError}</FormHelperText>}
      </FormControl>
    </Box>

    //
  );
}

SelectDefaultComponent.propTypes = {
  error: PropTypes.bool,
  textError: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  all: PropTypes.bool,
  data: PropTypes.array,
  fieldValue: PropTypes.string,
  fieldName: PropTypes.string,
  setValue: PropTypes.func,
  value: PropTypes.string || PropTypes.number,
};
