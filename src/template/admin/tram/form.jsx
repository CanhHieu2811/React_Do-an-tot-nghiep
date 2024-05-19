import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextField, Grid } from '@mui/material';

import FormComponent from 'src/components/form';
import ErrorTextComponent from 'src/components/error-text';
import SelectComponent from 'src/components/select';

export default function FormThaoTacDuLieu({
  formik,
  onSubmitForm,
  textBtn,
  initialValues,
  isCreate,
  statusList,
}) {
  const { t } = useTranslation();

  return (
    <FormComponent
      formik={formik}
      textBtn={textBtn}
      handleSubmitForm={onSubmitForm}
      initialValues={initialValues}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="stationName">
            <TextField
              name="stationName"
              label={t('field.stationName')}
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.stationName && formik.errors.stationName ? true : false}
              value={formik.values.stationName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="numOfSeats">
            <TextField
              name="numOfSeats"
              label={t('field.numOfSeats')}
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.numOfSeats && formik.errors.numOfSeats ? true : false}
              value={formik.values.numOfSeats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="locationName">
            <TextField
              name="locationName"
              label={t('field.locationName')}
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.locationName && formik.errors.locationName ? true : false}
              value={formik.values.locationName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="longitude">
            <TextField
              name="longitude"
              label='Kinh độ'
              size="small"
              // eslint-disable-next-line no-unneeded-ternary
              error={formik.touched.longitude && formik.errors.longitude ? true : false}
              value={formik.values.longitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="latitude">
            <TextField
              name="latitude"
              label='Vĩ độ'
              size="small"
              error={!!(formik.touched.latitude && formik.errors.latitude)}
              value={formik.values.latitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </ErrorTextComponent>
        </Grid>
        <Grid item xs={12} md={3}>
          <ErrorTextComponent errors={formik.errors} touched={formik.touched} field="statusName">
            {/* ĐÂY LÀ 1 DROPDOWN SELECT OPTION CÓ SEARCH => so sánh với cái e đang làm để điền đúng thông tin
              cái formik.values.statusId là 1 object chứ ko phải là 1 id number, string MÀ LÀ 1 OBJECT
              khi gửi dữ liệu lên thì phải chỉnh lại request đưa lên theo BE yêu cầu ví dụ
              formik.values.statusId đang là 1 object có {id:..., statusName:..., ....}
              thì khi BE yêu cầu gửi lên id thì ngoài submit form thì statusId: formik.values.statusId.id 

            */}
            <SelectComponent
            // formName chính là biến mà sử dụng ở formik: formik.values là 1 object chứa hết tất cả các field mà e set init bên page
            // thêm formName=statusId thì khi thay đổi dữ liệu thì nó sẽ thêm vào formik.values.statusId
              formName="statusId"

              // cái biến optionName này chính là biến hiển thị text khi click xổ dropdown
              // làm răng để xác định được thì trong data nó trả về biến nào dùng để hiển thị thì lấy biến đó
              // ví dụ thắng statusList này có object gồm id, statusName, createDate,....thì muốn hiển thị thằng nào lấy tên biến thằng đó
              optionName="statusName"

              // label ni dùng để hiển thị ngoài view như placeholder, ko truyền thì ko có hiển thị
              label={t('field.statusName')}

              // defaultOption chính là cái formik mà e find được ở hàm openModal, nếu ko tìm ra thì phải set mặc định là null
              defaultOption={formik.values.statusId}

              // 1 array được gọi từ api, hay set cứng, (bắt buộc phải là 1 array và chứa object có biến của optionName)
              data={statusList}

              // onChange: val chính là 1 object khi được chọn và được set lại trong fomrik với hàm setFieldValue
              // CÚ PHÁP formik.setFieldValue(NAME, VALUE): NAME chính là key, VALUE chính là giá trị nhận được của key
              // ở đây formik.setFieldValue('statusId', val) => có nghĩa là set giá trị cho formik.values.statusId = val
              // còn ko hiểu THÌ VUI LÒNG LÊN MẠNG SEARCH DOC CỦA FORMIK
              onChange={(val) => formik.setFieldValue('statusId', val)}

              // error thì nó nhận boolean => ở đây có nghĩa là statusId ko có giá trị thì sẽ lỗi, cái này phụ thuộc validate form có bắt ở page ko?
              // dòng 302 ở page đang bắt ko được bỏ trống thì có nghĩa ý 1 là phải bắt buộc  statusId: Yup.string().required(t('validator.required')),
              error={!!(formik.touched.statusId && formik.errors.statusId)}
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
  statusList: PropTypes.array,
};
