// import { Formik } from 'formik';
  import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { PATH } from 'src/routes/constant';
import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import LanguageComponent from 'src/components/language';
import ErrorTextComponent from 'src/components/error-text';

// ----------------------------------------------------------------------

export default function RegisterTemplates({ formik, onSubmitForm }) {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const renderForm = (
    <>
      <Stack spacing={2}>
        {/* <Formik initialValues={initialValues} validationSchema={validationSchema}>
          {({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
            <> */}
        <Stack direction="row" spacing={2}>
          <Stack>
            <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="firstName">
              <TextField
                name="firstName"
                label={t('field.firstName')}
                size="small"
                // eslint-disable-next-line no-unneeded-ternary
                error={formik.touched.firstName && formik.errors.firstName ? true : false}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </ErrorTextComponent>
          </Stack>

          <TextField
            name="lastName"
            label={t('field.lastName')}
            size="small"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Stack>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="userName">
          <TextField
            name="userName"
            label={t('field.userName')}
            size="small"
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.userName && formik.errors.userName ? true : false}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>

        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="email">
          <TextField
            name="email"
            label={t('field.email')}
            size="small"
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.email && formik.errors.email ? true : false}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="phoneNumber">
          <TextField
            name="phoneNumber"
            label={t('field.phoneNumber')}
            size="small"
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="address">
          <TextField
            name="address"
            label={t('field.address')}
            size="small"
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.address && formik.errors.address ? true : false}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
        <Stack direction="row" spacing={2}>
          <Stack>
            <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="password">
              <TextField
                name="password"
                label={t('field.password')}
                size="small"
                type={showPassword ? 'text' : 'password'}
                // eslint-disable-next-line no-unneeded-ternary
                error={formik.touched.password && formik.errors.password ? true : false}
                value={formik.values.password}
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
          </Stack>
          <Stack>
            <ErrorTextComponent
              errors={formik.errors}
              touched={formik.touched}
              field="confirmPassword"
            >
              <TextField
                name="confirmPassword"
                label={t('field.confirmPassword')}
                size="small"
                type={showConfirmPassword ? 'text' : 'password'}
                // eslint-disable-next-line no-unneeded-ternary
                error={
                  !!(formik.touched.confirmPassword && formik.errors.confirmPassword)
                }
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
          </Stack>
        </Stack>
        {/* </>
          )}
        </Formik> */}
      </Stack>
      <Typography variant="body2" sx={{ mt: 2, mb: 3, textAlign: 'right' }}>
        {t('register.have_account')}
        <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => router.push(PATH.LOGIN)}>
          {t('register.login')}
        </Link>
      </Typography>

      <LoadingButton
        fullWidth
        // size="large"
        type="submit"
        variant="contained"
        color="success"
        onClick={onSubmitForm}
      >
        {t('register.text')}
      </LoadingButton>
    </>
  );

  return (
    <Box
  sx={{
    ...bgGradient({
      color: alpha(theme.palette.background.default, 0.9),
      imgUrl: '/assets/background/overlay_4.jpg',
    }),
    height: 1,
  }}
>
  <Logo
    sx={{
      position: 'fixed',
      top: { xs: 16, md: 24 },
      left: { xs: 16, md: 24 },
    }}
  />
  <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}> {/* Center the card horizontally */}
    <Card sx={{ p: 3, width: 'fit-content', maxWidth: 480 }}> {/* Adjust padding and max-width */}
      <Divider sx={{ my: 3 }}>
        <Typography variant="h4">{t('register.title')}</Typography>
      </Divider>
      <Box sx={{ alignItems: 'center' }}> {/* Vertically center form content */}
        {renderForm}
      </Box>
      <Box sx={{ textAlign: 'right', pt: 1 }}>
        <LanguageComponent />
      </Box>
    </Card>
  </Stack>
</Box>

  );
}

RegisterTemplates.propTypes = {
  formik: PropTypes.object,
  onSubmitForm: PropTypes.func,
};
