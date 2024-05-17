// export { reducer, namespace, commonSelector } from "./reducer";
import { createSlice } from '@reduxjs/toolkit';

const namespace = 'common';

const initialState = {
  loading: false,
  defaultLanguage: "vn",
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
    data: null
  },
  isPopup: false,
  equalForm: true,
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
      confirmDialog: {
        show: action.payload.show,
        url: action.payload.url,
        title: action.payload.title,
        content: action.payload.content,
        data: action.payload.data
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
      defaultLanguage: action.payload
    })
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
  setLanguage
} = slice.actions;

export default slice.reducer;
