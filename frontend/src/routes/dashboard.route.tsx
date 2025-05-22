import { createRoute } from '@tanstack/react-router'
import { Dashboard } from '../pages/Dashboard'
import { authRoute } from './auth'

export const dashboardRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/dashboard',
  component: Dashboard,
})
