import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup, setConfirmDialog } from 'src/redux/common';
import { useTheme } from '@emotion/react';
import Iconify from 'src/components/iconify';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';

export default function BreadcrumbsComponent() {
  const theme = useTheme();
  const location = useLocation();
  const [routerName, setRouterName] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const equalForm = useSelector((state) => !!state.common.equalForm);

  // Xử lý khi mở modal rồi click breadcrumbs ra trang list
  const handleNavigation = () => {
    if (equalForm) {
      dispatch(setPopup(false));
      navigate(location.pathname);
    } else {
      dispatch(setPopup(true));
      dispatch(
        setConfirmDialog({
          show: true,
          url: null,
          content: t('dialog.change_form'),
        })
      );
    }
  };

  useEffect(() => {
    const data = location.pathname.split('/');
    setRouterName(`${t(`breadcrumb.${data[data.length - 1]}`)}`);
  }, [location, t]);

  const renderBreadcrumbs = useCallback(
    () => (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          backgroundColor: theme.palette.background.paper,
          paddingTop: '20px',
          paddingBottom: '4px',
          paddingLeft: '16px',
          // position: 'fixed',
          // zIndex: 999,
          // top: '80px',
          // width: '100%',
        }}
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link underline="hover" color="inherit" href="/">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tooltip title={t('breadcrumb.dashboard')}>
              <Iconify
                icon="eva:home-outline"
                sx={{ mr: 2, height: 40, cursor: 'pointer', marginRight: '0' }}
              />
            </Tooltip>
          </Box>
        </Link>
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          onClick={handleNavigation}
        >
          {t(`${routerName}`)}
        </Typography>
      </Breadcrumbs>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [routerName]
  );
  return <>{renderBreadcrumbs()}</>;
}
