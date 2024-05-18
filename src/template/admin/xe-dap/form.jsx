import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, MenuItem } from '@mui/material';

import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';
import SelectComponent from 'src/components/select';

export default function FormThaoTacDuLieu({ formik, onSubmitForm, textBtn, initialValues, isCreate, statusList, stationList }) {
  const { t } = useTranslation();

  return (
    <FormComponent
      formik={formik}
      textBtn={textBtn}
      handleSubmitForm={onSubmitForm}
      initialValues={initialValues}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="bikeName">
            <TextField
              name="bikeName"
              label={t('field.bikeName')}
              size="small"
              error={!!(formik.touched.bikeName && formik.errors.bikeName)}
              value={formik.values.bikeName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="pathQr">
            <TextField
              name="pathQr"
              label="Mã Qr"
              size="small"
              error={!!(formik.touched.pathQr && formik.errors.pathQr)}
              value={formik.values.pathQr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="power">
            <TextField
              name="power"
              label="Số lượng pin"
              size="small"
              error={!!(formik.touched.power && formik.errors.power)}
              value={formik.values.power}
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
              onChange={(e) => formik.setFieldValue('statusId', e.target.value)}
              error={(formik.touched.statusName && formik.errors.statusName)}
            >
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH */}
            {/* <FormControl fullWidth size="small">
              <InputLabel>{t('field.statusName')}</InputLabel>
              <Select
                name="statusId"
                value={formik.values.statusId} // Sử dụng formik.values.statusId
                onChange={(e) => {
                  formik.setFieldValue('statusId', e.target.value); // Cập nhật giá trị trong formik
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.statusName && Boolean(formik.errors.statusName)}
              > */}
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {statusList.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.statusName}
                  </MenuItem>
                ))}
              {/* </Select>
            </FormControl> */}
            </SelectComponent>
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="stationName">
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH => so sánh với cái e đang làm để điền đúng thông tin
              cái formik.values.statusId là 1 object chứ ko phải là 1 id number, string MÀ LÀ 1 OBJECT
              khi gửi dữ liệu lên thì phải chỉnh lại request đưa lên theo BE yêu cầu ví dụ
              formik.values.statusId đang là 1 object có {id:..., statusName:..., ....}
              thì khi BE yêu cầu gửi lên id thì ngoài submit form thì statusId: formik.values.statusId.id 

            */}
            <SelectComponent
              formName="stationId"
              label={t('field.stationId')}
              defaultOption={formik.values.stationName}
              data={stationList}
              onChange={(e) => formik.setFieldValue('stationId', e.target.value)}
              error={(formik.touched.stationId && formik.errors.stationId)}
            >
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH */}
            {/* <FormControl fullWidth size="small">
              <InputLabel>{t('field.statusName')}</InputLabel>
              <Select
                name="statusId"
                value={formik.values.statusId} // Sử dụng formik.values.statusId
                onChange={(e) => {
                  formik.setFieldValue('statusId', e.target.value); // Cập nhật giá trị trong formik
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.statusName && Boolean(formik.errors.statusName)}
              > */}
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {stationList.map((station) => (
                  <MenuItem key={station} value={station}>
                    {station.stationName}
                  </MenuItem>
                ))}
              {/* </Select>
            </FormControl> */}
            </SelectComponent>
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
  statusList: PropTypes.array,
  stationList: PropTypes.array
};
