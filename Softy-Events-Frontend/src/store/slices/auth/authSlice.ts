/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, register } from './authThunk'
import { clearTokens, setTokens } from '@src/utils/token'
import { AuthState } from '../../../types/slicesTypes'
import { message } from 'antd'
// import { updateAvatar, updateCredential } from '../profileSlice/profileThunk'

const initialState: AuthState = {
  status: 'idle',
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: (state, action) => {
      const { isAuthenticated, user } = action.payload
      state.isAuthenticated = isAuthenticated
      state.isInitialised = true
      state.user = user
    },
    restore: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      clearTokens()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(login.fulfilled, (state, {payload}: PayloadAction<any>) => {
      
      const {
        tokens: { accessToken, refreshToken },
        user,
      } = payload.data
      message.success(payload?.message)
      setTokens(accessToken, refreshToken)
      state.isAuthenticated = true
      state.user = user
      state.status = 'succeeded'
    })
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload

      state.status = 'failed'
      message.error(state.error)
    })

    //? updateAvatar

    // builder.addCase(updateAvatar.fulfilled, (state, action: PayloadAction<any>) => {
    //   const user = action.payload.data
    //   state.user = user
    //   state.status = 'succeeded'
    // })

    // builder.addCase(updateCredential.fulfilled, (state, action: PayloadAction<any>) => {
    //   const user = action.payload.data
    //   state.user = user
    //   message.success('credentials updated successfully')
    //   state.status = 'succeeded'
    // })
    //? register

    builder.addCase(register.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(register.fulfilled, (state) =>
    {
      state.status = 'succeeded'
      window.location.href='/login'
    })
    builder.addCase(register.rejected, (state, action: any) => {
      state.error = action.error.message
      state.status = 'failed'
      message.error(action.payload)
    })
  },
})

export const { initialise, restore, logout } = authSlice.actions

export default authSlice.reducer
