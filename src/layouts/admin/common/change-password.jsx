import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
  Paper,
  Stack,
  Button,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import ErrorTextComponent from 'src/components/error-text';
import UploadImages from 'src/components/upload-image';
import { styled } from '@mui/material/styles';
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

export default function ChangePassword({
  formik,
  avatar,
  onSubmitForm,
  // textBtn,
  handleClose,
  initialValuesChangePass,
}) {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const equal = _.isEqual(initialValuesChangePass, formik.values);
    dispatch(setEqualForm(equal));
  }, [dispatch, formik.values, initialValuesChangePass]);
  return (
    // <FormComponent
    //   formik={formik}
    //   textBtn={textBtn}
    //   handleSubmitForm={onSubmitForm}
    //   customClose={handleClose}
    //   initialValues={initialValuesChangePass}
    // >
    <Grid container spacing={2} px={2}>
      <Grid item xs={12}>
        <Typography variant="h5" textAlign="center">
          Thay đổi mật khẩu
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <UploadImages
            width="auto"
            imageUrl={avatar}
            circles
            btnRemove={false}
            btnUpload={false}
          />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="oldPassword">
          <TextField
            name="oldPassword"
            label="Mật khẩu cũ"
            size="small"
            type={showOldPassword ? 'text' : 'password'}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.oldPassword && formik.errors.oldPassword ? true : false}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setOldShowPassword(!showOldPassword)} edge="end">
                    <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </ErrorTextComponent>
      </Grid>

      <Grid item xs={12}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="password">
          <TextField
            name="newPassword"
            label="Mật khẩu mới"
            size="small"
            type={showPassword ? 'text' : 'password'}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.newPassword && formik.errors.newPassword ? true : false}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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

      <Grid item xs={12}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="confirmPassword">
          <TextField
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            size="small"
            type={showConfirmPassword ? 'text' : 'password'}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </ErrorTextComponent>
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
            disabled={
              !!formik.errors.oldPassword ||
              !!formik.errors.confirmPassword ||
              !!formik.errors.newPassword
            }
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
    // </FormComponent>
  );
}
ChangePassword.propTypes = {
  formik: PropTypes.object,
  avatar: PropTypes.string,
  onSubmitForm: PropTypes.func,
  // textBtn: PropTypes.string,
  handleClose: PropTypes.func,
  initialValuesChangePass: PropTypes.object,
};
