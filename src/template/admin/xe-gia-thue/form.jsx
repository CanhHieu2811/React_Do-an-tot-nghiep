import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid} from '@mui/material';
import SelectComponent from 'src/components/select';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import UploadImages from 'src/components/upload-image';
import DatepickerComponent from 'src/components/datepicker';

import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';

export default function FormThaoTacDuLieu({ formik, onSubmitForm, textBtn, initialValues, isCreate, bikeList, categoryTicketList,statusList, userList }) {
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
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="bookingDate">
            <DatepickerComponent
              value={formik.values.bookingDate}
              name="bookingDate"
              setValue={(value) => formik.setFieldValue('bookingDate', value)}
              format="DD/MM/YYYY HH/mm"
              label="Thời gian đặt"
              marginTop={0}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="userId">
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH => so sánh với cái e đang làm để điền đúng thông tin
              cái formik.values.statusId là 1 object chứ ko phải là 1 id number, string MÀ LÀ 1 OBJECT
              khi gửi dữ liệu lên thì phải chỉnh lại request đưa lên theo BE yêu cầu ví dụ
              formik.values.statusId đang là 1 object có {id:..., statusName:..., ....}
              thì khi BE yêu cầu gửi lên id thì ngoài submit form thì statusId: formik.values.statusId.id 
            */}
            <SelectComponent
              formName="userId"
              optionName="phoneNumber"
              label='Số điện thoại'
              defaultOption={formik.values.userId}
              data={userList}
              onChange={(val) => formik.setFieldValue('userId', val)}
              error={(formik.touched.userId && formik.errors.userId)}
            />
            </ErrorTextComponent>
      </Grid>
      <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="categoryTicketId">
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH => so sánh với cái e đang làm để điền đúng thông tin
              cái formik.values.statusId là 1 object chứ ko phải là 1 id number, string MÀ LÀ 1 OBJECT
              khi gửi dữ liệu lên thì phải chỉnh lại request đưa lên theo BE yêu cầu ví dụ
              formik.values.statusId đang là 1 object có {id:..., statusName:..., ....}
              thì khi BE yêu cầu gửi lên id thì ngoài submit form thì statusId: formik.values.statusId.id 
            */}
            <SelectComponent
              formName="categoryTicketId"
              optionName="categoryTicketName"
              label='Loại vé'
              defaultOption={formik.values.categoryTicketId}
              data={categoryTicketList}
              onChange={(val) => formik.setFieldValue('categoryTicketId', val)}
              error={(formik.touched.categoryTicketId && formik.errors.categoryTicketId)}
            />
            </ErrorTextComponent>
      </Grid>
      <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="bikeId">
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH => so sánh với cái e đang làm để điền đúng thông tin
              cái formik.values.statusId là 1 object chứ ko phải là 1 id number, string MÀ LÀ 1 OBJECT
              khi gửi dữ liệu lên thì phải chỉnh lại request đưa lên theo BE yêu cầu ví dụ
              formik.values.statusId đang là 1 object có {id:..., statusName:..., ....}
              thì khi BE yêu cầu gửi lên id thì ngoài submit form thì statusId: formik.values.statusId.id 
            */}
            <SelectComponent
              formName="bikeId"
              optionName="bikeName"
              label={t('field.bikeId')}
              defaultOption={formik.values.stationName}
              data={bikeList}
              onChange={(val) => formik.setFieldValue('bikeId', val)}
              error={(formik.touched.bikeId && formik.errors.bikeId)}
            />
            </ErrorTextComponent>
      </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="statusId">
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH => so sánh với cái e đang làm để điền đúng thông tin
              cái formik.values.statusId là 1 object chứ ko phải là 1 id number, string MÀ LÀ 1 OBJECT
              khi gửi dữ liệu lên thì phải chỉnh lại request đưa lên theo BE yêu cầu ví dụ
              formik.values.statusId đang là 1 object có {id:..., statusName:..., ....}
              thì khi BE yêu cầu gửi lên id thì ngoài submit form thì statusId: formik.values.statusId.id 
            */}
            <SelectComponent
              formName="statusId"
              optionName="statusName"
              label={t('field.statusName')}
              defaultOption={formik.values.stationName}
              data={statusList}
              onChange={(val) => formik.setFieldValue('statusId', val)}
              error={(formik.touched.statusId && formik.errors.statusId)}
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
  bikeList: PropTypes.array,
  statusList: PropTypes.array,
  categoryTicketList: PropTypes.array,
  userList: PropTypes.array,
  // setFile: PropTypes.func,
  // setImageUrl: PropTypes.func,
  // imageUrl: PropTypes.string,
};
