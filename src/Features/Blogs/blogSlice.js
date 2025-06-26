import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import LatestBlog from "../../Components/BlogPage/LatestBlog";

const initialState = {
  loading: false,
  error: null,
  blogData: {
    title: "",
    slug: "",
    authors: "",
    content: "",
    tags: [],
    coverImage: "",
    Slug: "",
    researchLink: "",
    metaTitle: "",
    metaDescription: "",
  },
  blogs: [],
  blog: {},
  latestBlog: {},
  recommended: [],
};

export const createBlog = createAsyncThunk(
  "blogs/create",
  async (blogData, ThunkAPI) => {
    try {
      const formData = new FormData();

      Object.entries(blogData).forEach(([key, value]) => {
        if (key === "coverImage") {
          formData.append("coverImage", value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      });

      console.log(blogData);

      const token = localStorage.getItem("admin_session");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/blogs`,
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
        error.response?.data?.message || "Blog creation failed"
      );
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBySlug",
  async (slug, ThunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/blogs/slug/${slug}`
      );
      return response.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Blog fetch by ID failed"
      );
    }
  }
);
export const fetchLatestBlog = createAsyncThunk(
  "blogs/fetchLatest",
  async (_, ThunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/blogs/latest`
      );
      return response.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Latest Blog fetch failed"
      );
    }
  }
);
export const fetchRecommendedBlogs = createAsyncThunk(
  "blogs/fetchRecommended",
  async ({ tags, excludeId }, ThunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/blogs/recommended?tags=${tags.join(
          ","
        )}&excludeId=${excludeId}`
      );
      return response.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Recommended Blogs fetch failed"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogData: (state, action) => {
      state.blogData = {
        ...state.blogData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogData = initialState.blogData;
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLatestBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.latestBlog = action.payload;
        state.error = null;
      })
      .addCase(fetchLatestBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecommendedBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload;
      })
      .addCase(fetchRecommendedBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBlogData } = blogSlice.actions;
export default blogSlice.reducer;
