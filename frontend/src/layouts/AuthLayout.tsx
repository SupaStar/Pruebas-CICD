import { Outlet, useRouter } from '@tanstack/react-router'
import { Box, Button, Flex, Link, Separator, Text } from '@radix-ui/themes'
import { useAuthStore } from '../stores/useAuthStore'

export const AuthLayout = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.navigate({ to: '/' })
  }

  return (
    <Flex style={{ minHeight: '100vh' }}>
      <Box
        width="250px"
        p="4"
        style={{
          backgroundColor: '#456baf ',
          color: 'white',
          display: 'flex',
          borderRadius: '13px',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Flex direction="column" gap="6" align="center">
            <Text weight="bold" size="5" mb="7">
              Menú
            </Text>
          </Flex>
          <Flex direction="column" gap="6">
            <Link
              href="/dashboard"
              underline="hover"
              style={{ color: 'white' }}
            >
              Productos
            </Link>
          </Flex>
        </Box>

        <Box mt="7">
          <Separator size="4" />
          <Text size="2" mt="6" mb="3">
            Sesión activa como :
          </Text>
          <Text weight="bold" size="3" mt="6" mb="3">
            {user}
          </Text>
          <Button
            onClick={handleLogout}
            variant="solid"
            color="red"
            mt="4"
            style={{ width: '100%' }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Box flexGrow="1" p="4">
        <Outlet />
      </Box>
    </Flex>
  )
}
export default AuthLayout
