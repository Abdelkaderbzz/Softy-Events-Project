import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'
interface userDataType {
  name: string
  email: string
  password: string
  userType: string
}

export const addUser = createAsyncThunk(
  'Admin/addUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      delete userData.id
      userData['verified'] = true
      const response = await axiosInstance.post(`/users/create`, userData)
      
        return response.data
      
    } catch (error: any) {
      if (error?.response?.data?.errors?.roles) {
        return rejectWithValue(error?.response?.data?.errors?.roles)
      }
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message)
      } else {
        return rejectWithValue('something went wrong')
      }
    }
  }
)
export const UpadateAdmin = createAsyncThunk(
  'Admin/update',
  async (updatedData: any, { rejectWithValue }) => {
    try {
      const { values, userToUpdate } = updatedData
      delete values?.password
      delete values?.id
      const response = await axiosInstance.put(`/users/${userToUpdate._id}`, values)
      return response.data
    } catch (error: any) {
      const emailError = error?.response?.data?.errors?.email
      const message = error?.response?.data?.message || error?.response?.data
      if (emailError) {
        return rejectWithValue(emailError)
      } else if (message) {
        return rejectWithValue(message)
      } else {
        return rejectWithValue('Something went wrong')
      }
    }
  }
)
export const deleteUser = createAsyncThunk(
  'Admin/delete',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`)
      return response.data
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message)
      } else {
        return rejectWithValue('something went wrong')
      }
    }
  }
)
export const getUserById = createAsyncThunk(
  'Admin/getUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`)
      return response.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const previewUserById = createAsyncThunk(
  'Admin/previewUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`)
      return response.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

