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


export const addNewEducation = createAsyncThunk(
    'resume/create-education' ,
    async(educationData, ThunkAPI)=>{
        try {
            const formData = new FormData();

            Object.entries(educationData).forEach(([key, value])=>{
                        formData.append(key, value);
            })

            const token = localStorage.getItem('admin_session')
            const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/resume/create-education`,
                formData, {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            
        }
    }
)