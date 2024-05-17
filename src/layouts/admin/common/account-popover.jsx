import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import { PATH } from 'src/routes/constant';

import { Tooltip } from '@mui/material';

import { PATH } from 'src/routes/constant';

import { authPostPutData } from 'src/utils/request';
import { METHOD_PUT, STATUS_200, VITE_REACT_APP_API_AUTHEN } from 'src/utils/constant';

import { setLogout } from 'src/redux/auth';
// import { setLogout } from 'src/redux/auth';
import { account } from 'src/_mock/account';
import { CHANGES_PASSWORD } from 'src/api/authen';
import { setNotification } from 'src/redux/common';

import DialogComponent from 'src/components/modal';

import ProfileAccount from './profile';
import ChangePassword from './change-password';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Thông tin tài khoản',
    icon: 'eva:person-fill',
    key: 'profile',
  },
  {
    label: 'Đổi mật khẩu',
    icon: 'eva:home-fill',
    key: 'password',
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

const initialValues = {
  email: '',
  fullName: '',
};

const initialValuesChangePass = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function AccountPopover() {
  const [openPopover, setOpenPopover] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [keyModal, setKeyModal] = useState('profile');
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email(t('validator.formatEmail')).required(t('validator.required')),
    password: Yup.string().min(8, t('validator.min8Character')).required(t('validator.required')),
  });
  const validationSchemaChangePass = Yup.object({
    oldPassword: Yup.string().min(8, t('validator.min_8')).required(t('validator.required')),
    newPassword: Yup.string().min(8, t('validator.min_8')).required(t('validator.required')),
    confirmPassword: Yup.string()
      .required(t('validator.required'))
      .oneOf([Yup.ref('newPassword'), null], t('validator.match_password')),
  });

  const handleOpen = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate(PATH.LOGIN);
  };

  const handleClick = (key) => {
    setKeyModal(key);
    setOpenModal(true);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  const onSubmitForm = () => {
    if (keyModal === "password") {
      authPostPutData({
        url: VITE_REACT_APP_API_AUTHEN + CHANGES_PASSWORD,
        payload: {
          passwordOld: formikPasword.values.oldPassword,
          passwordNew: formikPasword.values.newPassword
        },
        method: METHOD_PUT,
        onSuccess: (res) => {
          if (res && res.statusCode === STATUS_200) {
            
            dispatch(setNotification({
              show: true,
              message: res.message,
              status: "success"
            }))
          }
          console.log(res)
        }
      })
    }
  };

  const formikPasword = useFormik({
    initialValues: initialValuesChangePass,
    validationSchema: validationSchemaChangePass,
  });


  const renderContentModal = useCallback(() => {
    if (keyModal === 'profile') return <ProfileAccount formik={formik} />;
    return <ChangePassword formik={formikPasword} />;
  }, [keyModal, formik, formikPasword]);
  return (
    <>
      <Tooltip title={t('profile.title')}>
        <IconButton
          onClick={handleOpen}
          sx={{
            width: 40,
            height: 40,
            background: (theme) => alpha(theme.palette.grey[500], 0.08),
            ...(openPopover && {
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
            }),
          }}
        >
          <Avatar
            src={account.photoURL}
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

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClose}
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
          <Typography variant="body2" sx={{ color: 'text.success' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => handleClick(option.key)}
            sx={{
              '&:hover': (theme) => ({
                color: theme.palette.success.main,
                backgroundColor: alpha(theme.palette.success.main, 0.08),
              }),
            }}
          >
            {option.label}
          </MenuItem>
        ))}

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
          Logout
        </MenuItem>
      </Popover>

      {openModal && (
        <DialogComponent
        colorBtn='success'
          open={openModal}
          setOpen={setOpenModal}
          title="Thay đổi thông tin"
          // formik={formik}
          textBtn="Update"
          // valuesForm={valuesForm}
          onSubmitForm={onSubmitForm}
        >
          {renderContentModal()}
        </DialogComponent>
      )}
    </>
  );
}
