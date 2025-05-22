import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { Theme } from '@radix-ui/themes'
import { rootRoute } from './routes/root'
import { loginRoute } from './routes/login.route'
import { authRoute } from './routes/auth'
import { dashboardRoute } from './routes/dashboard.route'
import { menuRoute } from './routes/menu.route'

import '@radix-ui/themes/styles.css'

const routeTree = rootRoute.addChildren([
  loginRoute,
  authRoute.addChildren([dashboardRoute, menuRoute]),
])

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Theme
        accentColor="indigo"
        grayColor="mauve"
        radius="large"
        appearance="light"
      >
        <RouterProvider router={router} />
      </Theme>
    </StrictMode>,
  )
}
