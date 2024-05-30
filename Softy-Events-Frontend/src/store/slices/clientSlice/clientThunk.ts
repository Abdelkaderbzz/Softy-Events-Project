import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'
export const getAllClient = createAsyncThunk(
  'admin/getAllClient',
  async (paginate: any, { rejectWithValue }) => {
    try {
      const { page, pageSize, name} = paginate
      const queryParams = {
        page:page||1,
        limit: pageSize||5,
        ...(name?{search:name}:{}),
      }

      const response = await axiosInstance.get('/users/all', { params: queryParams })
      if (response.status === 200) {
        return response.data
      }
      throw new Error(response.statusText)
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const deleteMember = createAsyncThunk(
  'Admin/deleteMember',
  async (memberId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/users/${memberId}`)
      return response.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)