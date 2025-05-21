import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root'
import { AuthLayout } from '../layouts/AuthLayout'
import { useAuthStore } from '../stores/useAuthStore'
import { Navigate } from '@tanstack/react-router'

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: () => {
    const isAuth = useAuthStore((s) => s.isAuthenticated)
    return isAuth ? <AuthLayout /> : <Navigate to="/login" />
  },
})

