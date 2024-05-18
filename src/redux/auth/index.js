// export { reducer, namespace, commonSelector } from "./reducer";
import { createSlice } from '@reduxjs/toolkit';

const namespace = 'auth';

const initialState = {
  token: null,
  isAuthencated: false,
  isLogout: false,
  user: {},
  linkPrev: null,
};

const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setAuth: (state, action) => ({
      ...state,
      token: action.payload.token,
      user: action.payload.user,
      isAuthencated: true,
      isLogout: false,
    }),
    setLogout: (state) => ({
      ...state,
      isLogout: true,
      isAuthencated: false,
      user: {},
      token: null,
    }),
    setUserAuth: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    setLinkPrev: (state, action) => ({
      ...state,
      linkPrev: action.payload,
    }),
  },
});
// export const { reducer } = slice;

export const { setAuth, setLogout, setUserAuth, setLinkPrev } = slice.actions;

export default slice.reducer;
