
// ----------------------------------------------------------------------
export const { VITE_REACT_APP_API_MASTERDATA, VITE_REACT_APP_API_AUTHEN } = import.meta.env
export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  WIDTH: 280,
};

export const STATUS_200 = 200;
export const STATUS_400 = 400;
export const STATUS_401 = 401;
export const STATUS_404 = 404;
export const STATUS_500 = 500;

export const METHOD_GET = 'get';
export const METHOD_POST = 'post';
export const METHOD_PUT = 'put';
export const METHOD_DELETE = 'delete';
export const TOKEN_NAME = 'token_name';
export const INDEX = 1;
export const PAGE_INDEX = 1;
export const PAGE_SIZE = 20;

export const ORDER_BY = "orderBy";
export const ORDER_BY_DESC= "orderByDesc"

export const phoneRegExp = /^[0-9\- ]{10,14}$/