import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { TextField, Grid} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import UploadImages from 'src/components/upload-image';
// import DatepickerComponent from 'src/components/datepicker';

import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';

export default function FormThaoTacDuLieu({ formik, onSubmitForm, textBtn, initialValues, isCreate, setFile, imageUrl, setImageUrl }) {
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
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="title">
            <TextField
              name="title"
              label="Tiêu đề"
              size="small"
              style = {{width: 300}}
              multiline
              rows={2}
              error={!!(formik.touched.title && formik.errors.title)}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={4}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="content">
            <TextField
              name="content"
              label="Nội dung"
              size="small"
              style = {{width: 500}}
              multiline
              rows={5}
              error={!!(formik.touched.content && formik.errors.content)}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={4}>
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
