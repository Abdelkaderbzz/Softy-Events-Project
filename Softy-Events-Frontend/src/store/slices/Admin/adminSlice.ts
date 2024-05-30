import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addUser,
  UpadateAdmin,
  getUserById,
  previewUserById,
} from './adminThunk';
import { message } from 'antd';
export interface adminSliceState {
  status: boolean;
  userToUpdate: any;
  userToPreview: any;
}

const initialState: adminSliceState = {
  status: false,
  userToUpdate: undefined,
  userToPreview: undefined,
};

const adminSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
    setUserToUpdateToDefault: (state) => {
      state.userToUpdate = null;
    },
    setUserToPreviewToDefault: (state) => {
      state.userToPreview = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state) =>
    {
      
      state.status = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) =>
    {
      message.success(action?.payload?.message)
      state.status = false;
    });
    builder.addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
     
      state.status = false;
    });
    builder.addCase(UpadateAdmin.pending, (state) => {
      state.status = true;
    });
    builder.addCase(UpadateAdmin.fulfilled, (state, action) => {

      message.success(action.payload.message);
      state.status = false;
    });
    builder.addCase(
      UpadateAdmin.rejected,
      (state, action: PayloadAction<any>) => {

        message.error(action.payload);
        state.status = false;
      }
    );
    builder.addCase(getUserById.pending, (state) => {
      state.status = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {

      state.userToUpdate = action.payload.data;
      state.status = false;
    });
    builder.addCase(getUserById.rejected, (state, action) => {

      state.status = false;
    });
    builder.addCase(previewUserById.pending, (state) => {
      state.status = true;
    });
    builder.addCase(previewUserById.fulfilled, (state, action) => {

      state.userToPreview = action.payload.data;
      state.status = false;
    });
    builder.addCase(previewUserById.rejected, (state, action) => {

      state.status = false;
    });
  },
});
export const { setUserToUpdateToDefault, setUserToPreviewToDefault } =
  adminSlice.actions;

export default adminSlice.reducer;
