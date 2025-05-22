import { axiosInstance } from '@/api/config/axios'
import { ENDPOINTS } from '@/api/config/endpoints'
import { LoginRequest } from '@/api/models/Auth/LoginRequest'
import { LoginResponse } from '@/api/models/Auth/LoginResponse'
import { LoginService } from '@/api/services/authService'
import { describe, expect, test, vi, beforeEach } from 'vitest'

const validUsername = 'johnd'
const validPassword = 'm38rmF$'
const invalidUsername = 'baduser'
const invalidPassword = 'wrongpass'

const successData = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXIiOiJqb2huZCIsImlhdCI6MTc0Nzg4MTg3Mn0.y0ddM5YIJYnlaxvE4MwbjUQBeYOGQ349Qs9_MWdDMYg'}

describe('LoginService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('debe llamar al endpoint y devolver LoginResponse con token', async () => {
    vi.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
      data: successData,
    })

    const response = await LoginService(validUsername, validPassword)

    expect(axiosInstance.post).toHaveBeenCalledWith(
      ENDPOINTS.LOGIN,
      expect.any(LoginRequest)
    )
    const sent = (axiosInstance.post as any).mock.calls[0][1]
    expect(sent).toBeInstanceOf(LoginRequest)
    expect(sent.username).toBe(validUsername)
    expect(sent.password).toBe(validPassword)

    expect(response).toBeInstanceOf(LoginResponse)
  })

  test('debe rechazar cuando se envían credenciales incorrectas', async () => {
    const error = {
      response: { status: 401, data: { message: 'Unauthorized' } },
    }
    vi.spyOn(axiosInstance, 'post').mockRejectedValueOnce(error)

    await expect(LoginService(invalidUsername, invalidPassword))
      .rejects.toEqual(error)
  })
})
