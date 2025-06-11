import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    experienceData:{
            role: "",
            company: "",
            startingDate: "",
            endDate: "",
            description: "",
            companyEmail: "",
            companySite: "",
            companyPhone: "",
            companyAddress: "",
        },
    loading: false,
    error: null,
    experiences: []
}

export const addExperience = createAsyncThunk(
    "resume/create-experience",
    async (experienceData, ThunkAPI)=>{
        try {
            
            const formData = new FormData();

            Object.entries(experienceData).forEach(([key, value]) => {
                 formData.append(key, value);
            });

            const token = localStorage.getItem('admin_session');

            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/resume/create-experience`,
               formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }       
    );
    return response.data;

        } catch (error) {
          return ThunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create experience block")  
        }
    }
)

export const fetchAllExperience = createAsyncThunk(
    "resume/fetch-experience",
    async (_, ThunkAPI)=>{
        try {
           
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/resume/experience`);
    return response.data;

        } catch (error) {
          return ThunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch experience block")  
        }
    }
)



const experienceSlice = createSlice({
    name: "experiences",
    initialState,
    reducers: {
    setExperienceData: (state, action) => {
      state.experienceData = action.payload;
    }},
    extraReducers: (builder) =>{
        builder
        .addCase(addExperience.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addExperience.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
        })
        .addCase(addExperience.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchAllExperience.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllExperience.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.experiences = action.payload;
        })
        .addCase(fetchAllExperience.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {setEperienceData} = experienceSlice.actions;
export default experienceSlice.reducer;