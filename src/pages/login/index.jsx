import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PATH } from 'src/routes/constant';

import { postPutData } from 'src/utils/request';
import { METHOD_PUT, STATUS_200, TOKEN_NAME, VITE_REACT_APP_API_AUTHEN } from 'src/utils/constant';

import { setAuth } from 'src/redux/auth';
import LoginTemplates from 'src/template/login';
import { setNotification } from 'src/redux/common';
import ForgotTemplates from 'src/template/login/forgot';
import {  SIGN_IN, FORGOT_PASSWORD } from 'src/api/authen';

import DialogComponent from 'src/components/modal';

const initialValues = {
  userName: '',
  password: '',
};
const initialForgot = {
  userName: '',
  email: '',
};
export default function LoginPages() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const validationSchema = Yup.object({
    userName: Yup.string().required(t('validator.required')),
    password: Yup.string().min(5, t('validator.min_8')).required(t('validator.required')),
  });
  const validationSchemaForgot = Yup.object({
    userName: Yup.string().required(t('validator.required')),
    email: Yup.string().email(t('validator.email.format')).required(t('validator.required')),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  const formikForgot = useFormik({
    initialValues: initialForgot,
    validationSchema: validationSchemaForgot,
  });

  const onSubmit = () => {
    postPutData({
      url: VITE_REACT_APP_API_AUTHEN + SIGN_IN,
      payload: {
        ...formik.values,
      },  
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          console.log(res);
          localStorage.setItem(TOKEN_NAME, res.data.accessToken);
          dispatch(
            setAuth({
              token: res.data.accessToken,
              user: res.data.infoUser,
            })
          );
          navigate(PATH.DASHBOARD);
        }
      },
    });
  };

  const handForgotPass = () => {
    setShowModal(true);
  };

  const onSubmitForgot = useCallback(() => {
    postPutData({
      url: VITE_REACT_APP_API_AUTHEN + FORGOT_PASSWORD,
      payload: {
        ...formikForgot.values,
      },
      method: METHOD_PUT,
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          dispatch(setNotification({
            show: true,
            message: t("dialog.content_forgot"),
            status: "success"
          }))
        }
      },
    });
  }, [dispatch, formikForgot.values, t]);

  const renderModalPass = useCallback(
    () =>
      showModal && (
        <DialogComponent
          title={t('dialog.title_forgot')}
          open={showModal}
          setOpen={setShowModal}
          textBtn={t('button.forgot')}
          colorBtn="error"
          fullWidth={false}
          onSubmitForm={onSubmitForgot}
        >
          <ForgotTemplates formik={formikForgot} />
        </DialogComponent>
      ),
    [formikForgot, onSubmitForgot, showModal, t]
  );

  return (
    <>
      <LoginTemplates
        formik={formik}
        validationSchema={validationSchema}
        onSubmitForm={onSubmit}
        handForgotPass={handForgotPass}
      />
      {renderModalPass()}
    </>
  );
}
