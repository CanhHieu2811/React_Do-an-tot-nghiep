/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useLocation } from 'react-router-dom';

import CommonLayout from 'src/template';
import LayoutAdmin from 'src/layouts/admin';
import LayoutDefault from 'src/layouts/default';

// eslint-disable-next-line import/extensions
import { routerData } from './router.js';
import { PATH, PAGELAYOUT } from './constant';
// eslint-disable-next-line import/extensions
import { useRouter } from './hooks/use-router.js';

// export const LoginPages = lazy(() => import('src/pages/login'));
// export const RegisterPages = lazy(() => import('src/pages/register'));
// export const IndexPage = lazy(() => import('src/pages/app'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));

// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));

export default function Router() {
  const [routes, setRouters] = useState([]);
  const location = useLocation();
  const router = useRouter();
  const { token, isAuthencated, isLogout } = useSelector((state) => state.auth);
  useEffect(() => {
    const route = [];
    const layoutAdmin = {
      path: PATH.ADMIN,
      element: (
        <PrivateRoute
          isAuthencated={isAuthencated}
          token={token}
          logout={isLogout}
          currentPath={location}
        >
          <LayoutAdmin>
            <Suspense>
              <Outlet />
            </Suspense>
          </LayoutAdmin>
        </PrivateRoute>
      ),
      children: [],
    };
    const layoutDefault = {
      path: PATH.DASHBOARD,
      element: (
        <LayoutDefault>
          <Suspense>
            <Outlet />
          </Suspense>
        </LayoutDefault>
      ),
      children: [],
    };
    routerData.forEach(
      ({ parent, component: Component, helmetTitle, pathName, dashboard }, index) => {
        const component = (
          <CommonLayout title={helmetTitle} key={index}>
            <Component />
          </CommonLayout>
        );
        if (!parent) {
          route.push({
            path: pathName,
            element: component,
          });
        } else if (parent === PAGELAYOUT.ADMIN) {
          if (dashboard) {
            layoutAdmin.children.push({ element: component, index: true });
          } else {
            layoutAdmin.children.push({ path: pathName, element: component });
          }
        } else if (parent === PAGELAYOUT.DASHBOARD) {
          if (dashboard) {
            layoutDefault.children.push({ element: component, index: true });
          } else {
            layoutDefault.children.push({ path: pathName, element: component });
          }
        }
      }
    );
    route.push(layoutAdmin);
    route.push(layoutDefault);
    setRouters(route);

    if (isAuthencated) {
      if (location.pathname === PATH.LOGIN) router.push(PATH.DASHBOARD)
    } 
  }, [isAuthencated, isLogout, location, router, token]);
  
  return useRoutes(routes);
}

function PrivateRoute({ children, isAuthencated, currentPath, logout }) {
  if (!isAuthencated) {
    localStorage.setItem('previousSearchQuery', currentPath.search);
  }
  if (logout) localStorage.setItem('previousAccessLink', '');
  else localStorage.setItem('previousAccessLink', currentPath.pathname);
  return isAuthencated ? children : <Navigate to={PATH.LOGIN} />;
}

PrivateRoute.propTypes = {
  isAuthencated: PropTypes.bool,
  currentPath: PropTypes.object,
  logout: PropTypes.bool,
  children: PropTypes.node,
};

// api user = list tất cả các user. set cái list = rows ni vào 1 cái props mô đó sẽ xuất hiện ra trên màn hình