import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { setLanguage } from 'src/redux/common';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'vn',
    label: 'Việt Nam',
    icon: '/assets/icons/ic_flag_vn.png',
  },
  // {
  //   value: 'fr',
  //   label: 'French',
  //   icon: '/assets/icons/ic_flag_fr.svg',
  // },
];

// ----------------------------------------------------------------------

export default function LanguageComponent() {
  const [open, setOpen] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const defaultLanguage = useSelector((state) => state.common.defaultLanguage);
  const [active, setActive] = useState({});
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClick = (val) => {
    dispatch(setLanguage(val));
    i18n.changeLanguage(val);
    setOpen(null);
  };

  useEffect(() => {
    const defaultFlag = LANGS.find((el) => el.value === defaultLanguage);
    setActive(defaultFlag);
  }, [defaultLanguage]);

  return (
    <>
    <Tooltip title={t('choose_language')}>
    <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: 'action.selected',
          }),
          // backgroundColor: "primary.main"
        }}
      >
        <img src={active.icon} alt={active.label} />
      </IconButton>
    </Tooltip>
      

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === defaultLanguage}
            onClick={() => handleClick(option.value)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
