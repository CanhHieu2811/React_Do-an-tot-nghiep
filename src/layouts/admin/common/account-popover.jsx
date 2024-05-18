import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { RouterLink } from 'src/routes/components';
// import { PATH } from 'src/routes/constant';
import Iconify from 'src/components/iconify';

import {
  Box,
  Card,
  Stack,
  Drawer,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  MenuItem,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { PATH } from 'src/routes/constant';

import { authGetData, authPostPutData, authPostFileData } from 'src/utils/request';
import { METHOD_PUT, STATUS_200, TOKEN_NAME, VITE_REACT_APP_API_AUTHEN } from 'src/utils/constant';

// import { setLogout } from 'src/redux/auth';
import { account } from 'src/_mock/account';
import { setEqualForm, setNotification, setPopup } from 'src/redux/common';
import { setLinkPrev, setLogout, setUserAuth } from 'src/redux/auth';
import { GET_PROFILE, UPDATE_PROFILE, CHANGES_PASSWORD } from 'src/api/authen';

// import DialogComponent from 'src/components/modal';

// import dayjs from 'dayjs';

import ProfileAccount from './profile';
import ChangePassword from './change-password';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Trang quản trị',
  //   icon: 'eva:options-2-outline',
  //   key: 'admin',
  //   path: PATH.ADMIN + PATH.CAU_HINH_THONG_TIN_WEBSITE,
  // },
  {
    label: 'Thông tin tài khoản',
    icon: 'eva:person-fill',
    key: 'profile',
  },
  {
    label: 'Đổi mật khẩu',
    icon: 'eva:edit-2-outline',
    key: 'password',
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

const initialValuesChangePass = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function AccountPopover({ menu }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [keyModal, setKeyModal] = useState('profile');
  const user = useSelector((state) => state.auth.user);
  const equalForm = useSelector((state) => state.common.equalForm);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthencated);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const initialValuesProfile = {
    email: user.email ?? '',
    hoTen: user.fullName ?? '',
    soDienThoai: user.phoneNumber ?? '',
    ngaySinh: user.dateOfBirth ?? null,
    diaChi: user.address ?? '',
  };
  const validationSchema = Yup.object({
    // email: Yup.string().email(t('validator.email.format')).notRequired(),
    hoTen: Yup.string().required(t('validator.required')),
    // soDienThoai: Yup.string().notRequired(),
  });
  const validationSchemaChangePass = Yup.object({
    oldPassword: Yup.string().min(8, t('validator.min_8')).required(t('validator.required')),
    newPassword: Yup.string().min(8, t('validator.min_8')).required(t('validator.required')),
    confirmPassword: Yup.string()
      .required(t('validator.required'))
      .oneOf([Yup.ref('newPassword'), null], t('validator.match_password')),
  });
  const [imageUrl, setImageUrl] = useState(user.fileAnh ?? '/assets/images/avatars/avatar_25.jpg');
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: initialValuesProfile,
    validationSchema,
  });

  const formikPassword = useFormik({
    initialValues: initialValuesChangePass,
    validationSchema: validationSchemaChangePass,
  });

  const handleOpen = (event) => {
    formik.setValues({
      email: user.email ?? '',
    hoTen: user.fullName ?? '',
    soDienThoai: user.phoneNumber ?? '',
    ngaySinh: user.dateOfBirth ?? null,
    diaChi: user.address ?? '',
    });
    setOpenPopover(event.currentTarget);
  };
  const handleCloseChangePassword = useCallback(() => {
    formikPassword.resetForm();
    if (equalForm) {
      setOpenPopover(null);
      setOpenModal(false);
    } else {
      setOpenConfirm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, equalForm, t]);

  const handleCloseProfile = useCallback(() => {
    if (equalForm) {
      setOpenPopover(null);
      setOpenModal(false);
    } else {
      setOpenConfirm(true);
    }
  }, [equalForm]);

  // Xử lý khi click đồng ý lúc thay đổi form
  const handleAgreeConfirm = useCallback(() => {
    setOpenPopover(null);
    setOpenModal(false);
    setOpenConfirm(false);
    formik.resetForm();
    formikPassword.resetForm();
    dispatch(setEqualForm(true));
  }, [dispatch, formik, formikPassword]);

  // render confirm modal khi thay đổi form
  const renderConfirmModal = useCallback(
    () => (
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)} fullWidth>
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon="eva:alert-circle-outline" sx={{ mr: 1, height: 24, width: 24 }} />
          {t('dialog.title')}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            {t('dialog.change_form')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAgreeConfirm}
            autoFocus
            color="error"
            variant="contained"
            sx={{ width: '100px', height: '40px' }}
          >
            {t('dialog.agree')}
          </Button>
          <Button
            onClick={() => setOpenConfirm(false)}
            color="inherit"
            sx={{ width: '100px', height: '40px', background: '#DFE3E8' }}
          >
            {t('dialog.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [handleAgreeConfirm, openConfirm, t]
  );

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem('previousAccess');
    dispatch(setLinkPrev(PATH.DASHBOARD));
    navigate(PATH.LOGIN);
    dispatch(setPopup(false));
  };
  const toggleDrawer = (newOpen) => () => {
    setOpenModal(newOpen);
    setOpenPopover(null);
  };

  //
  const handleClick = (key) => {
    setKeyModal(key);
    setOpenModal(true);
    setOpenPopover(null);
  };

  // HÀM CẬP NHẬT THEO KEYMODAL CỦA THAY ĐỔI MẬT KHẨU VÀ THAY ĐỔI THÔNG TIN DÒNG 225 (THAY ĐỔI PASSWORD)
  const onSubmitForm = () => {
    if (keyModal === 'password') {
      // thằng ni là call api thay đổi mật khẩu

      // METHOD PUT
      // BE làm 1 api này truyền các thông tin
      // passwordOld, passwordNew
      authPostPutData({
        url: VITE_REACT_APP_API_AUTHEN + CHANGES_PASSWORD,
        payload: {
          passwordOld: formikPassword.values.oldPassword,
          passwordNew: formikPassword.values.newPassword,
        },
        method: METHOD_PUT,
        onSuccess: (res) => {
          if (res && res.statusCode === STATUS_200) {
            dispatch(
              setNotification({
                show: true,
                message: res.message,
                status: 'success',
              })
            );
          }
        },
      });
    } else {
      // thằng ni là call api thay đổi thông tin gọi dạng formData truyền lên 1 biến image = file dòng 251
      // BE làm 1 api này truyền các thông tin
      // METHOD PUT
      // email, fullName, phoneNumber, dateOfBirth, address, image (image có thể bỏ trống)
      let payload = {};
      if (file) {
        payload = {
          email: formik.values.email,
          fullName: formik.values.fullName,
          phoneNumber: formik.values.phoneNumber,
          dateOfBirth: formik.values.dateOfBirth,
          address: formik.values.address,
          image: file,
        };
      } else {
        payload = {
          email: formik.values.email,
          fullName: formik.values.fullName,
          phoneNumber: formik.values.phoneNumber,
          dateOfBirth: formik.values.dateOfBirth,
          address: formik.values.address,
        };
      }
      authPostFileData({
        url: VITE_REACT_APP_API_AUTHEN + UPDATE_PROFILE,
        payload,
        method: METHOD_PUT,
        onSuccess: (res) => {
          if (res && res.statusCode === STATUS_200) {
            dispatch(
              setNotification({
                show: true,
                message: res.message,
                status: 'success',
              })
            );
            authGetData({
              url: VITE_REACT_APP_API_AUTHEN + GET_PROFILE,
              onSuccess: (response) => {
                if (response && response.statusCode === STATUS_200) {
                  dispatch(
                    setUserAuth({
                      ...user,
                      hoTen: response.data.hoTen,
                      diaChi: response.data.diaChi,
                      email: response.data.email,
                      soDienThoai: response.data.soDienThoai,
                      ngaySinh: response.data.ngaySinh,
                      fileAnh: response.data.fileAnh,
                    })
                  );
                }
              },
            });
          }
        },
      });
    }
    setOpenPopover(null);
    setOpenModal(false);
  };

  const renderContentModal = useCallback(() => {
    if (keyModal === 'profile')
      return (
        <ProfileAccount
          formik={formik}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          setFile={setFile}
          onSubmitForm={onSubmitForm}
          textBtn="Cập nhật"
          handleClose={handleCloseProfile}
          initialValuesProfile={initialValuesProfile}
        />
      );
    return (
      <ChangePassword
        formik={formikPassword}
        avatar={imageUrl}
        onSubmitForm={onSubmitForm}
        textBtn="Cập nhật"
        handleClose={handleCloseChangePassword}
        initialValuesChangePass={initialValuesChangePass}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyModal, formik, imageUrl, formikPassword]);
  return (
    <>
      {isAuthenticated ? (
        <Tooltip title="Thông tin tài khoản">
          <IconButton
            onClick={handleOpen}
            sx={{
              width: 40,
              height: 40,
              background: (theme) => alpha(theme.palette.grey[500], 0.08),
              ...(openPopover && {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              }),
            }}
          >
            <Avatar
              src={user.fileAnh ?? account.photoURL}
              alt={account.displayName}
              sx={{
                width: 36,
                height: 36,
                border: (theme) => `solid 2px ${theme.palette.background.default}`,
              }}
            >
              {user.fullName}
            </Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          size="small"
          variant="text"
          sx={{ margin: 'auto', width: '100px', backgroundColor: '#FFFFFF' }}
          onClick={() => navigate(PATH.LOGIN)}
        >
          Đăng nhập
        </Button>
      )}

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={() => setOpenPopover(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary' }} noWrap>
            {user.hoTen}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {(menu ?? MENU_OPTIONS)
          .filter((menuOption) =>
            isAdmin || user.isQuanLy ? menuOption : menuOption.key !== 'admin'
          )
          .map((option) =>
            !option.path ? (
              <MenuItem
                key={option.label}
                onClick={() => handleClick(option.key)}
                sx={{
                  '&:hover': (theme) => ({
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  }),
                }}
              >
                <Iconify icon={option.icon} sx={{ mr: 1, height: 20, width: 20 }} />
                {option.label}
              </MenuItem>
            ) : (
              <MenuItem
                key={option.label}
                sx={{
                  '&:hover': (theme) => ({
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  }),
                }}
                component={RouterLink}
                href={equalForm ? option.path : undefined}
              >
                <Iconify icon={option.icon} sx={{ mr: 1, height: 20, width: 20 }} />
                {option.label}
              </MenuItem>
            )
          )}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{
            typography: 'body2',
            color: 'error.main',
            py: 1.5,
            '&:hover': (theme) => ({
              backgroundColor: alpha(theme.palette.error.main, 0.08),
            }),
          }}
        >
          <Iconify icon="eva:arrow-circle-right-outline" sx={{ mr: 1, height: 20, width: 20 }} />
          {t('button.logout')}
        </MenuItem>
      </Popover>

      <Drawer open={openModal} onClose={toggleDrawer(false)} anchor="right">
        <Card style={{ padding: 12 }}>
          <Stack direction="column" sx={{ height: '100%', maxWidth: 500, mt: 1 }}>
            {renderContentModal()}
          </Stack>
        </Card>
      </Drawer>

      {renderConfirmModal()}
      {/* {openModal && (
        <DialogComponent
          open={openModal}
          setOpen={setOpenModal}
          title="Thay đổi thông tin"
          // formik={formik}
          textBtn="Update"
          // valuesForm={valuesForm}
          onSubmitForm={onSubmitForm}
        >

        </DialogComponent>
      )} */}
    </>
  );
}
AccountPopover.propTypes = {
  menu: PropTypes.array,
};
