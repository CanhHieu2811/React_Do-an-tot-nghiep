// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { startDelete } from 'src/utils/request';

import { setPopup, setFetchData, setNotification, setConfirmDialog } from 'src/redux/common';

import Iconify from '../iconify';

export default function AlertDialog() {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.common.confirmDialog);
  const handleClose = () =>
    dispatch(
      setConfirmDialog({
        open: true,
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
        payload: { id: showDialog.data },
        onSuccess: (res) => {
          dispatch(
            setNotification({
              isShow: true,
              message: res?.message,
              status: 'success',
            })
          );

          dispatch(
            setConfirmDialog({
              show: false,
              url: null,
              title: null,
              content: null,
            })
          );
          dispatch(setFetchData(true));
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
    }
  };
  return (
    <Dialog
      open={showDialog?.show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
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
          {showDialog?.content ? showDialog?.content : t('dialog.content')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree} autoFocus color="error" variant="contained">
          {t('dialog.argee')}
        </Button>
        <Button onClick={handleClose} color="inherit">
          {t('dialog.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
