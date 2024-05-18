import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

import { MenuItem, TextField } from '@mui/material';

import { getData, authGetData } from 'src/utils/request';

export default function SelectFieldAPIComponent(props) {
  const {
    url = '',
    name,
    fieldValue = '',
    fieldName = '',
    defaultValue = "",
    auth,
    size = 'small',
    onChange,
    label
  } = props;
  // const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    if (auth) {
      authGetData({
        url,
        onSuccess: (res) => {
          if (res && res.data) setData(res.data);
          setValue(defaultValue)
        },
      });
    } else {
      getData({
        url,
        onSuccess: (res) => {
          if (res && res.data) setData(res.data);
          setValue(defaultValue)
        },
      });
    }
  }, [auth, defaultValue, url]);

  const handleChange = (event) => {
    setValue(event.target.value);

    if(onChange) {
      onChange(name, event.target.value)
    }
  };
  return (

      <TextField
        name={name}
        label={label}
        size={size}
        select
        // eslint-disable-next-line no-unneeded-ternary
        // error={formik.touched.name && formik.errors.name ? true : false}
        value={value}
        onChange={handleChange}
      >
        {data &&
          data.map((el, i) => (
            <MenuItem key={i} value={el[fieldValue]}>
              {el[fieldName]}
            </MenuItem>
          ))}
      </TextField>
  );
}

SelectFieldAPIComponent.propTypes = {
  url: PropTypes.string,
  // error: PropTypes.bool,
  // textError: PropTypes.string,
  // sx: PropTypes.object,
  // title: PropTypes.string,
  size: PropTypes.string,
  // all: PropTypes.bool,
  fieldValue: PropTypes.string,
  fieldName: PropTypes.string,
  auth: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string
};
