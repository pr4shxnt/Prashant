import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    projects: [],
    project: null,
    loading: false,
    error: null,
};

// Fetch all projects
export const fetchProjects = createAsyncThunk(
    "clientProjects/fetchAll",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("admin_session");
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND}/client/projects`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch projects"
            );
        }
    }
);

// Create a new project
export const createProject = createAsyncThunk(
    "clientProjects/create",
    async (projectData, thunkAPI) => {
        try {
            const formData = new FormData();
            const token = localStorage.getItem("admin_session");
            Object.entries(projectData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND}/client/projects/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Project creation failed"
            );
        }
    }
);

const clientProjectsSlice = createSlice({
    name: "clientProjects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create project
            .addCase(createProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default clientProjectsSlice.reducer;
