import { createSlice, current } from '@reduxjs/toolkit'
import { Meta, PaginationModel } from '@src/types/pagination.type'
import { IPost } from '@src/types/post.type'
import { IStatus } from '@src/types/slice.type'
import { createPost, getAllPost } from './action'

export type initialStateType = {
  posts: PaginationModel<IPost>
  post: IPost
  status: IStatus
}

const initialState: initialStateType = {
  posts: {
    docs: [],
    meta: {} as Meta,
  },
  post: {} as IPost,
  status: IStatus.IDLE,
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.status = IStatus.LOADING
      })
      .addCase(getAllPost.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCESS
        const { meta, docs } = payload
        state.posts = { meta, docs }
      })
      .addCase(getAllPost.rejected, (state) => {
        state.status = IStatus.FAILED
      })
      .addCase(createPost.pending, (state) => {
        state.status = IStatus.LOADING
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCESS
state.posts.docs = [payload.data,...current(state.posts.docs)]
        state.post = payload
      })
      .addCase(createPost.rejected, (state) => {
        state.status = IStatus.FAILED
      })
  },
})
export default postSlice.reducer
