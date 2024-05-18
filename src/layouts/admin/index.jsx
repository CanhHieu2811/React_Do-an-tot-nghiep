import PropTypes from 'prop-types';
import { useState } from 'react';

import { Box, Toolbar } from '@mui/material';
// import {  useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import BreadcrumbsComponent from 'src/components/breadcrum';

// import routerProject from 'src/routes/router_project';
// import { PATH } from 'src/routes/constant';
// import Nav from './nav';
import Main from './main';
import Header from './header';
import SideBar from './sidebar';

export default function LayoutAdmin({ children, code, isAuthencated }) {
  const [openNav, setOpenNav] = useState(false);
  // const navigate = useNavigate();

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Toolbar id="back-to-top-anchor" sx={{ position: 'absolute' }} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <SideBar openNav={openNav} onCloseNav={() => setOpenNav(false)} code={code} />

        <Main>
          <BreadcrumbsComponent />
          {children}
        </Main>
      </Box>
    </>
  );
}

LayoutAdmin.propTypes = {
  children: PropTypes.node,
  code: PropTypes.string,
  isAuthencated: PropTypes.bool,
};
