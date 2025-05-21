import { useState } from "react"
import { useAuthStore } from "../stores/useAuthStore"
import { useRouter } from "@tanstack/react-router"
import "../styles.css"

export const Login = () => {
  const [username, setUsername] = useState("")
  const login = useAuthStore((s) => s.login)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(username)
    router.navigate({ to: "/dashboard" })
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Iniciar sesión</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          className="login-input"
        />
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  )
}

export default Login