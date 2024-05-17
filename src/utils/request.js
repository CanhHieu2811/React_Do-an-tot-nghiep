import Axios from 'axios';
// import { redirect, useNavigate, create } from 'react-router-dom';

// import { PATH } from 'src/routes/constant';
// import globalRouter from 'src/routes/globalRouter';

import store from 'src/store';
import { setLogout } from 'src/redux/auth';
import { setLoading, setNotification } from 'src/redux/common';

import {
  METHOD_GET,
  TOKEN_NAME,
  STATUS_404,
  STATUS_401,
  METHOD_POST,
  METHOD_DELETE,
} from './constant';

Axios.interceptors.response.use(
  (response) => {
    if (response) {
      console.log(1, response);
      // if (response.status === STATUS_404) {
      //   console.log(response);
      //   // return redirect('/');
      // }
    }

    return response;
  },
  (error) => {
    console.log(3, error);
    //
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
      store.dispatch(setLogout());
    }

    if (error.response.status === STATUS_404) {
      // globalRouter.navigate(PATH.NOTFOUND)
    }

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
    /* empty */
  } finally {
    store.dispatch(setLoading(false));
  }
}

export async function authGet(endpoint) {
  const token = localStorage.getItem(TOKEN_NAME);
  const data = await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browesr-warning": "true"  
    },
    ContentType: 'text/plain',
    method: METHOD_GET,
    url: endpoint,
  });

  return data;
}

export async function authGetData({ url, onSuccess, onFailure }) {
  store.dispatch(setLoading(true));
  try {
    const res = await authGet(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
    if (onFailure) {
      onFailure(err);
    } else {
      // Xử lý lỗi mặc định nếu không có onFailure được cung cấp
      console.error("Đã xảy ra lỗi:", err);
    }
  } finally {
    store.dispatch(setLoading(false));
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
    headers: {
      "Content-Type": "application/json-patch+json",
      "ngrok-skip-browesr-warning": "true"  
    },
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
    //     isShow: true,
    //     message: err?.message,
    //     status: 'error',
    //   })
    // );
  } finally {
    store.dispatch(setLoading(false));
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
    //     isShow: true,
    //     message: err?.message,
    //     status: 'error',
    //   })
    // );
  } finally {
    store.dispatch(setLoading(false));
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
    //     isShow: true,
    //     message: err?.message,
    //     status: 'error',
    //   })
    // );
  } finally {
    store.dispatch(setLoading(false));
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
  } catch (err) { /* empty */ } finally {
    store.dispatch(setLoading(false));
  }
}
