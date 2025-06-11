import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    educationData:
         {
         Institution:"",
         Level: "",
         Field:"",
         Address:"",
         Website:"",
         Grade:"",
         From:"",
         To:""
    },
    loading: false,
    error: null,
    educations: []
}


export const addEducation = createAsyncThunk(
    'resume/create-education' ,
    async(educationData, ThunkAPI)=>{
        try {
            const formData = new FormData();
            
            Object.entries(educationData).forEach(([key, value])=>{
                        formData.append(key, value);
            })

            const token = localStorage.getItem('admin_session')
            const res = await axios.post(`${import.meta.env.VITE_BACKEND}/api/resume/create-education`,
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization : `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            return ThunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create education block")  
        }
    }
)

export const fetchAllEducation = createAsyncThunk(
    "resume/fetch-education",
    async (_, ThunkAPI)=>{
        try {
           
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/resume/education`);
    return response.data;

        } catch (error) {
          return ThunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch education block")  
        }
    }
)


const educationSlice = createSlice({
    name: "educations",
    initialState,
    reducers: {
    setEducationData: (state, action) => {
      state.educationData = action.payload;
    }},
    extraReducers: (builder) =>{
            builder
            .addCase(addEducation.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(addEducation.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
            })
            .addCase(addEducation.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllEducation.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEducation.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.educations = action.payload;
            })
            .addCase(fetchAllEducation.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
        }
})


export const {setEducationData} = educationSlice.actions;
export default educationSlice.reducer;