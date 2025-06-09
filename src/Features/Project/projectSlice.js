import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  projectData: {
    name: '',
    imagesInfo: [],
    technologies: '',
    github: '',
    live: '',
    date: '',
    status: '',
    description: '',
    token: localStorage.getItem('admin_session'),
  },
  projects: [],
  project: {},
  loading: false,
  error: null,
};

export const createNewProject = createAsyncThunk(
  'projects/create',
  async ({ projectData, files }, thunkAPI) => {
    try {
      const formData = new FormData();

      Object.entries(projectData).forEach(([key, value]) => {
        if (key !== 'imagesInfo') formData.append(key, value);
      });

      files.forEach((file) => formData.append('images', file));

      const token = projectData.token;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/projects/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Project creation failed'
      );
    }
  }
);

export const fetchAllProjects = createAsyncThunk(
  'project/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/projects`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch the projects data'
      );
    }
  }
);

export const fetchByProjectName = createAsyncThunk(
  'project/fetchById',
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/projects/${name}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch the project by ID'
      );
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewProject.fulfilled, (state) => {
        state.projectData = initialState.projectData;
        state.loading = false;
      })
      .addCase(createNewProject.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProjects.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchByProjectName.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchByProjectName.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.project = Array.isArray(action.payload)
          ? action.payload[0] || {}
          : action.payload || {};
      })
      .addCase(fetchByProjectName.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setProjectData } = projectSlice.actions;
export default projectSlice.reducer;
