import * as Yup from 'yup';
// import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PATH } from 'src/routes/constant';

import {  postPutData } from 'src/utils/request';
import { STATUS_200, phoneRegExp, VITE_REACT_APP_API_AUTHEN } from 'src/utils/constant';

import {  SIGN_UP } from 'src/api/authen';
import { setNotification } from 'src/redux/common';
// import { setLoading } from 'src/redux/common';
import RegisterTemplates from 'src/template/register';

const initialValues = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  phoneNumber: '',
  address: '',
  password: '',
  confirmPassword: '',
};
export default function RegisterPages() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('validator.required')),
    userName: Yup.string().required(t('validator.required')),
    email: Yup.string().email(t('validator.email.format')).required(t('validator.required')),
    phoneNumber: Yup.string().matches(phoneRegExp, t('validator.phone')),
    password: Yup.string().min(8, t('validator.min_8')).required(t('validator.required')),
    confirmPassword: Yup.string()
      .required(t('validator.required'))
      .oneOf([Yup.ref('password'), null], t('validator.match_password')),
      address: Yup.string().max(255, t('validator.max_255'))
  });
  const formik = useFormik({
    initialValues,
    validationSchema
  })

  // submit register form
  const onSubmit = () => {
    console.log(formik);
    postPutData({
      url:  VITE_REACT_APP_API_AUTHEN + SIGN_UP,
      payload: {
        fullName: formik.values.lastName ? `${formik.values.lastName  } ${  formik.values.firstName}` : formik.values.firstName,
        userName: formik.values.userName,
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
        address: formik.values.address,
        password: formik.values.password,
      },
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          dispatch(setNotification({
            show: true,
            message: res.message,
            // success | info | warning | error
            status: "success",
          }))
          navigate(PATH.LOGIN)

        }
        
      }
    })
  };
  return (
    <RegisterTemplates
      formik={formik}
      onSubmitForm={onSubmit}
    />
  );
}
