import { useAuthStore } from "../stores/useAuthStore"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/" />
}
