import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const tokenFromStorage = localStorage.getItem("admin_session");

export const isTokenExpired = (jwtToken) => {
  try {
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    const currentTime = Date.now() / 1000;
    if(payload.exp < currentTime){
            localStorage.removeItem("admin_session");
    }
    return payload.exp < currentTime;
  } catch {
    localStorage.removeItem("admin_session");
    return true;
  }
};

const initialState = {
  isAdminAuthenticated:
    (tokenFromStorage && !isTokenExpired(tokenFromStorage)) || false,
  token: tokenFromStorage || null,
  adminData: {
    cred: "",
    password: "",
  },
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (adminData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/login`,
        adminData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutAdmin = () => {
  localStorage.removeItem("admin_session");
  window.location.href = "/";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.isAdminAuthenticated = false;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isAdminAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem("admin_session", action.payload.token);
        state.adminData = initialState.adminData;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAdminAuthenticated = false;
        state.token = null;
        state.adminData = initialState.adminData;
      });
  },
});

export const { setAdminData } = authSlice.actions;
export default authSlice.reducer;
