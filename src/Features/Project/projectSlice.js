import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // assuming you're using axios

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
  loading: false,
  error: null,
};

export const createNewProject = createAsyncThunk(
  'projects/create',
  async ({ projectData, files }, thunkAPI) => {
    try {
      // Create form data to send files + project info
      const formData = new FormData();
      Object.entries(projectData).forEach(([key, value]) => {
        if (key !== 'imagesInfo') formData.append(key, value);
      });
      // Append actual files here
      files.forEach(file => formData.append('images', file));

      const token = projectData.token;
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/projects/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
      
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Project creation failed');
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
      });
  },
});

export const { setProjectData } = projectSlice.actions;
export default projectSlice.reducer;
