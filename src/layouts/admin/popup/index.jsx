import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Dialog, Tooltip, useTheme, Typography } from '@mui/material';

import { setPopup, setConfirmDialog } from 'src/redux/common';

// import Scrollbar from 'src/components/scrollbar';

export default function LayoutPopup(props) {
  const {
    children,
    title,
    fullScreen = false,
    openTwo,
    setOpenTwo,
    hideClose = false,
    scrollBody = false,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const equalForm = useSelector((state) => state.common.equalForm);
  const [open, setOpen] = useState(false);
  // close popup
  const handleClose = useCallback(() => {
    if (!equalForm) {
      dispatch(
        setConfirmDialog({
          show: true,
          url: null,
          content: t('dialog.change_form'),
        })
      );

      if (fullScreen) {
        setOpen(false);
      }
    } else {
      dispatch(setPopup(false));
      setOpen(false);
    }
  }, [dispatch, equalForm, fullScreen, t]);
  // render content popup
  const renderPopup = useCallback(
    () => (
      <Box sx={{ height: '100%' }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            padding: 1,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[0],
            height: '48px',
          }}
        >
          <Typography gutterBottom variant="subtitle1" sx={{ marginBottom: 0 }}>
            {title}
          </Typography>
          <Stack flexDirection="row" alignItems="center" justifyContent="right">
            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
              <Tooltip title={open ? t('dialog.custom_screen') : t('dialog.full_screen')}>
                <img
                  alt="icon"
                  src={open ? '/assets/zoom-out.png' : '/assets/zoom-in.png'}
                  style={{
                    filter: 'invert(1)',
                    width: 16,
                    marginBottom: '4px',
                    marginRight: 8,
                  }}
                />
              </Tooltip>
            </Box>
            {/* <Iconify
            icon="/assets/zoom-in.png"
            sx={{ mr: 2, color: theme.palette.grey[0], cursor: 'pointer' }}
            onClick={() => setOpen(true)}
          /> */}
            {openTwo && !hideClose && (
              <Tooltip title={t('dialog.close')}>
                <CloseIcon onClick={() => setOpenTwo(false)} sx={{ cursor: 'pointer' }} />
              </Tooltip>
            )}
            {!openTwo && !hideClose && (
              <Tooltip title={t('dialog.cancel')}>
                <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
              </Tooltip>
            )}
          </Stack>
        </Stack>

        <Box
          sx={{
            fontSize: 14,
            // height: '100%',
            border: `1px solid ${theme.palette.grey[300]}`,
            background: '#FFFFFF',
            overflow: scrollBody ? 'auto' : 'unset',
            maxHeight: scrollBody ? window.innerHeight - 300 : '100%',
          }}
        >
          {/* <Scrollbar sx={{ maxHeight: 700, height: "100%" }}> */}
          <Box>{children}</Box>
          {/* </Scrollbar> */}
        </Box>
      </Box>
    ),
    [
      children,
      handleClose,
      hideClose,
      open,
      openTwo,
      scrollBody,
      setOpenTwo,
      t,
      theme.palette.grey,
      theme.palette.primary.main,
      title,
    ]
  );
  return (
    <>
      {open ? (
        <Dialog fullScreen open={open} onClose={handleClose}>
          {renderPopup()}
        </Dialog>
      ) : (
        renderPopup()
      )}
    </>
  );
}

LayoutPopup.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  fullScreen: PropTypes.bool,
  openTwo: PropTypes.bool,
  setOpenTwo: PropTypes.func,
  hideClose: PropTypes.bool,
  scrollBody: PropTypes.bool
};
