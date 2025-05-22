import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App.tsx'
import { MemoryRouter } from 'react-router-dom'

describe('App', () => {
  test('renders', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>)
    expect(screen.getByText('Accede a tu cuenta')).toBeDefined()
  })
})
