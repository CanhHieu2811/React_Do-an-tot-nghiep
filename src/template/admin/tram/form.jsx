import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

import { authGetData } from 'src/utils/request';
import { STATUS_200 } from 'src/utils/constant';

import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';
import SelectComponent from 'src/components/select';

export default function FormThaoTacDuLieu({
  formik,
  onSubmitForm,
  textBtn,
  initialValues,
  isCreate,
}) {
  const { t } = useTranslation();
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    authGetData({
      url: 'https://localhost:7103/master-data/api/status/list',
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          setStatusList(res.data);
        }
      },
    });
  };

  return (
    <FormComponent
      formik={formik}
      textBtn={textBtn}
      handleSubmitForm={onSubmitForm}
      initialValues={initialValues}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="stationName">
            <TextField
              name="stationName"
              label={t('field.stationName')}
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.stationName && formik.errors.stationName ? true : false}
              value={formik.values.stationName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="numOfSeats">
            <TextField
              name="numOfSeats"
              label={t('field.numOfSeats')}
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.numOfSeats && formik.errors.numOfSeats ? true : false}
              value={formik.values.numOfSeats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="locationName">
            <TextField
              name="locationName"
              label={t('field.locationName')}
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.locationName && formik.errors.locationName ? true : false}
              value={formik.values.locationName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="longitude">
            <TextField
              name="longitude"
              label={t('field.longitude')}
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.longitude && formik.errors.longitude ? true : false}
              value={formik.values.longitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="latitude">
            <TextField
              name="latitude"
              label="latitude"
              size="small"
              error={!!(formik.touched.latitude && formik.errors.latitude)}
              value={formik.values.latitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="statusName">
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH => so sánh với cái e đang làm để điền đúng thông tin
              cái formik.values.statusId là 1 object chứ ko phải là 1 id number, string MÀ LÀ 1 OBJECT
              khi gửi dữ liệu lên thì phải chỉnh lại request đưa lên theo BE yêu cầu ví dụ
              formik.values.statusId đang là 1 object có {id:..., statusName:..., ....}
              thì khi BE yêu cầu gửi lên id thì ngoài submit form thì statusId: formik.values.statusId.id 

            */}
            <SelectComponent
              formName="statusId"
              label={t('field.statusName')}
              defaultOption={formik.values.stationName}
              data={statusList}
              onChange={(val) => formik.setFieldValue('statusId', val)}
              error={!!(formik.touched.statusName && formik.errors.statusName)}
            />
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH */}
            <FormControl fullWidth size="small">
              <InputLabel>{t('field.statusName')}</InputLabel>
              <Select
                name="statusId"
                value={formik.values.statusId} // Sử dụng formik.values.statusId
                onChange={(e) => {
                  formik.setFieldValue('statusId', e.target.value); // Cập nhật giá trị trong formik
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.statusName && Boolean(formik.errors.statusName)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {statusList.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.statusName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ErrorTextComponent>
        </Grid>
      </Grid>
    </FormComponent>
  );
}

FormThaoTacDuLieu.propTypes = {
  formik: PropTypes.object,
  onSubmitForm: PropTypes.func,
  textBtn: PropTypes.string,
  initialValues: PropTypes.object,
  isCreate: PropTypes.bool,
};
