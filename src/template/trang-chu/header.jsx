import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';
// eslint-disable-next-line import/no-unresolved
import { PATH } from 'src/routes/constant';
import AppBar from './app-bar';
import Toolbar from './toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

export default function HeaderTrangChu() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* <Box sx={{ flex: 1 }} /> */}
          <Link variant="h6" underline="none" color="inherit" href="/" sx={{ fontSize: 24 }}>
            <Box
              sx={{
                borderBottom: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <Logo sx={{ mt: 1, mb: 1, width: '100%' }} />
            </Box>
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="body2"
              underline="none"
              href={PATH.TIN_TUC_SU_KIEN}
              sx={rightLink}
            >
              Tin tức - sự kiện
            </Link>
            <Link
              color="inherit"
              variant="body2"
              underline="none"
              href={PATH.TRAM_XE}
              sx={rightLink}
            >
              Trạm - Xe
            </Link>
            <Link color="inherit" variant="body2" underline="none" href={PATH.LOGIN} sx={rightLink}>
              Đăng nhập
            </Link>
            <Link
              variant="body2"
              underline="none"
              href={PATH.REGISTER}
              sx={{ ...rightLink}}
            >
              Đăng ký
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
