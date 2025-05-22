import { createRoute } from '@tanstack/react-router'
import { Login } from '../pages/Login'
import { rootRoute } from './root.tsx'

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
})
