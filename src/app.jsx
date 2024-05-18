import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';
import AlertDialog from 'src/components/dialog-confirm';
import { setPopup, setResetOnLoad } from './redux/common';
import SnackbarComponent from './components/snack-bar';
import RouterSections from './routes/section';
import LoadingComponent from './components/loading';

export default function App() {
  useScrollToTop();
  const dispatch = useDispatch();
  const equalForm = useSelector((state) => state.common.equalForm);
  const onUnload = useCallback(
    (e) => {
      if (equalForm) {
        dispatch(setPopup(false));
        return;
      }
      e.returnValue = true;
    },
    [dispatch, equalForm]
  );
  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [onUnload]);

  window.onload = () => {
    dispatch(setResetOnLoad());
    // dispatch(resetBDL());
    dispatch(setPopup(false));
  };

  return (
    <ThemeProvider>
      <SnackbarComponent />
      <AlertDialog />
      <RouterSections />
      <LoadingComponent />
    </ThemeProvider>
  );
}
