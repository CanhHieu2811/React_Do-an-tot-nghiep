// import { useDispatch } from 'react-redux';
// import { Formik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
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

export default function DangNhapTemplates({ formik, handleDangNhap, handHienThiQuenMK }) {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [hienThiMK, setHienThiMK] = useState(false);

  const pressEnterKey = (e) => {
    if (e.keyCode === 13) {
      handleDangNhap();
    }
  };
  const renderForm = (
    <>
      <Stack spacing={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="userName">
          <TextField
            name="userName"
            label={t('field.userName')}
            // size="small"
            variant="standard"
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.userName && formik.errors.userName ? true : false}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>

        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="password">
          <TextField
            name="password"
            label={t('field.password')}
            // size="small"
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
            onKeyDown={pressEnterKey}
          />
        </ErrorTextComponent>
      </Stack>
      <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
        <Link variant="subtitle2" sx={{ ml: 0.5 }} color="primary.main" onClick={handHienThiQuenMK}>
          {t('login.forgot')}
        </Link>
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, mb: 3, textAlign: 'right' }}>
        {t('login.dont_account')}
        <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => router.push(PATH.REGISTER)}>
          {t('login.register')}
        </Link>
      </Typography>

      <LoadingButton
        fullWidth
        // size="large"
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleDangNhap}
      >
        {t('login.text')}
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
          zIndex: 9999,
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
                <Typography variant="h4">{t('login.title')}</Typography>
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

DangNhapTemplates.propTypes = {
  formik: PropTypes.object,
  handleDangNhap: PropTypes.func,
  handHienThiQuenMK: PropTypes.func,
};
