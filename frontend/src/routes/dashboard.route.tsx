import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root.tsx'
import { Dashboard } from '../pages/Dashboard'

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})
