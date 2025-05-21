import { createRoute } from '@tanstack/react-router'
import { authRoute } from './auth'

const menu = () => {
  return <h1>Vista menu </h1>
}

export const menuRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/menu',
  component: menu,
})
