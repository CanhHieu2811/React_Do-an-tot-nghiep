import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, HEADER } from 'src/utils/constant';

import { bgBlur } from 'src/theme/css';
import { setShowNav } from 'src/redux/common';

import Iconify from 'src/components/iconify/index';
// import LanguageComponent from 'src/components/language';

import AccountPopover from './common/account-popover';

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const lgUp = useResponsive('up', 'lg');
  const showNav = useSelector((state) => state.common.showNav);
  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" justifyContent="right" spacing={1}>
        {/* <LanguageComponent /> */}
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: showNav ? `calc(100% - ${NAV.WIDTH + 1}px)` : '100%',
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 2 },
        }}
      >
        {lgUp ? (
          <Tooltip title={showNav ? 'Ẩn' : 'Hiện'}>
            <Iconify
              icon="eva:menu-arrow-outline"
              style={{ color: theme.palette.primary.main, cursor: 'pointer' }}
              onClick={() => dispatch(setShowNav(!showNav))}
            />
          </Tooltip>
        ) : null}

        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
