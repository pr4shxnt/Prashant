import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  certificateData: {
    issuer: "",
    title: "",
    dateIssued: "",
    certificate: "",
    certificateUrl: "",
    credentialId: "",
  },
  loading: false,
  error: null,
  certificates: [],
};

export const addCertification = createAsyncThunk(
  "resume/create-certification",
  async (certificateData, ThunkAPI) => {
    try {
      const formData = new FormData();

      for (let key in certificateData) {
        if (key === "certificate" && certificateData[key] instanceof File) {
          formData.append("certificate", certificateData[key]);
        } else {
          formData.append(key, certificateData[key]);
        }
      }

      const token = localStorage.getItem("admin_session");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/resume/create-certification`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create certification"
      );
    }
  }
);

export const fetchCertificate = createAsyncThunk(
  "resume/fetch-certificate",
  async (_, ThunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/resume/certification`
      );
      return res.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch certifications"
      );
    }
  }
);

export const deleteCertificate = createAsyncThunk(
  "resume/delete-certificate",
  async (id, ThunkAPI) => {
    try {
      const token = localStorage.getItem("admin_session");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/resume/certification/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return id;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message ||
          `Failed to delete certification with id ${id}`
      );
    }
  }
);

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    setCertificateData: (state, action) => {
      state.certificateData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCertification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCertification.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.certificateData = initialState.certificateData;
        state.certificates = action.payload.resume.Certifications || []; // Refresh the list
      })
      .addCase(addCertification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.certificates = state.certificates.filter(
          (cert) => cert._id !== action.payload
        );
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCertificateData } = certificateSlice.actions;
export default certificateSlice.reducer;
