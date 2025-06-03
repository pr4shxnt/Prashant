import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    poemData: {
        title: "",
        author: "",
        audioFile: null,
        imageFile: null,
        releaseDate: ""
    },
    poems: [],
    loading: false,
    error: null,
}


export const uploadNewPoem = createAsyncThunk(
  "poem/create",
  async ({ poemData, audioFile, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      const token = localStorage.getItem('admin_session')

      Object.entries(poemData).forEach(([key, value]) => {
        if (key !== "audioFile" && key !== "imageFile") {
          formData.append(key, value);
        }
      });

      if (imageFile) formData.append("imageFile", imageFile);
      if (audioFile) formData.append("audioFile", audioFile);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/poems`, 
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
        error.response?.data?.message || "Poem upload failed"
      );
    }
  }
);


export const fetchAllPoems = createAsyncThunk(
    'poems/fetch',
    async(_, thunkAPI) =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/poems`);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "failed to fetch poems"
            )
        }
    }
)


const poemSlice = createSlice({
    name: 'poems',
    initialState,
    reducers: {
        setPoemData: (state, action) =>{
            state.poemData = action.payload;
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(uploadNewPoem.pending, (state) =>{
            state.loading = true;
        })
        .addCase(uploadNewPoem.fulfilled, (state) =>{
            state.loading = false;
        })
        .addCase(uploadNewPoem.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchAllPoems.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchAllPoems.fulfilled, (state, action)=>{
            state.loading = false;
            state.poems = action.payload;
        })
        .addCase(fetchAllPoems.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})


export const {setPoemData} = poemSlice.actions;
export default poemSlice.reducer;