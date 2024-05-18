import Axios from 'axios';
// import { redirect, useNavigate, create } from 'react-router-dom';

// import { PATH } from 'src/routes/constant';
// import globalRouter from 'src/routes/globalRouter';

import store from 'src/store';
// import { setLogout } from 'src/redux/auth';
import { setLoading, setLoadingPage, setNotification } from 'src/redux/common';

import {
  METHOD_GET,
  TOKEN_NAME,
  STATUS_404,
  STATUS_422,
  STATUS_401,
  METHOD_POST,
  METHOD_DELETE,
} from './constant';

Axios.interceptors.response.use(
  (response) => {
    if (response) {
      if (response.data.statusCode === STATUS_422) {
        store.dispatch(
          setNotification({
            show: true,
            message: response.data?.message,
            status: 'error',
          })
        );
      }
    }

    return response;
  },
  (error) => {
    // if (error.response.status === 400) {
    //   store.dispatch(
    //     setNotification({
    //       isShow: true,
    //       message: error.response.data.message ?? error.message,
    //       status: 'error',
    //     })
    //   );
    // }
    if (error.response.status === STATUS_401) {
      // store.dispatch(setUnauthorized(true));
    }

    if (error.response.status === STATUS_404) {
      // globalRouter.navigate(PATH.NOTFOUND)
    }
    console.log(12312321, error);
    store.dispatch(
      setNotification({
        show: true,
        message: error.response.data.message ?? error.message,
        status: 'error',
      })
    );
    return error.response;
  }
);

async function defaultGet(endpoint) {
  const data = await Axios({
    method: METHOD_GET,
    url: endpoint,
  });
  return data;
}

export async function getData({ url, onSuccess }) {
  store.dispatch(setLoading(true));
  try {
    const res = await defaultGet(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
    // store.dispatch(
    //   setNotification({
    //     show: true,
    //     message: 'Lỗi hệ thống',
    //     status: 'error',
    //   })
    // );
  } finally {
    store.dispatch(setLoading(false));
  }
}

export async function authGet(endpoint) {
  const token = localStorage.getItem(TOKEN_NAME);
  const data = await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: METHOD_GET,
    url: endpoint,
  });

  return data;
}

export async function authGetData({ url, onSuccess }) {
  store.dispatch(setLoading(true));
  try {
    const res = await authGet(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
    // console.log(12321, err);
    // store.dispatch(
    //   setNotification({
    //     show: true,
    //     message: 'Lỗi hệ thống',
    //     status: 'error',
    //   })
    // );
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}

async function defaultPost(endpoint, method, payload) {
  const body = {};
  Object.keys(payload).forEach((key) => {
    body[key] = payload[key];

    if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
      body[key] = payload[key];
    }
    return null;
  });
  return Axios({
    headers: {},
    method,
    url: endpoint,
    data: body,
  });
}

export async function postPutData({ url, payload, method = METHOD_POST, onSuccess }) {
  store.dispatch(setLoading(true));
  try {
    const res = await defaultPost(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
    // store.dispatch(
    //   setNotification({
    //     show: true,
    //     message: 'Lỗi hệ thống',
    //     status: 'error',
    //   })
    // );
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}

async function authPostPut(endpoint, method, payload) {
  const token = localStorage.getItem(TOKEN_NAME);
  const body = {};
  Object.keys(payload).forEach((key) => {
    if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
      body[key] = payload[key];
    }
    return {};
  });
  return Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    url: endpoint,
    data: body,
  });
}

export async function authPostPutData({ url, method, payload, onSuccess }) {
  store.dispatch(setLoading(true));
  try {
    const res = await authPostPut(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
    // store.dispatch(
    //   setNotification({
    //     show: true,
    //     message: 'Lỗi hệ thống',
    //     status: 'error',
    //   })
    // );
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}

async function authDelete(endpoint, body) {
  const token = localStorage.getItem(TOKEN_NAME);
  return Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: METHOD_DELETE,
    url: endpoint,
    data: body,
  });
}

