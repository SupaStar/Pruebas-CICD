import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/" />
}
