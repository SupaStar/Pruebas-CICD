import { create } from 'zustand'

interface AuthState {
  user: string | null
  login: (username: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('user'),
  isAuthenticated: !!localStorage.getItem('user'),
  login: (username: string) => {
    localStorage.setItem('user', username)
    set({ user: username, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null, isAuthenticated: false })
  },
}))
