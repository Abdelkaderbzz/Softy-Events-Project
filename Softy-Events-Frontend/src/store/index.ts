import { TypedUseSelectorHook, useDispatch, useSelector as  useAppSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  devTools: !!import.meta.env.VITE_APP_ENABLE_REDUX_DEVTOOLS || false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
})

const { dispatch } = store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector
export { dispatch }
