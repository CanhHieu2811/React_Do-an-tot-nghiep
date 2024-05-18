// ----------------------------------------------------------------------
export const {
  VITE_REACT_APP_API_MASTER_DATA,
  VITE_REACT_APP_API_AUTHEN,
  VITE_REACT_APP_API_TIME_KEEPING,
  VITE_REACT_APP_API_SALARY,
} = import.meta.env;
export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 64,
  H_DESKTOP_OFFSET: 64 - 16,
};

export const NAV = {
  WIDTH: 280,
};

export const STATUS_200 = 200;
export const STATUS_400 = 400;
export const STATUS_401 = 401;
export const STATUS_404 = 404;
export const STATUS_422 = 422;
export const STATUS_500 = 500;

export const METHOD_GET = 'get';
export const METHOD_POST = 'post';
export const METHOD_PUT = 'put';
export const METHOD_DELETE = 'delete';
export const TOKEN_NAME = 'token_name';
export const PAGE_INDEX = 1;
export const PAGE_SIZE = 20;

export const ORDER_BY = 'orderBy';
export const ORDER_BY_DESC = 'orderByDesc';

export const phoneRegExp = /^[0-9\- ]{10,14}$/;
export const floatRegExp = /^(?=.*[1-9])\d*(?:\.\d+)?$/;
export const floatZeroRegExp = /^(?=.*[0-9])\d*(?:\.\d+)?$/;
export const intRexExp = /^\d+$/;
export const doubleRexExp = /^(?=.*[1-9])\d*(\.\d+)?$/;
export const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const websiteExp = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(?!.*\.\w{2,})$/;

export function formatNumberMoney(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
