import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from 'src/utils/constant';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function MainDefault({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `100%`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

MainDefault.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
