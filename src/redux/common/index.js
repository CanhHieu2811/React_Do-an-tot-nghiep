// export { reducer, namespace, commonSelector } from "./reducer";
import { createSlice } from '@reduxjs/toolkit';

const namespace = 'common';

const initialState = {
  loading: false,
  loadingPages: false,
  defaultLanguage: 'vn',
  fetchData: false,
  noti: {
    show: false,
    message: null,
    // success | info | warning | error
    status: 'error',
  },
  dialog: {
    show: false,
    url: null,
    title: null,
    content: null,
    data: null,
    multiple: null,
    maxWidthDialog: null,
    onHandleAgree: null,
  },
  isPopup: false,
  equalForm: true,
  showNav: true,
};

const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    getLoading: (state) => ({
      ...state,
    }),
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setLoadingPage: (state, action) => ({
      ...state,
      loadingPages: action.payload,
    }),
    setNotification: (state, action) => ({
      ...state,
      noti: action.payload,
    }),
    setPopup: (state, action) => ({
      ...state,
      isPopup: action.payload,
    }),
    setConfirmDialog: (state, action) => ({
      ...state,
      dialog: {
        show: action.payload.show,
        url: action.payload.url,
        title: action.payload.title,
        content: action.payload.content,
        data: action.payload.data,
        multiple: action.payload.multiple,
        maxWidthDialog: action.payload.maxWidthDialog,
        onHandleAgree: action.payload.onHandleAgree,
      },
    }),
    setFetchData: (state, aciton) => ({
      ...state,
      fetchData: aciton.payload,
    }),
    setEqualForm: (state, action) => ({
      ...state,
      equalForm: action.payload,
    }),
    setLanguage: (state, action) => ({
      ...state,
      defaultLanguage: action.payload,
    }),
    setResetOnLoad: (state) => ({
      ...state,
      loading: false,
      fetchData: false,
      noti: {
        show: false,
        message: null,
        // success | info | warning | error
        status: null,
      },
      dialog: {
        show: false,
        url: null,
        title: null,
        content: null,
        data: null,
      },
      isPopup: false,
      equalForm: true,
    }),
    setShowNav: (state, action) => ({
      ...state,
      showNav: action.payload,
    }),
  },
});
// export const { reducer } = slice;

export const {
  getLoading,
  setLoading,
  setNotification,
  setPopup,
  setConfirmDialog,
  setFetchData,
  setEqualForm,
  setLanguage,
  setResetOnLoad,
  setShowNav,
  setLoadingPage,
} = slice.actions;

export default slice.reducer;
