import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { TextField, Grid, IconButton, InputAdornment } from '@mui/material';

import Iconify from 'src/components/iconify';
import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';
import DatepickerComponent from 'src/components/datepicker';

export default function FormThaoTacDuLieu({ formik, onSubmitForm, textBtn, initialValues, isCreate }) {
  // const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <FormComponent
      formik={formik}
      textBtn={textBtn}
      handleSubmitForm={onSubmitForm}
      initialValues={initialValues}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="fullName">
            <TextField
              name="fullName"
              label="Họ và Tên"
              size="small"
              error={!!(formik.touched.fullName && formik.errors.fullName)}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="dateOfBirth">
            <TextField
              name="userName"
              label="Tên đăng nhập"
              size="small"
              error={!!(formik.touched.userName && formik.errors.userName)}
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="email">
            <TextField
              name="email"
              label="Email"
              size="small"
              error={!!(formik.touched.email && formik.errors.email)}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="dateOfBirth">
            <DatepickerComponent
              value={formik.values.dateOfBirth}
              name="dateOfBirth"
              setValue={(value) => formik.setFieldValue('dateOfBirth', value)}
              format="DD/MM/YYYY"
              label="Ngày sinh"
              marginTop={0}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="phoneNumber">
            <TextField
              name="phoneNumber"
              label="Số điện thoại"
              size="small"
              error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
            <Grid item xs={12} md={3}>
              <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="password">
                <TextField
                  name="password"
                  label="Mật khẩu"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  error={!!(formik.touched.password && formik.errors.password)}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: 340 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ErrorTextComponent>
            </Grid>
            <Grid item xs={12} md={3}>
              <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="passwordConfirm">
                <TextField
                  name="passwordConfirm"
                  label="Xác nhận mật khẩu"
                  size="small"
                  type={showConfirmPassword ? 'text' : 'password'}
                  error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: 340 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ErrorTextComponent>
            </Grid>
        
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="email">
            <TextField
              name="address"
              label="Địa chỉ"
              size="small"
              multiline
              rows={3}
              error={!!(formik.touched.address && formik.errors.address)}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
  isCreate: PropTypes.bool
};
