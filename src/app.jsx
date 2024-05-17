import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  useEffect, useCallback } from 'react';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';

// import { PATH } from './routes/constant';
// import { authGetData } from './utils/request';
import globalRouter from './routes/globalRouter';
// import { VITE_REACT_APP_API } from './utils/constant';
import { setPopup,  setEqualForm, setNotification, setConfirmDialog } from './redux/common';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isAuthencated = useSelector((state) => state.common.isAuthencated);
  // const equalForm = useSelector((state) => state.common.equalForm);
  // const [formEqual, setFormEqual] = useState(equalForm)

  // useEffect(() => {
  //   console.log(1232, formEqual)
  // }, [formEqual])
  const onLoad = useCallback((e) => {
    e.preventDefault();
    dispatch(setEqualForm(true))
    dispatch(setConfirmDialog({
      show: false,
      url: null,
      title: null,
      content: null,
      data: null
    }))
    dispatch(setPopup(false))
    dispatch(setNotification({
      show: false,
      url: null,
      title: null,
      content: null
    }))
  }, [dispatch])
  useEffect(() => {
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);

  }, [onLoad])

  // useEffect(() => 
  //   // eslint-disable-next-line consistent-return
  //   window.addEventListener("beforeunload", (event) => {
  //     if (!formEqual) return event.preventDefault();
  //   })
  // , [formEqual]);

  


  // gán navigate router
  useEffect(() => {
    globalRouter.navigate = navigate;
  }, [navigate]);

  // redirect previos link after login
  useEffect(() => {
    const previousLink = localStorage.getItem("previousAccessLink")

    if(previousLink) {
      navigate(previousLink)
      localStorage.setItem("previousAccessLink", "")
    }
  }, [navigate])

  // gọi api detail user khi ở trang chủ hoặc admin và đã đăng nhập
  // useEffect(() => {
  //   if (
  //     (location.pathname !== PATH.LOGIN &&
  //       location.pathname !== PATH.REGISTER &&
  //       location.pathname !== PATH.DASHBOARD) ||
  //     (location.pathname === PATH.DASHBOARD && isAuthencated)
  //   ) {
  //     authGetData({
  //       url: `${VITE_REACT_APP_API}/profile`,
  //       onSuccess: (res) => {
  //         // check quyền hoặc có quyền
  //         // nếu không có quyền
  //         // redirect login
  //         // có quyền thì set store ngôn ngữ mặc định, user authen,...
  //       },
  //     });
  //   }
  // }, [isAuthencated, location.pathname]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
