import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import { Box, TextField } from "@mui/material";

import FormComponent from "src/components/form";
import ErrorTextComponent from "src/components/error-text";

export default function FormStations({formik, onSubmitForm, textBtn, initialValues}) {
  const { t } = useTranslation();


  // useEffect(() => {
  //   // Function to fetch statuses from API
  //   const fetchStatuses = async () => {
  //     try {
  //       const response = await axios.get('https://localhost:7103/master-data/api/status/list'); // Adjust the API endpoint as needed
  //       setStatuses(response.data);
  //     } catch (error) {
  //       console.error('Error fetching statuses:', error);
  //     }
  //   };

  //   fetchStatuses();
  // }, []);

  return (
    <Stack spacing={2} alignItems="left" justifyContent="left" marginLeft={10}>
    <FormComponent formik={formik} textBtn={textBtn} handleSubmitForm={onSubmitForm} initialValues={initialValues}>
      <Box mb={2}>
       <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="stationName">
              <TextField
                name="stationName"
                label={t('field.stationName')}
                size="small"
                sx={{width: 700, maxWidth: 700, marginBottom: 10}}
                // eslint-disable-next-line no-unneeded-ternary
                error={formik.touched.stationName && formik.errors.stationName ? true : false}
                value={formik.values.stationName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </ErrorTextComponent>
            </Box>
            <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="quantityAvaiable">
          <TextField
            name="quantityAvaiable"
            label={t('field.quantityAvaiable')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.quantityAvaiable && formik.errors.quantityAvaiable ? true : false}
            value={formik.values.quantityAvaiable}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
          <Box mb={2}>
            <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="numOfSeats">
          <TextField
            name="numOfSeats"
            label={t('field.numOfSeats')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.numOfSeats && formik.errors.numOfSeats ? true : false}
            value={formik.values.numOfSeats}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
        </Box>
      <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="locationId">
          <TextField
            name="locationId"
            label={t('field.locationId')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.locationId && formik.errors.locationId ? true : false}
            value={formik.values.locationId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
      <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="locationName">
          <TextField
            name="locationName"
            label={t('field.locationName')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.locationName && formik.errors.locationName ? true : false}
            value={formik.values.locationName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
      <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="statusId">
          <TextField
            name="statusId"
            label={t('field.statusId')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.statusId && formik.errors.statusId ? true : false}
            value={formik.values.statusId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
      {/* <Box mb={2}>
      <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="statusId">
        <FormControl fullWidth size="small" sx={{ width: 700, maxWidth: 700, marginBottom: 10 }}>
          <InputLabel id="status-label">{t('field.status')}</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="statusId"
            value={formik.values.statusId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.statusId && Boolean(formik.errors.statusId)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ErrorTextComponent>
    </Box> */}
      <Box mb={2}>
        <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="statusName">
          <TextField
            name="statusName"
            label={t('field.statusName')}
            size="small"
            sx={{width: 700, maxWidth: 700, marginBottom: 10}}
            // eslint-disable-next-line no-unneeded-ternary
            error={formik.touched.statusName && formik.errors.statusName ? true : false}
            value={formik.values.statusName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </ErrorTextComponent>
      </Box>
    </FormComponent>
    </Stack>
  )
}


FormStations.propTypes = {
  formik: PropTypes.object,
  onSubmitForm: PropTypes.func,
  textBtn: PropTypes.string,
  initialValues: PropTypes.object,
};