// import { useDispatch } from 'react-redux';
// import { Formik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
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

export default function LoginTemplates({ formik, onSubmitForm, handForgotPass }) {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  
  const renderForm = (
    <>
      <Stack spacing={2}>
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
      <Typography variant="body2" sx={{ mt: 1, mb: 2 }} >
        <Link variant="subtitle2" sx={{ ml: 0.5 }} color="success.main" onClick={handForgotPass}>
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
        color="success"
        onClick={onSubmitForm}
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
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 3,
            pt: 1,
            pb: 1,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Divider sx={{ my: 3 }}>
            <Typography variant="h4">{t('login.title')}</Typography>
          </Divider>

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
          <Box sx={{ textAlign: 'right', pt: 1 }}>
            <LanguageComponent />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

LoginTemplates.propTypes = {
  formik: PropTypes.object,
  onSubmitForm: PropTypes.func,
  handForgotPass: PropTypes.func,
};
