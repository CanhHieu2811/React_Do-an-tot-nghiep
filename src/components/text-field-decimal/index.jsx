import {
  TextField,
  // Typography,
  Box,
  // IconButton,
  // InputAdornment,
} from '@mui/material';
import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { formatNumberMoney } from 'src/utils/constant';
// import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';

export default function TextFieldDecimal(props) {
  const {
    value,
    formik,
    formName,
    label,
    variant = 'outlined',
    onChange,
    error = false,
    disabled = false,
    decimalScale = 3,
    // format = '##.###',
    max = 2
  } = props;
  return (
    <Box sx={{ position: 'relative' }}>
      <NumericFormat
        name={formName}
        value={value}
        customInput={TextField}
        decimalScale={decimalScale}
        // format={format || '#.###' || '#' || '##'}
        label={label}
        variant={variant}
        error={error}
        disabled={disabled}
        // maxLength={2}
        onValueChange={(values, sourceInfo) => {
          if (formik) {
            formik.setFieldValue(formName, values.formattedValue);
          }

          if (onChange) {
            onChange(values.formattedValue);
          }
        }}
        onInput={(e) => {
          if (e.target.value.length >= max) {
            if (!e.target.value.includes('.')) {
              e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, max);
            } else {
              const split = e.target.value.split('.')
              const valLeft = Math.max(0, parseInt(split[0], 10)).toString().slice(0, max);
              if(valLeft === 'Na') {
                e.target.value = '0'
              } else e.target.value = `${valLeft}.${split[1]}`
            }
          }
        }}
      />
    </Box>
  );
}

TextFieldDecimal.propTypes = {
  formik: PropTypes.object,
  value: PropTypes.any,
  formName: PropTypes.string,
  label: PropTypes.any,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  decimalScale: PropTypes.number,
  // format: PropTypes.string,
  max: PropTypes.number
};
