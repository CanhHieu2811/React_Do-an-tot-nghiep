import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

import UploadImages from 'src/components/upload-image';
import ErrorTextComponent from 'src/components/error-text';
import DatepickerComponent from 'src/components/datepicker';
import { useEffect } from 'react';
// import FormComponent from 'src/components/form';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { setEqualForm } from 'src/redux/common';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

export default function ProfileAccount({
  formik,
  setFile,
  imageUrl,
  setImageUrl,
  onSubmitForm,
  // textBtn,
  handleClose,
  initialValuesProfile,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const equal = _.isEqual(initialValuesProfile, formik.values);
    dispatch(setEqualForm(equal));
  }, [dispatch, formik.values, initialValuesProfile]);

  return (
    <Grid container spacing={2} px={2} height="100%">
      <Grid item xs={12}>
        <Typography variant="h5" textAlign="center">
          Thông tin tài khoản
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <UploadImages
            width="auto"
            setFile={setFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            circles
            btnRemove={false}
          />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="hoTen">
          <TextField
            name="hoTen"
            label="Họ và tên"
            variant="outlined"
            size="small"
            sx={{ minWidth: 'auto' }}
            error={!!(formik.touched.hoTen && formik.errors.hoTen)}
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Grid>
      <Grid item xs={12}>
        {/* <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="email"> */}
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          sx={{ minWidth: 'auto' }}
          // error={!!(formik.touched.email && formik.errors.email)}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {/* </ErrorTextComponent> */}
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={6}>
          {/* <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="soDienThoai"> */}
          <TextField
            name="soDienThoai"
            label="Số điện thoại"
            variant="outlined"
            size="small"
            sx={{ minWidth: 'auto' }}
            // error={!!(formik.touched.soDienThoai && formik.errors.soDienThoai)}
            value={formik.values.soDienThoai}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* </ErrorTextComponent> */}
        </Grid>

        <Grid item xs={6}>
          <DatepickerComponent
            name="ngaySinh"
            size="small"
            label="Ngày sinh"
            formik={formik}
            value={formik.values.ngaySinh}
            valueNull={!formik.values.ngaySinh}
            marginTop="0px"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="diaChi"
          label="Địa chỉ"
          variant="outlined"
          multiline
          rows={2}
          sx={{ minWidth: 'auto' }}
          // error={!!(formik.touched.soDienThoai && formik.errors.soDienThoai)}
          value={formik.values.diaChi}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack
          sx={{ textAlign: 'center' }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            onClick={onSubmitForm}
            autoFocus
            color="primary"
            variant="contained"
            sx={{ width: '100px', height: '40px', mr: 2 }}
            disabled={!!formik.errors.hoTen || !!formik.errors.email}
          >
            Cập nhật
          </Button>
          <Button
            onClick={handleClose}
            color="inherit"
            sx={{ width: '100px', height: '40px', background: '#DFE3E8' }}
          >
            Đóng lại
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
ProfileAccount.propTypes = {
  formik: PropTypes.object,
  setFile: PropTypes.func,
  setImageUrl: PropTypes.func,
  imageUrl: PropTypes.string,
  onSubmitForm: PropTypes.func,
  // textBtn: PropTypes.string,
  handleClose: PropTypes.func,
  initialValuesProfile: PropTypes.object,
};
