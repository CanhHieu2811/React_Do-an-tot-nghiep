import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Box, Stack, TextField} from "@mui/material";
// import Autocomplete from '@mui/material/Autocomplete';

import FormComponent from "src/components/form";
import ErrorTextComponent from "src/components/error-text";

export default function FormBicycle({formik, onSubmitForm, textBtn, initialValues}) {
  const { t } = useTranslation();
  // const categorybicycle = [
  //   {label: 'The Shawshank Redemption'}]
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" >
    <FormComponent formik={formik} textBtn={textBtn} handleSubmitForm={onSubmitForm} initialValues={initialValues}>
     <Box mb={2}>
      <ErrorTextComponent
        errors={formik.errors}
        touched={formik.touched}
        field="bikeName"
        
      >
        <TextField
          name="bikeName"
          label={t('field.bikeName')}
          size="small"
          sx={{width: 700, maxWidth: 700, marginBottom: 10}}
          // eslint-disable-next-line no-unneeded-ternary
          error={Object.keys(formik.errors).length && formik.errors.bikeName ? true : false}
          value={formik.values.bikeName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </ErrorTextComponent>
        </Box>
      {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categorybicycle}
      sx={{ width: 1400 }}
      renderInput={(params) => <TextField {...params} label={t('field.catebicycle')} />}
    /> */}
    <Box mb={2}>
      <ErrorTextComponent
        errors={formik.errors}
        touched={formik.touched}
        field="locationId"
        
      >
        <TextField
          name="locationId"
          label={t('field.location')}
          size="small"
          sx={{width: 700, maxWidth: 700, marginBottom: 10}}
          // eslint-disable-next-line no-unneeded-ternary
          error={Object.keys(formik.errors).length && formik.errors.locationId ? true : false}
          value={formik.values.locationId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </ErrorTextComponent>
        </Box>
        <Box mb={2}>
        <ErrorTextComponent
        errors={formik.errors}
        touched={formik.touched}
        field="stationId"
        
      >
        <TextField
          name="stationId"
          label={t('field.stationName')}
          size="small"
          sx={{width: 700, maxWidth: 700, marginBottom: 10}}
          // eslint-disable-next-line no-unneeded-ternary
          error={Object.keys(formik.errors).length && formik.errors.stationId ? true : false}
          value={formik.values.stationId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </ErrorTextComponent>
        </Box>
        <Box mb={2}>
        <ErrorTextComponent
        errors={formik.errors}
        touched={formik.touched}
        field="lockId"
        
      >
        <TextField
          name="lockId"
          label={t('field.lock')}
          size="small"
          sx={{width: 700, maxWidth: 700, marginBottom: 10}}
          // eslint-disable-next-line no-unneeded-ternary
          error={Object.keys(formik.errors).length && formik.errors.lockId ? true : false}
          value={formik.values.lockId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </ErrorTextComponent>
        </Box>
        <Box mb={2}>
        <ErrorTextComponent
        errors={formik.errors}
        touched={formik.touched}
        field="statusId"
        
      >
        <TextField
          name="statusId"
          label={t('field.statusName')}
          size="small"
          sx={{width: 700, maxWidth: 700, marginBottom: 10}}
          // eslint-disable-next-line no-unneeded-ternary
          error={Object.keys(formik.errors).length && formik.errors.statusId ? true : false}
          value={formik.values.statusId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </ErrorTextComponent>
        </Box>
    </FormComponent>
    </Stack>
  )
}


FormBicycle.propTypes = {
  formik: PropTypes.object,
  onSubmitForm: PropTypes.func,
  textBtn: PropTypes.string,
  initialValues: PropTypes.object
};