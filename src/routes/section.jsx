import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useLocation } from 'react-router-dom';
import CommonLayout from 'src/template';
// import LayoutDefault from 'src/layouts/default';
import LayoutAdmin from 'src/layouts/admin';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PATH } from './constant';

const TrangChuPages = lazy(() => import('src/pages/admin/trang-chu'));
const LoginPages = lazy(() => import('src/pages/dang-nhap'));
const RegisterPages = lazy(() => import('src/pages/dang-ky'));
const Page404 = lazy(() => import('src/pages/khong-tim-thay'));
const NguoiDungPages = lazy(() => import('src/pages/admin/nguoi-dung'));
const TramPages = lazy(() => import('src/pages/admin/tram'));
const XePages = lazy(() => import('src/pages/admin/xe-dap'));
const ThongTinThueXePages = lazy(() => import('src/pages/admin/thong-tin-thue-xe'));
const ThanhToanPages = lazy(() => import('src/pages/admin/thanh-toan'));
const BannerWebPages = lazy(() => import('src/pages/admin/banner/web'));
const BannerMobilePages = lazy(() => import('src/pages/admin/banner/mobile'));
const XeGiaThuePages = lazy(() => import('src/pages/admin/xe-gia-thue'));
const TinTucSuKienTrangChuPage = lazy(() => import('src/pages/tin-tuc-su-kien'));
const DanhSachTramXePages = lazy(() => import('src/pages/tram-xe'));
const TinTucSuKienPage = lazy(() => import('src/pages/admin/tin-tuc-su-kien'));

export default function RouterSections() {
  const { isAuthencated } = useSelector((state) => state.auth);
  const location = useLocation();

  const routes = [
    {
      element: (
        // <LayoutDefault>
        <Suspense>
          <Outlet />
        </Suspense>
        // </LayoutDefault>
      ),
      children: [
        {
          element: (
            <CommonLayout title="helmet.default">
              <TrangChuPages />
            </CommonLayout>
          ),
          index: true,
        },
        {
          path: PATH.TIN_TUC_SU_KIEN,
          element: (
            <CommonLayout title="helmet.default">
              <TinTucSuKienTrangChuPage />
            </CommonLayout>
          ),
        },
        {
          path: PATH.TRAM_XE,
          element: (
            <CommonLayout title="helmet.default">
              <DanhSachTramXePages />
            </CommonLayout>
          ),
        },
      ],
    },
    {
      path: PATH.LOGIN,
      element: <LoginPages />,
    },
    {
      path: PATH.REGISTER,
      element: <RegisterPages />,
    },
    {
      path: PATH.NOTFOUND,
      element: <Page404 />,
    },
    {
      path: PATH.ALL,
      element: <Navigate to={PATH.NOTFOUND} replace />,
    },
    {
      element: (
        <PrivateRoute isAuthenticated={isAuthencated} currentPath={location}>
          <LayoutAdmin>
            <Suspense>
              <Outlet />
            </Suspense>
          </LayoutAdmin>
        </PrivateRoute>
      ),
      children: [
        {
          path: PATH.ADMIN + PATH.NEWS,
          element: (
            <CommonLayout title="helmet.tin_tuc_su_kien_pages">
              <TinTucSuKienPage />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.USERS,
          element: (
            <CommonLayout title="helmet.nguoi_dung_pages">
              <NguoiDungPages />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.STATION,
          element: (
            <CommonLayout title="helmet.tram_pages">
              <TramPages />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.BICYCLE,
          element: (
            <CommonLayout title="helmet.xe_pages">
              <XePages />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.INFO_CAR,
          element: (
            <CommonLayout title="helmet.thong_tin_thue_xe_pages">
              <ThongTinThueXePages />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.PAY,
          element: (
            <CommonLayout title="helmet.thanh_toan_pages">
              <ThanhToanPages />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.BANNER_WEB,
          element: (
            <CommonLayout title="helmet.banner_web_pages">
              <BannerWebPages />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.BANNER_MOBILE,
          element: (
            <CommonLayout title="helmet.banner_mobile_pages">
              <BannerMobilePages />
            </CommonLayout>
          ),
        },
        {
          path: PATH.ADMIN + PATH.CAR_PRICE,
          element: (
            <CommonLayout title="helmet.gia_thue_xe_pages">
              <XeGiaThuePages />
            </CommonLayout>
          ),
        },
      ],
    },
  ];

  return useRoutes(routes);
}

function PrivateRoute({ children, isAuthenticated, currentPath, logout }) {
  return children;
  // return children;
  // if (!isAuthenticated) {
  //   localStorage.setItem('previousAccess', currentPath.pathname);
  // }
  // return isAuthenticated ? children : <Navigate to={PATH.LOGIN} />;
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentPath: PropTypes.object,
  logout: PropTypes.bool,
  children: PropTypes.node,
};
