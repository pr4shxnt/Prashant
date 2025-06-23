import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  blogData: {
    title: "",
    authors: "",
    content: "",
    tags: [],
    coverImage: "",
    researchId: "",
    metaTitle: "",
    metaDescription: "",
  },
  blogs: [],
  blog: {},
};

export const createBlog = createAsyncThunk(
  "blogs/fetchAll",
  async (blogData, ThunkAPI) => {
    try {
      const formData = new FormData();

      Object.entries(blogData).forEach(([key, value]) => {
        if (key !== "coverImage") formData.append(key, value);
      });

      formData.append("images", file);

      const token = localStorage.getItem("admin_session");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api`,
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
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Blogs Fetch by Id Failed"
      );
    }
  }
);

export const fetchBlogByResearchId = createAsyncThunk(
  "blogs/fetchAll",
  async (researchId, ThunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/${researchId}`
      );
      return response.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Blogs Fetch by Id Failed"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogByResearchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogByResearchId.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogByResearchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
