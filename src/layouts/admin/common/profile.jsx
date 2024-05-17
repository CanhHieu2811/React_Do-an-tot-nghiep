import { useState } from 'react';
import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import UploadImages from 'src/components/upload-image';
import ErrorTextComponent from 'src/components/error-text';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

export default function ProfileAccount({ formik }) {
  const [imageUrl, setImageUrl] = useState('/assets/images/avatars/avatar_1.jpg');
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Item>
          <UploadImages setImageUrl={setImageUrl} imageUrl={imageUrl} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Stack direction="row" spacing={2} flexWrap={2}>
            <TextField
              name="fullName"
              label="FullName"
              size="small"
              // error={formik.touched.fullName && formik.errors.fullName}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Stack direction="column">
              <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="email">
                <TextField
                  name="email"
                  label="Username"
                  size="small"
                  error={formik.touched.email && formik.errors.email}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </ErrorTextComponent>
            </Stack>
            
        </Stack>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="">
              <DatePicker error />
            </DemoItem>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
ProfileAccount.propTypes = {
  formik: PropTypes.object,
};
