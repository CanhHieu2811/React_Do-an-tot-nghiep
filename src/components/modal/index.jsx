// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// import FormComponent from '../form';
// import DialogContentText from '@mui/material/DialogContentText';

export default function DialogComponent({
  open,
  setOpen,
  title = 'Modal',
  children,
  // formik,
  fullWidth = true,
  width = "sm",
  textBtn,
  colorBtn = "primary",
  // valuesForm,
  onSubmitForm,
}) {
  const { t } = useTranslation();
  //   const [open, setOpen] = useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth={fullWidth}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      {

      }
      <DialogContent>
        {/* <form onSubmit={e => e.preventDefault()}> */}
          {children}
        {/* </form> */}
        {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
        {/* {children} */}
        {/* <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        /> */}
      </DialogContent>
      <DialogActions>
        <Button type="submit" color={colorBtn} variant="contained" onClick={onSubmitForm}>
          {textBtn || t('button.create')}
        </Button>
        <Button onClick={handleClose} color='inherit'>{t('button.close')}</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogComponent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  colorBtn: PropTypes.string,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  // formik: PropTypes.object,
  textBtn: PropTypes.string,
  // valuesForm: PropTypes.object,
  onSubmitForm: PropTypes.func,
  width: PropTypes.number || PropTypes.string
};
