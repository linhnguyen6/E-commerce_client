import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as loginUser,
} from "firebase/auth";
import toastr from "toastr";
import { AUTH_ERROR_CORE } from "../utils";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk("auth/register", async (data) => {
  return await createUser(auth, data.email, data.password);
});

export const login = createAsyncThunk("auth/login", async (data) => {
  return await loginUser(auth, data.email, data.password);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      toastr.success("Register Successfully");
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.code;
      toastr.error(AUTH_ERROR_CORE[state.error]);
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.code;
      toastr.error(AUTH_ERROR_CORE[state.error]);
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
