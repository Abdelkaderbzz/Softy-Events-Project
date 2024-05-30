import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { userTypes } from '../../../types/slicesTypes';
import {
  getRoles,
  deleteRole,
  CreateRole,
  getRoleById,
  previewRoleById,
  updateRole,
  getUserTypes,
} from './roleThunk';

export interface roleSliceState {
  status: boolean;
  length: number;
  roles: readonly [object] | undefined;
  listOfRoles: string[] | undefined;
  roleToUpdate: any;
  roleToPreview: any;
  userTypes: any;
}

const initialState: roleSliceState = {
  status: false,
  length: 0,
  roles: undefined,
  listOfRoles: undefined,
  roleToUpdate: undefined,
  roleToPreview: undefined,
  userTypes: undefined,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {

    handleRolesChange: (state, { payload }: PayloadAction<string[]>) => {
      state.listOfRoles = payload;
    },
    setRolePreviewToDefault: (state) => {
      state.roleToPreview = undefined;
    },
    setRoleUpdateToDefault: (state) => {
      state.roleToUpdate = undefined;
    },
  },
  extraReducers: (builder) =>
  {
    builder.addCase(getUserTypes.fulfilled, (state, { payload }) => {
      state.userTypes = payload.docs
      state.status = false
    })
    builder.addCase(getRoles.pending, (state) => {
      state.status = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action?.payload?.data?.docs;

      state.status = false;
      state.length = action?.payload?.data?.meta?.totalDocs;
    });
    builder.addCase(getRoles.rejected, (state, action) => {
      state.status = false;
    });
    builder.addCase(getRoleById.pending, (state) => {
      state.status = true;
    });
    builder.addCase(getRoleById.fulfilled, (state, action) => {
      state.roleToUpdate = action.payload.data;
      state.status = false;
    });
    builder.addCase(getRoleById.rejected, (state, action) => {
      state.status = false;
    });
    builder.addCase(previewRoleById.pending, (state) => {
      state.status = true;
    });
    builder.addCase(previewRoleById.fulfilled, (state, action) => {
      state.roleToPreview = action.payload.data;
      state.status = false;
    });
    builder.addCase(previewRoleById.rejected, (state, action) => {
      state.status = false;
    });
    builder.addCase(deleteRole.pending, (state) => {
      state.status = true;
    });
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      state.status = false;
    });
    builder.addCase(
      deleteRole.rejected,
      (state, action: PayloadAction<any>) => {
        message.error(action.payload.message);
        state.status = false;
      }
    );
    builder.addCase(updateRole.pending, (state) => {
      state.status = true;
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.status = false;
    });
    builder.addCase(
      updateRole.rejected,
      (state, action: PayloadAction<any>) => {
        message.error(action.payload.message);
        state.status = false;
      }
    );
    builder.addCase(CreateRole.pending, (state) => {
      state.status = true;
    });
    builder.addCase(CreateRole.fulfilled, (state, action) => {
      state.status = false;
    });
    builder.addCase(
      CreateRole.rejected,
      (state, action: PayloadAction<any>) => {
        message.error(action.payload.message);

        state.status = false;
      }
    );
 
  },
});
export const { handleRolesChange, setRoleUpdateToDefault, setRolePreviewToDefault } = roleSlice.actions

export default roleSlice.reducer;
