import { createSlice } from '@reduxjs/toolkit';
import { getAllClient } from "./clientThunk";

export interface contentSliceState {
  client: readonly object[] | undefined
  status: boolean
  length: number
  currentPage: number,
  clientToUpdate:any
}

const initialState: contentSliceState = {
  client: undefined,
  status: false,
  length: 0,
  currentPage: 1,
  clientToUpdate:undefined
}

const clientSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
    getUserToUpdate: (state,{payload}) =>
    {
      state.client?.map((el:any) =>
      {
        console.log(el?._id,payload.id)
        if (el?._id === payload.id) { state.clientToUpdate = el }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClient.pending, (state) => {
      state.status = true;
    });
    builder.addCase(getAllClient.fulfilled, (state, action) =>
    {
      state.client = action?.payload?.docs;
      state.length = action?.payload?.meta?.totalDocs;
      state.currentPage = action?.payload?.meta?.page;
      state.status = false;
    });
    builder.addCase(getAllClient.rejected, (state) => {
      state.status = false;
    });
  },
});
export const { getUserToUpdate} = clientSlice.actions
export default clientSlice.reducer;
