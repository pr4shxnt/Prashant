import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    clientData:{
        name: "",
        username: "",
        password: "",
        email:"",
    },
    loading: false,
    error: null,
    message: "",
}

export const registerClient = createAsyncThunk(
    "register/client",
    async(clientData, ThunkAPI) =>{
        try {
            const token = localStorage.getItem('admin_session')
        const response = await axios.post(`${import.meta.env.VITE_BACKEND}/clients`,
            clientData,
            {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
        )

        return response.data;
        } catch (error) {
            return ThunkAPI.rejectWithValue(error.data?.message || "Client registration failed.")
        }
    }
    
)

const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerClient.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerClient.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
        })
        .addCase(registerClient.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

    }
})