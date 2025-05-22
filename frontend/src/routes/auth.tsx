import { Navigate, createRoute } from '@tanstack/react-router'
import { AuthLayout } from '../layouts/AuthLayout'
import { useAuthStore } from '../stores/useAuthStore'
import { rootRoute } from './root'

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: () => {
    const isAuth = useAuthStore((s) => s.isAuthenticated)
    return isAuth ? <AuthLayout /> : <Navigate to="/" />
  },
})
