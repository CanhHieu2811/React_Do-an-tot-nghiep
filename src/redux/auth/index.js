// export { reducer, namespace, commonSelector } from "./reducer";
import { createSlice } from '@reduxjs/toolkit';

const namespace = 'auth';

const initialState = {
  token: null,
  isAuthencated: false,
  isLogout: false,
  user: {}
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
    }),
    setLogout: (state) => ({
      ...state,
      isLogout: true,
      isAuthencated: false,
      user: {},
      token: null,
    }),
    
  },
});
// export const { reducer } = slice;

export const { setAuth, setLogout } = slice.actions;

export default slice.reducer;
