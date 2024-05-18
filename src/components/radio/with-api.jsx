import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { getData, authGetData } from 'src/utils/request';

export default function RadioAPIComponent({ url = '',
name,
fieldValue = '',
fieldName = '',
defaultValue = "",
auth,
// size = 'small',
onChange,
label }) {
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
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        value={value}
        onChange={handleChange}
      >
        {data.map((el, i) => (
          <FormControlLabel key={i} value={el[fieldValue]} control={<Radio />} label={el[fieldName]} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioAPIComponent.propTypes = {
  url: PropTypes.string,
  // error: PropTypes.bool,
  // textError: PropTypes.string,
  // sx: PropTypes.object,
  // title: PropTypes.string,
  // size: PropTypes.string,
  // all: PropTypes.bool,
  fieldValue: PropTypes.string,
  fieldName: PropTypes.string,
  auth: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string
};
