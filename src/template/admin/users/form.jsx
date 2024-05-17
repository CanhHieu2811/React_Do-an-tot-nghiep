import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import { Box, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import FormComponent from "src/components/form";
import ErrorTextComponent from "src/components/error-text";

export default function FormUsers({formik, onSubmitForm, textBtn, initialValues}) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Stack spacing={2} alignItems="left" justifyContent="left" marginLeft={10}>
    <FormComponent formik={formik} textBtn={textBtn} handleSubmitForm={onSubmitForm} initialValues={initialValues}>
      <Box mb={2}>
       <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="fullName">
              <TextField
                name="fullName"
                label={t('field.fullName')}
                size="small"
                sx={{width: 700, maxWidth: 700, marginBottom: 10}}
                // eslint-disable-next-line no-unneeded-ternary
                error={formik.touched.fullName && formik.errors.fullName ? true : false}
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </ErrorTextComponent>
            </Box>
            <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="dateOfBirth">
          <TextField
            name="dateOfBirth"
            label={t('field.dateOfBirth')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? true : false}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
          <Box mb={2}>
            <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="userName">
          <TextField
            name="userName"
            label={t('field.userName')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.userName && formik.errors.userName ? true : false}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
        </Box>
      <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="phoneNumber">
          <TextField
            name="phoneNumber"
            label={t('field.phoneNumber')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
      <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="email">
          <TextField
            name="email"
            label={t('field.email')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.email && formik.errors.email ? true : false}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
      <Box mb={2}>
      <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="address">
          <TextField
            name="address"
            label={t('field.address')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.address && formik.errors.address ? true : false}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
        </Box>
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
          </Stack>
          <Stack>
            <ErrorTextComponent
              errors={formik.errors}
              touched={formik.touched}
              field="passwordConfirm"
            >
              <TextField
                name="passwordConfirm"
                label={t('field.passwordConfirm')}
                size="small"
                type={showConfirmPassword ? 'text' : 'password'}
                // eslint-disable-next-line no-unneeded-ternary
                error={
                  !!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)
                }
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: 340 }}
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
    </FormComponent>
    </Stack>
  )
}


FormUsers.propTypes = {
  formik: PropTypes.object,
  onSubmitForm: PropTypes.func,
  textBtn: PropTypes.string,
  initialValues: PropTypes.object
};