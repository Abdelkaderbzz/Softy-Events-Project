import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@src/utils/axios";

interface roleState {
  name: string;
  permissions: string[]|undefined;
}

export const getRoles = createAsyncThunk(
  'admin/getRoles',
  async (paginate: any, { rejectWithValue }) => {
    try {
      const { page, pageSize, name, orderBy, order } = paginate
      const queryParams = {
        page: page !== undefined ? page : '',
        pageSize: pageSize !== undefined ? pageSize : '',
        name: name !== undefined ? name : '',
        orderBy: orderBy !== undefined ? orderBy : '',
        order: order !== undefined ? order : '',
      }

      const response = await axiosInstance.get('/roles', { params: queryParams })
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

export const deleteRole = createAsyncThunk(
  "Admin/delete",
  async (roleId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/roles/${roleId}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const CreateRole = createAsyncThunk(
  "roles/create",
  async (RoleData: roleState, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/roles`, RoleData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
export const updateRole = createAsyncThunk(
  "roles/update",
  async (RoleData: any, { rejectWithValue }) => {
    try
    {
      const roleId = RoleData.id
      delete RoleData.id
      const response = await axiosInstance.put(`/roles/${roleId}`, RoleData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const getRoleById = createAsyncThunk(
  "Admin/getRoleById",
  async (roleId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/roles/${roleId}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const getUserTypes = createAsyncThunk(
  'Admin/getUserType',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/usertypes`)
      return response.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const previewRoleById = createAsyncThunk(
  "Admin/previewRoleById",
  async (roleId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/roles/${roleId}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
