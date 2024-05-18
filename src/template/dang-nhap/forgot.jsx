import PropTypes from 'prop-types';
// import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import ErrorTextComponent from 'src/components/error-text';

// ----------------------------------------------------------------------

export default function ForgotTemplates({ formik }) {
  const { t } = useTranslation();

  return (
    <Stack spacing={2}>
      <Typography variant="body1" color="primary">
        Mật khẩu sẽ được gửi về email của bạn khi thành công!
      </Typography>
      <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="userName">
        <TextField
          name="userName"
          label={t('field.userName')}
          error={!!(formik.touched.userName && formik.errors.userName)}
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </ErrorTextComponent>

      <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="email">
        <TextField
          name="email"
          label={t('field.email')}
          error={!!(formik.touched.email && formik.errors.email)}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </ErrorTextComponent>
    </Stack>
  );
}

ForgotTemplates.propTypes = {
  formik: PropTypes.object,
};
