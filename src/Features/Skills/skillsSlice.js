import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    skillData: {
    name: "",
    imageInfo: "",
    link: "",
    description: "",
    },
    skills: [],
    loading: false,
    error: null,
};

 
export const createNewSkill = createAsyncThunk(
    'skills/create',
    async ({skillData, file}, thunkAPI) =>{
        try {
            const formData = new FormData();

            Object.entries(skillData).forEach(([key, value])=>{
                if (key !== 'imageInfo') formData.append(key, value)
            });

            formData.append('image', file);

            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/skills`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Skill block creation failed");
        }
    }
);


export const fetchAllSkills = createAsyncThunk(
    'skills/fetch',
    async(_, thunkAPI) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/skills`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Fetching skills Data failed");
        }
    }
);



export const deleteSkillById = createAsyncThunk(
    'skills/delete',
    async(id, thunkAPI) => {
        try {
            const token = localStorage.getItem('admin_session')

            const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/api/skills/${id}`,{
                    headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            )
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "error deleting the skills block")
        }
    }
)

const skillSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        setSkillData: (state, action) => {
            state.skillData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewSkill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewSkill.fulfilled, (state)=>{
                state.skillData = initialState.skillData;
                state.loading = false;
            })
            .addCase(createNewSkill.rejected, (state, action)=>{
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSkills.fulfilled, (state, action)=> {
                state.loading = false;
                state.skills = action.payload
            })
            .addCase(fetchAllSkills.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteSkillById.fulfilled, (state, action)=> {
                state.loading = false;
                state.skills = action.payload
            })
            .addCase(deleteSkillById.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const {setSkillData} = skillSlice.actions;
export default skillSlice.reducer