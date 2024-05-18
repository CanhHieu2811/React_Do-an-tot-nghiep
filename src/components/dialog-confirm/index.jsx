// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { startDelete } from 'src/utils/request';

import {
  setPopup,
  setFetchData,
  setNotification,
  setConfirmDialog,
  setEqualForm,
} from 'src/redux/common';

import { STATUS_200 } from 'src/utils/constant';
import { setLinkPrev } from 'src/redux/auth';
import Iconify from '../iconify';

export default function AlertDialog() {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDialog = useSelector((state) => state.common.dialog);
  const linkPrev = useSelector((state) => state.auth.linkPrev);
  // const equalForm = useSelector((state) => state.common.equalForm);

  const handleClose = () =>
    dispatch(
      setConfirmDialog({
        show: false,
        url: null,
        title: null,
        content: null,
        data: null,
      })
    );

  const handleAgree = () => {
    if (showDialog.url) {
      startDelete({
        url: showDialog.url,
        // payload,
        onSuccess: (res) => {
          if (res && res.statusCode === STATUS_200) {
            dispatch(
              setNotification({
                show: true,
                message: res?.message,
                status: 'success',
              })
            );
            dispatch(setFetchData(true));
          }

          dispatch(
            setConfirmDialog({
              show: false,
              url: null,
              title: null,
              content: null,
            })
          );
        },
      });

      // confirm close modal
    } else {
      dispatch(
        setConfirmDialog({
          show: false,
          url: null,
          title: null,
          content: null,
        })
      );
      dispatch(setPopup(false));
      dispatch(setEqualForm(true));

      if (linkPrev && !showDialog?.onHandleAgree) {
        navigate(linkPrev);
        dispatch(setLinkPrev(null));
      }
    }

    if (showDialog?.onHandleAgree) showDialog.onHandleAgree();
  };
  return (
    <Dialog
      open={!!showDialog?.show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={showDialog?.maxWidthDialog ? showDialog.maxWidthDialog : 'sm'}
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
        <Iconify
          icon="eva:alert-circle-outline"
          sx={{ mr: 1, height: 24, width: 24, color: theme.palette.warning.main }}
        />
        {showDialog?.title ? showDialog?.title : t('dialog.title')}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          {showDialog?.content ? showDialog.content : t('dialog.content')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAgree}
          autoFocus
          color="error"
          variant="contained"
          sx={{ width: '100px', height: '40px' }}
        >
          {t('dialog.agree')}
        </Button>
        <Button
          onClick={handleClose}
          color="inherit"
          sx={{ width: '100px', height: '40px', background: '#DFE3E8' }}
        >
          {t('dialog.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
