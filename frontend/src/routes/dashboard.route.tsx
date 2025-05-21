import { createRoute } from '@tanstack/react-router'
import { authRoute } from './auth'
import { Dashboard } from '../pages/Dashboard'

export const dashboardRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/dashboard',
  component: Dashboard,
})
