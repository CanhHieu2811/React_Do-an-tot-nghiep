import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import { getData, authGetData } from 'src/utils/request';

export default function SelectComponent(props) {
  const { t } = useTranslation();
  const {
    url = '',
    auth = false,
    name = '',
    label = '',
    value = '',
    setValue,
    formik,
    multiple = false,
    size,
  } = props;

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

  const handleChange = (event, newValue) => {
    // default set value
    if (setValue) setValue(newValue);

    // use formik
    if (formik) formik.setFieldValue(name, newValue);
  };
  return (
    <Autocomplete
      multiple={multiple}
      noOptionsText={t('field.noOptions')}
      includeInputInList
      defaultValue={value}
      options={data}
      size={size ?? 'small'}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} name={name} label={label} />}
      onChange={handleChange}
    />
  );
}

SelectComponent.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
  formik: PropTypes.object,
  data: PropTypes.array,
  multiple: PropTypes.bool,
  size: PropTypes.string,
  url: PropTypes.string,
  auth: PropTypes.bool,
};
