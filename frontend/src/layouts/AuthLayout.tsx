import { Outlet } from '@tanstack/react-router'
import { useAuthStore } from '../stores/useAuthStore'
import { useRouter } from '@tanstack/react-router'
import '../styles.css'

export const AuthLayout = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.navigate({ to: '/login' })
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Menú</h2>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/menu"> Opciones  </a></li>
          <li><button onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
