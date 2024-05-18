// import { useEffect } from 'react';
// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemButton from '@mui/material/ListItemButton';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemButton from '@mui/material/ListItemButton';
// import { routerData } from 'src/routes/router';
// import { PAGELAYOUT } from 'src/routes/constant';
// import { RouterLink } from 'src/routes/components';
import {
  // useRouter,
  usePathname,
} from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { NAV } from 'src/utils/constant';

// import { setPopup } from 'src/redux/common';

import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

import { PATH } from 'src/routes/constant';

import { setShowNav } from 'src/redux/common';

import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { setLinkPrev } from 'src/redux/auth';

export default function Nav(props) {
  const { openNav, onCloseNav, routerData = [], } = props;
  const showNav = useSelector((state) => state.common.showNav);
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (location.pathname.includes(PATH.USERS)) {
      dispatch(setShowNav(false));
    } else dispatch(setShowNav(true));
  }, [dispatch, location.pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {routerData.map((item, i) => {
        if (item.children && item.children.length) {
          return (
            <>
              <MenuItem
                id={`basic-button-${i}`}
                aria-controls={open ? `basic-menu-${i}` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  minHeight: 44,
                  borderRadius: 0.75,
                  typography: 'body2',
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                  fontWeight: 'fontWeightMedium',
                  '&:first-of-type': {
                    marginTop: 1,
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Stack direction="row">
                    <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                      {icon(item.icon)}
                    </Box>

                    <Box component="span"> {t(`${item.title}`)} </Box>
                  </Stack>
                  <Box>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                  </Box>
                </Stack>
              </MenuItem>
              <Menu
                style={{ width: '100%' }}
                id={`basic-menu-${i}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': `basic-button-${i}`,
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                slotProps={{
                  paper: {
                    sx: {
                      minWidth: 230,
                    },
                  },
                }}
                sx={{padding: 0}}
              >
                {item.children.map((el, index) => (
                  <NavItem key={el.title} item={el} />
                ))}
              </Menu>
            </>
          );
        }
        return <NavItem key={item.title} item={item} />;
      })}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <Logo sx={{ mt: 1, mb: 1, width: '100%' }} />
      </Box>

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: showNav ? NAV.WIDTH : 0 },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: showNav ? NAV.WIDTH : 0,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

function NavItem({ item }) {
  const pathname = usePathname();
  // const navigate = useNavigate();
  const dispatch = useDispatch()
  const active = item.path === pathname;
  const { t } = useTranslation();
  const handleClick = (pathName) => {
    dispatch(setLinkPrev(pathName))
  }
  return (
    <ListItemButton
      onClick={() => handleClick(item.path)}
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        '&:first-of-type': {
          marginTop: 1,
        },
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {icon(item.icon)}
      </Box>

      <Box component="span"> {t(`${item.title}`)} </Box>
    </ListItemButton>
  );
}

Nav.propTypes = {
  routerData: PropTypes.array,
};


NavItem.propTypes = {
  item: PropTypes.object,
};
