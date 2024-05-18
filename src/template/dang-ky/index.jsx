// import { Formik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
// import LanguageComponent from 'src/components/language';
import ErrorTextComponent from 'src/components/error-text';

// ----------------------------------------------------------------------

export default function DangKyTemplates({ formik, handleDangKy }) {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [hienThiMK, setHienThiMK] = useState(false);
  const [hienThiXNMK, setHienThiXNMK] = useState(false);

  const pressEnterKey = (e) => {
    if (e.keyCode === 13) {
      handleDangKy();
    }
  };

  const renderForm = (
    <>
      <Stack spacing={2}>
        {/* <Formik initialValues={initialValues} validationSchema={validationSchema}>
          {({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
            <> */}
        <Stack direction="row" spacing={2}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="firstName">
            <TextField
              name="firstName"
              label={t('field.firstName')}
              variant="standard"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.firstName && formik.errors.firstName ? true : false}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>

          <TextField
            name="lastName"
            label={t('field.lastName')}
            variant="standard"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Stack>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="userName">
          <TextField
            name="userName"
            label={t('field.userName')}
            variant="standard"
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
            variant="standard"
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
            variant="standard"
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>

        <Stack direction="row" spacing={2}>
          <Stack>
            <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="password">
              <TextField
                sx={{ minWidth: 'auto' }}
                name="password"
                label={t('field.password')}
                variant="standard"
                type={hienThiMK ? 'text' : 'password'}
                // eslint-disable-next-line no-unneeded-ternary
                error={formik.touched.password && formik.errors.password ? true : false}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setHienThiMK(!hienThiMK)} edge="end">
                        <Iconify icon={hienThiMK ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
                sx={{ minWidth: 'auto' }}
                name="confirmPassword"
                label={t('field.confirmPassword')}
                variant="standard"
                type={hienThiXNMK ? 'text' : 'password'}
                // eslint-disable-next-line no-unneeded-ternary
                error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setHienThiXNMK(!hienThiXNMK)} edge="end">
                        <Iconify icon={hienThiXNMK ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onKeyDown={pressEnterKey}
              />
            </ErrorTextComponent>
          </Stack>
        </Stack>
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
        color="primary"
        onClick={handleDangKy}
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
          zIndex: 9999999,
        }}
      />
      <Grid container spacing={0} sx={{ height: '100%', backgroundColor: theme.palette.grey[200] }}>
        <Grid item xs={12} sm={4}>
          <Box
            className="section-banner"
            style={{
              backgroundImage: 'url(/assets/background/imagebackground3.jpg)',
              backgroundPosition: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              height: '100%',
              width: '100%',
              position: 'relative',
              zIndex: 1,
              borderRadius: 12,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
            <Card
              sx={{
                p: 3,
                pt: 1,
                pb: 1,
                width: 1,
                maxWidth: 420,
                height: '100%',
                backgroundColor: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Divider sx={{ my: 3 }}>
                <Typography variant="h4">{t('register.title')}</Typography>
              </Divider>
              {renderForm}
              <Box sx={{ textAlign: 'right', pt: 1 }}>{/* <LanguageComponent /> */}</Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

DangKyTemplates.propTypes = {
  formik: PropTypes.object,
  handleDangKy: PropTypes.func,
};
