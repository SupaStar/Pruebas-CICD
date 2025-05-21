import { useEffect, useState } from "react"
import { useAuthStore } from "../stores/useAuthStore"
import { useRouter } from "@tanstack/react-router"
import "../styles.css"
import { Button, Card, Flex, Heading, TextField, Text } from "@radix-ui/themes"

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const login = useAuthStore((s) => s.login)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/dashboard" })
    }
  }, [router]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validate the username and password
    if (username === "" || password === "") {
      alert("Por favor, completa todos los campos.")
      return
    }
    setIsLoading(true);
    await delay(2000);
    if (login(username, password)) {
      router.navigate({ to: "/dashboard" })
    } else {
      alert("Usuario o contraseña incorrectos.")
    }
    setIsLoading(false);
  }

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray1" px="4">
      <Card size="3" style={{ maxWidth: 400, width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Heading align="center" size="5">Iniciar sesión</Heading>
            <Text color="gray" align="center">Accede a tu cuenta</Text>

            <TextField.Root placeholder="Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required>
            </TextField.Root>

            <TextField.Root placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required>
            </TextField.Root>

            <Button type="submit" size="3" loading={isLoading} highContrast>
              Ingresar
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  )
}

export default Login