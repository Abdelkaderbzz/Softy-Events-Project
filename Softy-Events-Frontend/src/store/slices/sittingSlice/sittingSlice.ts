/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface sittingTypes {
  isSideBarOpened: boolean;
  isCrudFormOpened: boolean;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: sittingTypes = {
  isSideBarOpened: false,
  isCrudFormOpened: false,
  currentPage: 1,
  itemsPerPage:5,
};
const sittingSlice = createSlice({
  name: 'sittingslice',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpened = !state.isSideBarOpened;
    },
    toggleCrudForm: (state) => {
      state.isCrudFormOpened = !state.isCrudFormOpened;
    },
    setCurrentPageToPagination: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setItemsPerPageToPagination: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      state.itemsPerPage = payload;
    },
  },
});

export const {
  toggleSideBar,
  toggleCrudForm,
  setCurrentPageToPagination,
  setItemsPerPageToPagination,
} = sittingSlice.actions;

export default sittingSlice.reducer;
