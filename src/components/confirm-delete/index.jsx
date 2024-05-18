// import { useState } from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from '../iconify';

export default function DialogDelete(props) {
  const { openDialog, handleClose, children, handleAgree } = props;
  const theme = useTheme();
  return (
    <Dialog open={openDialog} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <Iconify
          icon="eva:alert-circle-outline"
          sx={{ mr: 1, height: 24, width: 24, color: theme.palette.warning.main }}
        />
        Xác nhận
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree} autoFocus color="error" variant="contained">
          Đồng ý
        </Button>
        <Button onClick={handleClose} color="inherit">
          Đóng lại
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogDelete.propTypes = {
  openDialog: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  handleAgree: PropTypes.func,
};
