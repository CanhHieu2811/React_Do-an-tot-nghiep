import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Box, CircularProgress } from '@mui/material';

export default function LoadingComponent({ children }) {
  const loading = useSelector((state) => state.common.loading);

  const renderLoading = useCallback(
    () =>
      loading ? (
        <Box
          sx={{
            position: 'absolute',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            zIndex: 999,
            background: '#fff',
            opacity: '0.5',
            left: '50%',
          }}
        >
          <CircularProgress variant="plain" />
        </Box>
      ) : (
        children
      ),
    [children, loading]
  );
  return <>{renderLoading()}</>;
}

LoadingComponent.propTypes = {
  children: PropTypes.node,
};
