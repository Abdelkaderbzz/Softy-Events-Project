import { useSelector } from '@src/store'
import { Navigate } from 'react-router-dom'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated ? <Navigate to="/events" /> : children
}

export default GuestGuard
