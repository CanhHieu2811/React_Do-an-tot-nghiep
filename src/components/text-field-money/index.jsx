import {
  TextField,
  Typography,
  Box,
  // IconButton,
  // InputAdornment,
} from '@mui/material';
import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { formatNumberMoney } from 'src/utils/constant';
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';

export default function TextFieldMoney(props) {
  const { value, formik, formName, label, variant = 'outlined', onChange, error = false, disabled = false } = props;
  const donViTienTe = useSelector((state) => state.auth.donViTienTe);
  // const [helpText, setHelpText] = useState(formatNumberMoney(value.toString()));
  // const onChangeNumber = (e) => {
  //   const intRexExp = /^[1-9]\d*$/;
  //   if (intRexExp.test(e.target.value) || e.target.value === '') {
  //     const valueNumber = formatNumberMoney(e.target.value);
  //     if (formik) {
  //       formik.setFieldValue(formName, e.target.value);
  //     }
  //     setHelpText(valueNumber);
  //   }
  // };
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <NumericFormat
          name={formName}
          value={value}
          customInput={TextField}
          thousandSeparator=","
          label={label}
          variant={variant}
          error={error}
          disabled={disabled}
          onValueChange={(values, sourceInfo) => {
            if (formik) {
              formik.setFieldValue(formName, values.floatValue);
            }

            if (onChange) {
              onChange(values.floatValue);
            }
          }}
          // suffix={donViTienTe || 'VND'}
        />
        <Typography
          variant="caption"
          sx={{
            fontWeight: 'bold',
            position: 'absolute',
            top: '50%',
            right: '12px',
            transform: 'translate(0, -50%)',
          }}
        >
          {donViTienTe || 'đ'}
        </Typography>
      </Box>
      {/* ;
      <TextField
        name={formName}
        onChange={(e) => onChangeNumber(e)}
        value={value}
        label={label}
        type="number"
        variant={variant}
        helperText={
          <span style={{ fontWeight: 'bold' }}>{`${helpText} ${donViTienTe || 'VND'}`}</span>
        }
        InputProps={{
          endAdornment: (
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              {donViTienTe || 'VND'}
            </Typography>
          ),
        }}
      /> */}
    </>
  );
}

TextFieldMoney.propTypes = {
  formik: PropTypes.object,
  value: PropTypes.any,
  formName: PropTypes.string,
  label: PropTypes.any,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  disabled: PropTypes.bool
};