export async function startDelete({ url, payload, onSuccess }) {
  store.dispatch(setLoading(true));
  try {
    const res = await authDelete(url, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
    // store.dispatch(
    //   setNotification({
    //     show: true,
    //     message: 'Lỗi hệ thống',
    //     status: 'error',
    //   })
    // );
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}

async function authFileForm(method, url, formData) {
  const token = localStorage.getItem(TOKEN_NAME);

  return Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: 'multipart/form-data',
    },
    method,
    url,
    data: formData,
  });
}

export async function authPostFormDataLoading({ url, method, payload, onSuccess }) {
  store.dispatch(setLoading(true));

  const body = {};

  Object.keys(payload).forEach((key) => {
    if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
      body[key] = payload[key];
    }
    return {};
  });
  const formData = new FormData();
  Object.keys(body).forEach((key) => formData.append(key, body[key]));

  if (body.imageFile) {
    formData.append('file', body.imageFile);
  }

  try {
    const res = await authFileForm(method, url, formData);

    if (res && res.data) {
      onSuccess(res);
    }
  } catch (err) {
    // store.dispatch(
    //   setNotification({
    //     show: true,
    //     message: 'Lỗi hệ thống',
    //     status: 'error',
    //   })
    // );
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}

export async function authPostFormData(endpoint, method, payload) {
  const token = localStorage.getItem(TOKEN_NAME);
  const body = {};

  Object.keys(payload).forEach((key) => {
    if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
      body[key] = payload[key];
    }
    return {};
  });
  const formData = new FormData();
  Object.keys(body).forEach((key) => formData.append(key, body[key]));

  if (body.imageFile) {
    formData.append('file', body.imageFile);
  }

  return Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: 'multipart/form-data',
    },
    method,
    url: endpoint,
    data: formData,
  });
}

export async function authPostFileData({ url, method, payload, onSuccess }) {
  store.dispatch(setLoading(true));
  try {
    const res = await authPostFormData(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
    // console.log(12321, err);
    // store.dispatch(
    //   setNotification({
    //     show: true,
    //     message: 'Lỗi hệ thống',
    //     status: 'error',
    //   })
    // );
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}

export function getFileName(response) {
  let filename = '';
  const disposition = response.headers['content-disposition'];
  if (disposition && disposition.indexOf('filename') !== -1) {
    const filenameRegex = /UTF-8(.*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
    }
  }
  return filename;
}
export async function downloadFile({ endpoint }) {
  store.dispatch(setLoading(true));
  const token = localStorage.getItem(TOKEN_NAME);
  try {
    const res = await Axios({
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
      method: 'GET',
      url: endpoint,
    });

    const fileName = getFileName(res);
    if (res && res.data && res.status === 200) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'template.xlsx');
      document.body.appendChild(link);
      link.click();
    }
    if (res && res.data && res.status === 422) {
      store.dispatch(
        setNotification({
          show: true,
          message: `Hãy nhập đủ điều kiện tìm kiếm`,
          status: 'error',
        })
      );
    }
    if (fileName === '') {
      const resTypeText = await Axios({
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        url: endpoint,
      });
      store.dispatch(
        setNotification({
          show: true,
          message: resTypeText?.data?.message,
          status: 'success',
        })
      );
    }
  } catch (err) {
    /* empty */
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}

export async function downloadFilePostData({ endpoint, query, method = 'POST' }) {
  store.dispatch(setLoading(true));
  const token = localStorage.getItem(TOKEN_NAME);
  try {
    const res = await Axios({
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
      method,
      url: endpoint,
      data: query,
    });
    const fileName = getFileName(res);
    if (res && res.data && res.status === 200) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'template.xlsx');
      document.body.appendChild(link);
      link.click();
    }
  } catch (err) {
    /* empty */
    store.dispatch(setLoadingPage(false));
  } finally {
    store.dispatch(setLoading(false));
    store.dispatch(setLoadingPage(false));
  }
}
