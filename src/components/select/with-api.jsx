import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';

import { getData, authGetData } from 'src/utils/request';

export default function SelectAPIComponent(props) {
  const {
    url = '',
    error,
    textError = '',
    sx,
    // title,
    all = true,
    // fieldValue = '',
    fieldName = '',
    auth,
    setValue,
    // value,
    size = 'small',
    formik,
    name
  } = props;
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (auth) {
      authGetData({
        url,
        onSuccess: (res) => {
          if (res && res.data) setData(res.data);
        },
      });
    } else {
      getData({
        url,
        onSuccess: (res) => {
          if (res && res.data) setData(res.data);
        },
      });
    }
  }, [auth, url]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box>
      <FormControl sx={{ ...sx, minWidth: 120 }} size={size} error={error}>
        {/* <InputLabel id="demo-select-small-label" sx={{ fontSize: 14 }}>
          {title || t('select.placeholder')}
        </InputLabel> */}
        <Select
          name={name}
          value={formik.values[name] ?? ''}
          onChange={(e) =>
            formik ? formik.setFieldValue(name, e.target.value) : handleChange
          }
          size={size}
        >
          {all && (
            <MenuItem value="">
              <em>{t('select.all')}</em>
            </MenuItem>
          )}
          {data &&
            data.length &&
            data.map((el, i) => (
              <MenuItem key={i} value={el[name]}>
                {el[fieldName]}
              </MenuItem>
            ))}
        </Select>
        {error && <FormHelperText>{textError}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

SelectAPIComponent.propTypes = {
  url: PropTypes.string,
  error: PropTypes.bool,
  textError: PropTypes.string,
  sx: PropTypes.object,
  // title: PropTypes.string,
  size: PropTypes.string,
  all: PropTypes.bool,
  // fieldValue: PropTypes.string,
  fieldName: PropTypes.string,
  auth: PropTypes.bool,
  setValue: PropTypes.func,
  // value: PropTypes.string || PropTypes.number,
  formik: PropTypes.object,
  name: PropTypes.string
};
