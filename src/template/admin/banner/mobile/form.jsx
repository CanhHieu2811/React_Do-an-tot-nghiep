import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { TextField, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import UploadImages from 'src/components/upload-image';
// import DatepickerComponent from 'src/components/datepicker';

import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';

export default function FormThaoTacDuLieu({
  formik,
  onSubmitForm,
  textBtn,
  initialValues,
  isCreate,
  setFile,
  imageUrl,
  setImageUrl,
}) {
  //   const { t } = useTranslation();
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.primary.main,
  }));

  return (
    <FormComponent
      formik={formik}
      textBtn={textBtn}
      handleSubmitForm={onSubmitForm}
      initialValues={initialValues}
    >
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Item>
            <UploadImages
              width="auto"
              setFile={setFile}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              circles={false}
              btnRemove={false}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="tilte">
            <TextField
              name="tilte"
              label="Tiêu đề"
              size="small"
              multiline
              rows={3}
              error={!!(formik.touched.tilte && formik.errors.tilte)}
              value={formik.values.tilte}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={6}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="type">
            <TextField
              name="type"
              label="Phân loại"
              size="small"
              multiline
              rows={3}
              error={!!(formik.touched.type && formik.errors.type)}
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        
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
  setFile: PropTypes.func,
  setImageUrl: PropTypes.func,
  imageUrl: PropTypes.string,
};
