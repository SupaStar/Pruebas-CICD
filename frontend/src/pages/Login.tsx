import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import {
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { useAuthStore } from '../stores/useAuthStore'
// import { LoginService } from '@/api/services/authService'

export const Login = () => {
  const login = useAuthStore((s) => s.login)
  // const loginApi = useAuthStore((s) => s.loginApi)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: '/dashboard' })
    }
  }, [router])

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (username === '' || password === '') {
      alert('Por favor, completa todos los campos.')
      return
    }
    setIsLoading(true)
    // LoginService(username, password).then((response) => {
    //   loginApi(username, response.token);
    //   router.navigate({ to: "/dashboard" })
    // }).finally(() => {
    //   setIsLoading(false);
    // })
    await delay(2000)
    if (login(username, password)) {
      router.navigate({ to: '/dashboard' })
    } else {
      alert('Usuario o contraseña incorrectos.')
    }
    setIsLoading(false)
  }

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      px="4"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <Card
        size="3"
        style={{
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Heading align="center" size="5">
              Iniciar sesión
            </Heading>
            <Text align="center" color="gray">
              Accede a tu cuenta
            </Text>

            <Separator my="2" size="4" />

            <TextField.Root
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="3"
              required
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="3"
              required
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
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
