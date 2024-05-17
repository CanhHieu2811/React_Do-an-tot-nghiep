import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import { setNotification } from 'src/redux/common';

export default function SnackbarComponent({ vertical = 'top', horizontal = 'right' }) {
  const notification = useSelector((state) => state.common.noti);
  
  const dispatch = useDispatch();
  const handleClose = useCallback(
    (event, reason) => {
      dispatch(
        setNotification({
          show: false,
          message: null,
          // success | info | warning | error
          status: null,
        })
      );
    },
    [dispatch]
  );

  const renderSnackBar = useCallback(
    () => (
        <Snackbar
          open={notification.show}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity={notification && notification.status ? notification.status : 'success'}
            variant="filled"
            sx={{ width: '100%', minWidth: 250 }}
          >
            {notification && notification.message}
          </Alert>
        </Snackbar>
      ),
    [handleClose, horizontal, notification, vertical]
  );

  return <>{renderSnackBar()}</>;
}

SnackbarComponent.propTypes = {
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
};
