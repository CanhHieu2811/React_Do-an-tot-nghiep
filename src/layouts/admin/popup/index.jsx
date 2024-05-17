import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { lightGreen } from '@mui/material/colors';
import { Box, Stack, Dialog, Tooltip, useTheme, Typography } from '@mui/material';

import { setPopup, setConfirmDialog } from 'src/redux/common';

import Scrollbar from 'src/components/scrollbar';

export default function LayoutPopup(props) {
  const { children, title, fullScreen = false } = props;
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
      <Box marginLeft={20} marginRight={20} border={1} borderRadius={1} borderColor={lightGreen[800]}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderRadius: 1,
            padding: 1,
            backgroundColor: theme.palette.success.main,
            color: theme.palette.grey[0],
          }}
        >
          <Typography gutterBottom variant="subtitle1" sx={{ marginBottom: 0 }}>
            {title}
          </Typography>
          <Stack flexDirection="row" alignItems="center">
            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
              <Tooltip title={open ? t("dialog.custom_screen") : t("dialog.full_screen")}>
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
            <Tooltip title={t("dialog.close")}>
              <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Stack>
        </Stack>

        <Box sx={{ fontSize: 14 }}>
          <Scrollbar sx={{ maxHeight: 700 }}>
            <Box sx={{ mt: 1, padding: 2 }}>{children}</Box>
          </Scrollbar>
        </Box>
      </Box>
      
    ),
    [children, handleClose, open, t, theme.palette.grey, theme.palette.success.main, title]
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
};
