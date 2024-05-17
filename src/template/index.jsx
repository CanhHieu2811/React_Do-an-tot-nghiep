import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, CircularProgress } from '@mui/material';

import SnackbarComponent from 'src/components/snack-bar';

export default function CommonLayout(props) {
  const { title, children } = props;
  const { t } = useTranslation()
  const loading = useSelector(state => state.common.loading);
  return (
    <>
      <Helmet>
        <title> {title ? t(title) : t("helmet.default")} </title>
      </Helmet>

      <SnackbarComponent />
      <Box sx={{ display: loading ? "block" : "none" }} className="circular-progress">
        <Box className="loading">
          <CircularProgress />
        </Box>
        
      </Box>
      {children}
    </>
  );
}

CommonLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
