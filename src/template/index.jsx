import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
//
import { useTranslation } from 'react-i18next';

// import { Box, CircularProgress } from '@mui/material';
import ScrollTopComponent from 'src/components/scroll-top';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PATH } from 'src/routes/constant';
import { useNavigate } from 'react-router-dom';

export default function CommonLayout(props) {
  const { title, children } = props;
  const { t } = useTranslation();
  const unauthorized = useSelector((state) => state.auth.unauthorized);
  const navigate = useNavigate();

  const usePageTitle = (titleHelmet) => {
    const defaultTitle = t('helmet.default');

    useEffect(() => {
      document.title = titleHelmet || defaultTitle;
    }, [defaultTitle, titleHelmet]);
  };

  useEffect(() => {
    if (unauthorized) {
      navigate(PATH.NOTROLES);
    }
  }, [navigate, unauthorized]);

  return (
    <>
      {usePageTitle(t(title))}
      {children}

      <ScrollTopComponent />
    </>
  );
}

CommonLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};
