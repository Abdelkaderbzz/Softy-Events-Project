import { useSelector } from '@src/store'
import { Navigate } from 'react-router-dom'

interface MainLayoutProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: MainLayoutProps) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default AuthGuard
