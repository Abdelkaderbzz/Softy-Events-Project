import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axiosInstance from '../utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { clearTokens, getTokens } from '../utils/token'
import useIsMountedRef from '../hook/useIsMountedRef'
import { RootState } from '@src/store'
import { initialise } from '@src/store/slices/auth/authSlice'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'

interface AuthProviderProps {
  children: React.ReactNode
}

interface JwtPayload {
  exp: number
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useIsMountedRef()

  const { isInitialised } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const isValidToken = (token: string) => {
    const decoded: JwtPayload = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  }

  useEffect(() => {
    if (!isMounted.current) {
      return
    }

    async function fetchUser() {
      try {
        const { refresh_token } = getTokens()
        if (refresh_token && isValidToken(refresh_token)) {
          const response = await axiosInstance.get('/profile/my')
          if (response?.data?.statusCode === 200) {
            const user = response?.data?.data
            dispatch(initialise({ isAuthenticated: true, user }))
          } else {
            dispatch(initialise({ isAuthenticated: false, user: null }))
            clearTokens()
          }
        } else {
          dispatch(initialise({ isAuthenticated: false, user: null }))
          clearTokens()
        }
      } catch (error) {
        dispatch(initialise({ isAuthenticated: false, user: null }))
        clearTokens()
      }
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isInitialised) {
    return <LazyLoad />
  }

  return <>{children}</>
}

export default AuthProvider
