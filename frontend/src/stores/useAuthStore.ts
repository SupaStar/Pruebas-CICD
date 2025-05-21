import { create } from 'zustand'

interface AuthState {
  user: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('user'),
  isAuthenticated: !!localStorage.getItem('user'),
  login: (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      addFirstUser()
    }
    const userToLogin = users.find((user: { username: string }) => user.username === username);
    if (!userToLogin) {
      return false;
    }
    if (userToLogin.password !== password) {
      return false;
    }
    localStorage.setItem('user', username)
    set({ user: username, isAuthenticated: true })
    return true;
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null, isAuthenticated: false })
  },
}))
const addFirstUser = () => {
  const users = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' },
  ]
  localStorage.setItem('users', JSON.stringify(users))
}
