import { useState } from 'react';
import PropTypes from 'prop-types';

import NorthIcon from '@mui/icons-material/North'; // import { Box } from '@mui/material';
import { Box, Fab, Fade, Toolbar, useScrollTrigger,} from '@mui/material';

import MainDefault from './main';
import HeaderDefault from './header';

// import Nav from './nav';
// import Main from './main';
// import Header from './header';

export default function LayoutDefault({ children }) {
  const [openNav, setOpenNav] = useState(false);
  console.log(123, openNav);
  return (
    <Box>
      <HeaderDefault onOpenNav={() => setOpenNav(true)} />
      <Toolbar id="back-to-top-anchor" />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {/* <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} /> */}

        <MainDefault sx={{ position: 'relative', padding: 0 }}>
          <Box
            className="section-banner"
            style={{
              backgroundImage: 'url(https://vr.com.vn/images/upload/banner.png)',
              backgroundPosition: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              height: '500px',
              position: 'relative',
              zIndex: 1,
              marginTop: '-60px',
            }}
          >
            <Box
              className="banner-item"
              style={{
                backgroundImage: 'url(https://vr.com.vn/images/cloud.png)',
                backgroundRepeat: 'repeat',
                backgroundPosition: '0 0',
                backgroundSize: 'cover',
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '76.38191%',
                width: '100%',
              }}
            />
            {/* <Box 
              className="slider-banner"
              style={{
                position: 'relative',
                left: 500,
                width: 300,
              }}
            >
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
            />
            </Box> */}
            <Box
              className="banner-title"
              sx={{
                width: '100%',
                position: 'absolute',
                zIndex: 2,
                left: 0,
                top: '29.34673%',
              }}
            >
              {/* <Container>

              <Typography variant="h2" color="common.white" sx={{textTransform: "uppercase"}}>Vietnam Railways</Typography>
              </Container> */}
            </Box>
          </Box>
          {children}
        </MainDefault>

        <ScrollTop>
          <Fab size="small" color="primary" aria-label="scroll back to top">
            <NorthIcon />
          </Fab>
        </ScrollTop>
      </Box>
      {/* {children} */}
    </Box>
  );
}

LayoutDefault.propTypes = {
  children: PropTypes.node,
};

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
