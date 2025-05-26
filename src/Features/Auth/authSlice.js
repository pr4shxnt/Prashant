import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAdminAuthenticated: false,
    token: localStorage.getItem("admin_session") || null,
    adminData: {
        cred: "",
        password: "",
    },
    loading: false,
    error: null,
}


export const loginAdmin = createAsyncThunk(
    'auth/login',
    async (adminData, thunkAPI)=>{
        try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/admin/login`,
        adminData
      );
      return response.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAdminData: (action, state) => {
            state.adminData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state)=>{
                state.loading = true;
                state.error = false;
                state.isAdminAuthenticated = false;
            })
            .addCase(loginAdmin.fulfilled, (state, action)=>{
                state.isAdminAuthenticated = true;
                state.token = action.payload.token;
                state.adminData = initialState.adminData;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action)=>{
                state.error = action.payload;
                state.loading = fasle;
                state.isAdminAuthenticated = false;
                state.token = null;
                state.adminData = initialState.adminData;
            })
    }
})

export const { setAdminData } = authSlice.actions;
export default authSlice.reducer;