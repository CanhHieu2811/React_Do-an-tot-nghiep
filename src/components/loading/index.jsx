// import PropTypes from 'prop-types';

import { Box, CircularProgress } from '@mui/material';
// import { NAV } from 'src/utils/constant';
import { useSelector } from 'react-redux';

export default function LoadingComponent() {
  const loading = useSelector((state) => state.common.loadingPages);
  return (
    <>
      {loading && (
        <Box className="circular-progress">
          <Box className="loading">
            <CircularProgress />
          </Box>
        </Box>
      )}
    </>
  );
}

LoadingComponent.propTypes = {
  // children: PropTypes.node,
  // loading: PropTypes.bool,
};
