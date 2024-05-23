import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { TextField, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import UploadImages from 'src/components/upload-image';
import DatepickerComponent from 'src/components/datepicker';

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
              rows={5}
              error={!!(formik.touched.tilte && formik.errors.tilte)}
              value={formik.values.tilte}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={6}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="description">
            <TextField
              name="description"
              label="Nội dung"
              size="small"
              multiline
              rows={5}
              error={!!(formik.touched.description && formik.errors.description)}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="dateStart">
            <DatepickerComponent
              value={formik.values.dateStart}
              name="dateStart"
              setValue={(value) => formik.setFieldValue('dateStart', value)}
              format="DD/MM/YYYY"
              label="Ngày bắt đầu"
              marginTop={0}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="dateEnd">
            <DatepickerComponent
              value={formik.values.dateEnd}
              name="dateEnd"
              setValue={(value) => formik.setFieldValue('dateEnd', value)}
              format="DD/MM/YYYY"
              label="Ngày kết thúc"
              marginTop={0}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="location">
            <TextField
              name="location"
              label="Địa điểm tổ chức"
              size="small"
              error={!!(formik.touched.location && formik.errors.location)}
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="organizer">
            <TextField
              name="organizer"
              label="Người đăng"
              size="small"
              error={!!(formik.touched.organizer && formik.errors.organizer)}
              value={formik.values.organizer}
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
