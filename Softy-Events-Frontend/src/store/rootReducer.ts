import { combineReducers } from '@reduxjs/toolkit'

import themeReducer from './slices/theme/themeSlice'
import authReducer from './slices/auth/authSlice'
import sittingReducer from './slices/sittingSlice/sittingSlice'
import roleReducer from './slices/role/roleSlice'
import clientReducer from './slices/clientSlice/clientSlice'
import adminReducer from './slices/Admin/adminSlice'
import postReducer from './slices/post'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  sitting: sittingReducer,
  role: roleReducer,
  client: clientReducer,
  admin: adminReducer,
  post: postReducer,
})

export default rootReducer
