import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import ErrorTextComponent from 'src/components/error-text';

export default function ChangePassword({ formik }) {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();
  return (
    <Stack direction="column" spacing={2}>
      <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="oldPassword">
        <TextField
          name="oldPassword"
          label={t('field.oldPassword')}
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
      <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="password">
        <TextField
          name="newPassword"
          label={t('field.newPassword')}
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
      <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="confirmPassword">
        <TextField
          name="confirmPassword"
          label={t('field.confirmPassword')}
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
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ErrorTextComponent>
    </Stack>
  );
}
ChangePassword.propTypes = {
  formik: PropTypes.object,
};
