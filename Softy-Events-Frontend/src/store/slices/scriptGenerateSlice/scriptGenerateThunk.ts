import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@src/utils/axios";
export const domainCheck = createAsyncThunk(
  "/domain/generate",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/domain/generate`, { name });
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
