import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// import { PATH } from 'src/routes/constant';

import { postPutData } from 'src/utils/request';
import { METHOD_PUT, STATUS_200, TOKEN_NAME, VITE_REACT_APP_API_AUTHEN } from 'src/utils/constant';

import { setAuth } from 'src/redux/auth';
import DangNhapTemplates from 'src/template/dang-nhap';
import { setLoadingPage, setNotification } from 'src/redux/common';
import ForgotTemplates from 'src/template/dang-nhap/forgot';
import { SIGN_IN, FORGOT_PASSWORD } from 'src/api/authen';

import DialogComponent from 'src/components/modal';
import { PATH } from 'src/routes/constant';

const initialValues = {
  userName: '',
  password: '',
};
const initialForgot = {
  userName: '',
  email: '',
};
export default function DangNhapPages() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hienThiHopThoai, setHienThiHopThoai] = useState(false);
  // const linkPrev = useSelector(state => state.auth.linkPrev)
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

  const handleDangNhap = () => {
    dispatch(setLoadingPage(true));
    postPutData({
      url: VITE_REACT_APP_API_AUTHEN + SIGN_IN,
      payload: {
        ...formik.values,
      },
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          localStorage.setItem(TOKEN_NAME, res.data.accessToken);
          dispatch(
            setAuth({
              token: res.data.accessToken,
              user: res.data.infoUser,
              isAdmin: res.data.isSuperAdmin,
            })
          );

          const localLink = localStorage.getItem('previousAccess');
          if (localLink) {
            navigate(localLink);
            localStorage.removeItem('previousAccess');
          } else navigate(PATH.DASHBOARD);
        }
        dispatch(setLoadingPage(false));
      },
    });
  };

  const handHienThiQuenMK = () => {
    setHienThiHopThoai(true);
  };

  const handleQuenMK = useCallback(() => {
    dispatch(setLoadingPage(true));
    postPutData({
      url: VITE_REACT_APP_API_AUTHEN + FORGOT_PASSWORD,
      payload: {
        ...formikForgot.values,
      },
      method: METHOD_PUT,
      onSuccess: (res) => {
        if (res && res.statusCode === STATUS_200) {
          dispatch(
            setNotification({
              show: true,
              message: t('dialog.content_forgot'),
              status: 'success',
            })
          );
        }
        dispatch(setLoadingPage(false));
      },
    });
  }, [dispatch, formikForgot.values, t]);

  const renderHopThoaiMK = useCallback(
    () =>
      hienThiHopThoai && (
        <DialogComponent
          title={t('dialog.title_forgot')}
          open={hienThiHopThoai}
          setOpen={setHienThiHopThoai}
          textBtn={t('button.forgot')}
          colorBtn="error"
          fullWidth={false}
          onSubmitForm={handleQuenMK}
          handleClose={() => {
            formikForgot.resetForm();
          }}
        >
          <ForgotTemplates formik={formikForgot} />
        </DialogComponent>
      ),
    [formikForgot, handleQuenMK, hienThiHopThoai, t]
  );

  return (
    <>
      <DangNhapTemplates
        formik={formik}
        validationSchema={validationSchema}
        handleDangNhap={handleDangNhap}
        handHienThiQuenMK={handHienThiQuenMK}
      />
      {renderHopThoaiMK()}
    </>
  );
}
