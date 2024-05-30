import { createAsyncThunk } from '@reduxjs/toolkit'
import { IPost } from '@src/types/post.type'
import axiosInstance from '@src/utils/axios'
import axios from '@src/utils/axios'


export const getAllPost = createAsyncThunk('post/all', async (paginate:any, { rejectWithValue }) =>
{
  let data;
  const { page, pageSize, name} = paginate
  const queryParams = {
    page: page || 1,
    limit: pageSize || 5,
    ...(name ? { search: name } : {}),
  }
  try {
    const response = await axios.get('/posts',{params:queryParams})
    data = response.data
    if (response.status === 200) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    rejectWithValue(err.message)
  }
})

export const createPost = createAsyncThunk('/post/create', async (payload: any) => {
  let data
  try {
    console.log(payload.postPicUrl)
    delete payload.file
    const formData = setFormData(payload)

    const response = await axios.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    data = response.data
    if (response.status === 200) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err?.response.data.message ? err?.response.data.message : data?.message)
  }
})
const setFormData = (data: object): FormData => {
  const formData = new FormData()
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key as keyof typeof data])
    }
  }
  return formData
}


export const deleteEvent = createAsyncThunk(
  'Admin/deleteEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/posts/${eventId}`)
      return response.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)