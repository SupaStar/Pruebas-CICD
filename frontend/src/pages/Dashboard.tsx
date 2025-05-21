import { useAuthStore } from "../stores/useAuthStore"
import { useRouter } from "@tanstack/react-router"
import "../styles.css"

export const Dashboard = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.navigate({ to: "/login" })
  }

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user} 👋</h1>
      <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
    </div>
  )
}
export default Dashboard
