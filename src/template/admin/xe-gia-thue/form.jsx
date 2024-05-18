import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextField, Grid} from '@mui/material';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import UploadImages from 'src/components/upload-image';
import DatepickerComponent from 'src/components/datepicker';

import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';

export default function FormThaoTacDuLieu({ formik, onSubmitForm, textBtn, initialValues, isCreate }) {
  const { t } = useTranslation();
  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.primary.main,
  // }));
  

  return (
    <FormComponent
      formik={formik}
      textBtn={textBtn}
      handleSubmitForm={onSubmitForm}
      initialValues={initialValues}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="phoneNumber">
            <TextField
              name="phoneNumber"
              label={t('field.phoneNumber')}
              size="small"
              error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
      <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="daythue">
            <DatepickerComponent
              value={formik.values.daythue}
              name="daythue"
              setValue={(value) => formik.setFieldValue('daythue', value)}
              format="DD/MM/YYYY"
              label="Thời gian đặt"
              marginTop={0}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="dayketthuc">
            <DatepickerComponent
              value={formik.values.dayketthuc}
              name="dayketthuc"
              setValue={(value) => formik.setFieldValue('dayketthuc', value)}
              format="DD/MM/YYYY"
              label="Thời gian kết thúc"
              marginTop={0}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="dayhethan">
            <DatepickerComponent
              value={formik.values.dayhethan}
              name="dayhethan"
              setValue={(value) => formik.setFieldValue('dayhethan', value)}
              format="DD/MM/YYYY"
              label="Thời gian hết hạn"
              marginTop={0}
            />
          </ErrorTextComponent>
        </Grid>
        {/* <Grid item xs={12}>
        <Item>
                <UploadImages
            width="auto"
            setFile={setFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            circles
            btnRemove={false}
            />
        </Item>
      </Grid> */}
      </Grid>
      
    </FormComponent>
  );
}

FormThaoTacDuLieu.propTypes = {
  formik: PropTypes.object,
  onSubmitForm: PropTypes.func,
  textBtn: PropTypes.string,
  initialValues: PropTypes.object,
  isCreate: PropTypes.bool,
  // setFile: PropTypes.func,
  // setImageUrl: PropTypes.func,
  // imageUrl: PropTypes.string,
};
