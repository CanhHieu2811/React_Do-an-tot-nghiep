import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from 'src/utils/constant';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify/index';
import LanguageComponent from 'src/components/language';

// ----------------------------------------------------------------------

export default function HeaderDefault({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={4}>
        <Button
          size="medium"
          color="success"
          variant="contained"
          sx={{
            minWidth: 32,
            width: 32,
            borderRadius: '50%',
          }}
        >
          <SearchIcon />
        </Button>
        <LanguageComponent />
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
          width: `100%`,
          height: HEADER.H_DESKTOP,
        }),
        backgroundColor: 'unset',
        backdropFilter: 'none',
        padding: 0,
      }}
    >
      <Container>
        <Toolbar
          sx={{
            height: 1,
            padding: '0 !important',
          }}
        >
          <Logo
            sx={{
              // position: 'fixed',
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 },
            }}
          />

          {renderContent}

          <Button
            size="medium"
            color="success"
            variant="contained"
            sx={{
              minWidth:32,
              width: 32,
              height: 32,
              borderRadius: '50%',
              marginLeft: 4
            }}
          >
            <MenuIcon />
          </Button>
          {/* <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

HeaderDefault.propTypes = {
  onOpenNav: PropTypes.func,
};
