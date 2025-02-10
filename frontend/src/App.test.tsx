import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './provider/AuthProvider'

describe('App Component', () => {
  it('renders Header, Router, and Footer', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>,
    )
  })
})
