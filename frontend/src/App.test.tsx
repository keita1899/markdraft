import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App Component', () => {
  it('renders Header, Router, and Footer', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )
  })
})
